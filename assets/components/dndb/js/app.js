console.log("app.js");

navigator.serviceWorker && navigator.serviceWorker.register('../assets/components/dndb/js/pwa/sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});
