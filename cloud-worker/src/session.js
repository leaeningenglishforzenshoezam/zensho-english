// Opaque application sessions. Google credentials are never stored.
const TTL_SECONDS = 24 * 60 * 60;
const tokenPattern = /^gs1_[a-f0-9]{64}$/;
const hex = bytes => Array.from(bytes, x => x.toString(16).padStart(2,'0')).join('');
export async function hashToken(token) {
  return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))));
}
export function bearer(request) {
  const match = /^Bearer ([^\s]+)$/.exec(request.headers.get('Authorization') || '');
  if (!match || match[1].length > 8192) throw Error('unauthorized');
  return match[1];
}
export async function createSession(db, userId, now = Math.floor(Date.now()/1000)) {
  const token = 'gs1_' + hex(crypto.getRandomValues(new Uint8Array(32)));
  const hash = await hashToken(token), expiresAt = now + TTL_SECONDS;
  await db.batch([
    db.prepare('DELETE FROM sessions WHERE expires_at <= ?').bind(now),
    db.prepare(`DELETE FROM sessions WHERE user_id = ? AND token_hash NOT IN
      (SELECT token_hash FROM sessions WHERE user_id = ? ORDER BY created_at DESC, token_hash DESC LIMIT 9)`).bind(userId,userId),
    db.prepare('INSERT INTO sessions(token_hash,user_id,created_at,expires_at) VALUES (?,?,?,?)').bind(hash,userId,now,expiresAt)
  ]);
  return {token,userId,expiresAt};
}
export async function authenticateSession(request, db, now = Math.floor(Date.now()/1000)) {
  const token = bearer(request);
  if (!tokenPattern.test(token)) throw Error('unauthorized');
  const hash = await hashToken(token);
  const row = await db.prepare('SELECT user_id,expires_at FROM sessions WHERE token_hash = ? AND expires_at > ?').bind(hash,now).first();
  if (!row) throw Error('unauthorized');
  return {userId:row.user_id,expiresAt:row.expires_at,hash};
}
export async function revokeSession(request, db) {
  const token = bearer(request);
  if (!tokenPattern.test(token)) throw Error('unauthorized');
  await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await hashToken(token)).run();
}
