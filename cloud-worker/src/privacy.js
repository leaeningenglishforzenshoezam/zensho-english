import {hashToken} from './session.js';

// Receipt identifies a logged-in requester, but never authenticates API access.
export async function issueDeletionRequest(db,userId,now=Math.floor(Date.now()/1000)) {
 const code='del_'+Array.from(crypto.getRandomValues(new Uint8Array(16)),x=>x.toString(16).padStart(2,'0')).join('');
 const expiresAt=now+30*86400;
 await db.prepare(`INSERT INTO deletion_requests(user_id,code_hash,created_at,expires_at) VALUES (?,?,?,?)
  ON CONFLICT(user_id) DO UPDATE SET code_hash=excluded.code_hash,created_at=excluded.created_at,expires_at=excluded.expires_at`)
  .bind(userId,await hashToken(code),now,expiresAt).run();
 return {code,expiresAt};
}

// Independent of study traffic; never changes current saves, profiles or localStorage.
export async function cleanupPrivacy(db,now=Math.floor(Date.now()/1000)) {
 const cutoff=new Date((now-30*86400)*1000).toISOString().slice(0,19).replace('T',' ');
 const result=await db.batch([
  db.prepare('DELETE FROM save_revisions WHERE saved_at < ?').bind(cutoff),
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').bind(now),
  db.prepare('DELETE FROM deletion_requests WHERE expires_at <= ?').bind(now)
 ]);
 return result.map(x=>x.meta.changes);
}

// Operator-only SQL preparation. No public delete route exists.
export async function deletionSQL(code,userId) {
 if(!/^del_[a-f0-9]{32}$/.test(code)||!/^[a-zA-Z0-9-]{1,128}$/.test(userId))throw Error('invalid_code_or_user_id');
 const hash=await hashToken(code);
 const condition=`id='${userId}' AND id IN (SELECT user_id FROM deletion_requests WHERE code_hash='${hash}' AND expires_at > unixepoch())`;
 return {
  inspect:`SELECT u.id, p.username, datetime(r.created_at,'unixepoch') AS requested_at, datetime(r.expires_at,'unixepoch') AS expires_at FROM users u JOIN deletion_requests r ON r.user_id=u.id LEFT JOIN user_profiles p ON p.user_id=u.id WHERE u.${condition};`,
  remove:`DELETE FROM users WHERE ${condition}; SELECT count(*) AS remaining_users FROM users WHERE id='${userId}';`
 };
}
