// Public configuration only. Never put a client secret here.
window.GOIMON_CLOUD_CONFIG={googleClientId:'860663516644-f7u8dqa2bdfemr0pnmcoi6j8v5oktslr.apps.googleusercontent.com',apiBase:'https://goimon-cloud-api-staging.one-consistent.workers.dev'};
// Enable the connected release only after the actual API advertises all routes.
window.GoimonReleaseReady=(async()=>{
 const c=window.GOIMON_CLOUD_CONFIG;c.missionsEnabled=false;c.economyServerEnabled=false;
 if(typeof window.fetch!=='function')return false;
 try{
  const response=await window.fetch(c.apiBase+'/health',{cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!response.ok)return false;
  const s=await response.json();
  const ready=s.ok===true&&s.capabilities?.missionRelease===1&&s.capabilities?.authoritativeEconomy===true;
  c.missionsEnabled=ready;c.economyServerEnabled=ready;return ready;
 }catch{return false;}
})();
