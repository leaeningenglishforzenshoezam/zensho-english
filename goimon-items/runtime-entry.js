// Initialize before the page's controls become active. No opt-in means no network.
window.GoimonEconomyReady=window.GOIMON_CLOUD_CONFIG?.economyServerEnabled===true
 ? import('./runtime.mjs').then(m=>m.connect(window)) : null;
