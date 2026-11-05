// Initialize before the page's controls become active. No opt-in means no network.
window.GoimonEconomyReady=window.GOIMON_CLOUD_CONFIG?.economyServerEnabled===true
 ? import('./runtime.mjs').then(m=>m.connect(window)) : null;
// Pages await the same rejection and show their own blocking error state.
// Register early so a module-load delay does not cause an unhandled rejection.
window.GoimonEconomyReady?.catch(()=>{});
