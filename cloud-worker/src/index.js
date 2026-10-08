import { createRemoteJWKSet, jwtVerify } from 'jose';
import { validateSnapshot } from './validation.js';

const jwks = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
const MAX_REQUEST_BYTES = 920_000;
const response = (data, status=200, extra={}) => new Response(JSON.stringify(data), {
  status, headers: { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store', ...extra }
});
function cors(origin, allowed) {
  return origin === allowed ? {
    'access-control-allow-origin':allowed,
    'access-control-allow-headers':'Authorization, Content-Type',
    'access-control-allow-methods':'GET, POST, OPTIONS',
    'vary':'Origin'
  } : null;
}
export async function authenticate(request, env, keys = jwks) {
  if(typeof env.GOOGLE_CLIENT_ID!=='string' || !env.GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID.startsWith('REPLACE_')) throw new Error('auth_not_configured');
  const auth = request.headers.get('Authorization') || '';
  const match = /^Bearer ([^\s]+)$/.exec(auth);
  if (!match) throw new Error('unauthorized');
  const verified = await jwtVerify(match[1], keys, {
    issuer:['accounts.google.com','https://accounts.google.com'],
    audience:env.GOOGLE_CLIENT_ID,
    algorithms:['RS256'], requiredClaims:['sub','exp','iat','aud','iss'], maxTokenAge:'2h'
  });
  if (!verified.payload.sub || typeof verified.payload.sub !== 'string') throw new Error('unauthorized');
  return verified.payload.sub;
}
async function getUserId(db, sub) {
  // Google sub を外部へ返さず内部IDで取り扱う
  await db.prepare('INSERT INTO users(id, google_sub) VALUES (?,?) ON CONFLICT(google_sub) DO NOTHING')
    .bind(crypto.randomUUID(),sub).run();
  const u=await db.prepare('SELECT id FROM users WHERE google_sub = ?').bind(sub).first();
  if (!u) throw new Error('user_create_failed');
  return u.id;
}
async function fetchSave(db, userId) {
  return db.prepare('SELECT revision,schema_version,save_json,updated_at FROM saves WHERE user_id = ?')
    .bind(userId).first();
}
export async function handleSave(request, env, userId) {
  const size = Number(request.headers.get('content-length'));
  if (size > MAX_REQUEST_BYTES) return response({error:'request_too_large'},413);
  if(!request.headers.get('content-type')?.startsWith('application/json')) return response({error:'json_required'},415);
  const reader=request.body?.getReader(); const parts=[]; let total=0;
  if(!reader) return response({error:'invalid_json'},400);
  while(true){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;
    if(total>MAX_REQUEST_BYTES){await reader.cancel();return response({error:'request_too_large'},413);}parts.push(value);}
  const bytes=new Uint8Array(total);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
  const raw=new TextDecoder().decode(bytes);
  if (new TextEncoder().encode(raw).length > MAX_REQUEST_BYTES) return response({error:'request_too_large'},413);
  let body;
  try {body=JSON.parse(raw);} catch {return response({error:'invalid_json'},400);}
  if (!Number.isSafeInteger(body?.expectedRevision) || body.expectedRevision < 0)
    return response({error:'expected_revision_required'},400);
  let json;
  try {json=validateSnapshot(body.snapshot);} catch(err) {return response({error:err.message},400);}

  if (body.expectedRevision===0) {
    const result=await env.DB.prepare(
      'INSERT INTO saves(user_id,revision,schema_version,save_json) VALUES (?,1,1,?) ON CONFLICT(user_id) DO NOTHING'
    ).bind(userId,json).run();
    if (result.meta.changes===0) return response({error:'revision_conflict',current:await publicSave(env.DB,userId)},409);
    return response({revision:1});
  }
  // CAS 更新。前世代を記録してから、期待revisionと一致する場合にだけ更新。
  // backupの保存は冪等化。仮に競合更新に負けても本体セーブは変更しない。
  const stmts=[
    env.DB.prepare(`INSERT OR IGNORE INTO save_revisions(user_id,revision,schema_version,save_json)
      SELECT user_id,revision,schema_version,save_json FROM saves
      WHERE user_id=? AND revision=?`).bind(userId,body.expectedRevision),
    env.DB.prepare(`UPDATE saves SET save_json=?, revision=revision+1,
      updated_at=datetime('now') WHERE user_id=? AND revision=?`).bind(json,userId,body.expectedRevision)
  ];
  const results=await env.DB.batch(stmts);
  if (results[1].meta.changes===0) return response({error:'revision_conflict',current:await publicSave(env.DB,userId)},409);
  return response({revision:body.expectedRevision+1});
}
export async function publicSave(db, userId) {
  const row=await fetchSave(db,userId);
  if (!row) return {revision:0,snapshot:null};
  return {revision:row.revision, snapshot:JSON.parse(row.save_json),updatedAt:row.updated_at};
}
export default {
  async fetch(request,env) {
    const origin=request.headers.get('Origin');
    const headers=cors(origin,env.ALLOWED_ORIGIN);
    if (!headers) return response({error:'origin_not_allowed'},403);
    if (request.method==='OPTIONS') return new Response(null,{status:204,headers});
    let result;
    try {
      const url=new URL(request.url);
      if (url.pathname==='/health' && request.method==='GET') result=response({ok:true});
      else if (url.pathname==='/api/v1/save' && ['GET','POST'].includes(request.method)) {
        if(!env.RATE_LIMITER) return response({error:'rate_limiter_not_configured'},503,headers);
        const limited=await env.RATE_LIMITER.limit({key:request.headers.get('CF-Connecting-IP')||'unknown'});
        if(!limited.success)return response({error:'rate_limited'},429,{...headers,'retry-after':'60'});
        const sub=await authenticate(request,env);
        const userId=await getUserId(env.DB,sub);
        result=request.method==='GET' ? response({userId,...await publicSave(env.DB,userId)}) : await handleSave(request,env,userId);
      } else result=response({error:'not_found'},404);
    } catch(error) {
      if (error.message==='unauthorized' || error.code?.startsWith('ERR_JWT') || error.code?.startsWith('ERR_JWS') || error.code?.startsWith('ERR_JOSE'))
        result=response({error:'unauthorized'},401);
      else {console.error('API failure');result=response({error:'server_error'},500);}
    }
    const h=new Headers(result.headers);
    Object.entries(headers).forEach(([k,v])=>h.set(k,v));
    return new Response(result.body,{status:result.status,headers:h});
  }
};
