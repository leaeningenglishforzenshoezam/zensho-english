// Initialize before the page's controls become active. No opt-in means no network.
window.GoimonEconomyReady=Promise.resolve(window.GoimonReleaseReady)
 .then(()=>import('./runtime.mjs')).then(m=>m.connect(window));
// Pages await the same rejection and show their own blocking error state.
// Register early so a module-load delay does not cause an unhandled rejection.
window.GoimonEconomyReady?.catch(()=>{});
