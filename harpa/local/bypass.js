(function() {
  const app = globalThis.__app_hrp;
  if (!app) return console.log('[HarpaBypass] Not in Service Worker console');

  // Method 1: Inject Premium status (only x.status)
  if (app.$s.billing.account.products.x) {
    app.$s.billing.account.products.x.status = true;
  }
  app.$s.billing.account.stats.pm = 0;

  // Method 2: Hook Plan checks
  app.$billing.hasXPlan = () => true;
  app.$billing.hasSPlan = () => true;
  app.$billing.hasPro = () => true;

  // Method 3: Disable server sync
  app.$billing.powerMessageController._synchValue = () => Promise.resolve();

  // Method 4: Hook onPowerMessage
  app.$billing.onPowerMessage = () => true;

  // Method 5: Disable Feature
  app.$feature.config['billing.pm'].enabled = false;

  console.log('[HarpaBypass] Done! Refresh HARPA sidebar');
})();
