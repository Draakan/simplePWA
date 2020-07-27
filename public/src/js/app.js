if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(event => {
      console.log('Service worker registered', event);
    });
}
