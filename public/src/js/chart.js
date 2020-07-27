window.onload = _ => {
  const getButton = document.getElementById('get-button');

  getButton.addEventListener('click', async _ => {
    const res = await (await fetch('https://simple-pwa-8a005.firebaseio.com/data.json')).json();
  
    const sorter = {
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6,
      "sunday": 7
    };
    
    const tmp = [], orderedData = {}, pureData = {};
  
    Object.entries(res).map(([_, value]) => {
      Object.entries(value).map(([key, val]) => pureData[key] = val);
    });
  
    Object.keys(pureData).forEach(key => tmp[sorter[key.toLowerCase()]] = { key, value: pureData[key] });
  
    tmp.forEach(obj => orderedData[obj.key] = obj.value);
  
    const ctx = document.getElementById('myChart').getContext('2d');
  
    new Chart(ctx, {
      type: 'line',
      data: {
          labels: Object.entries(orderedData).map(([key, _]) => key),
          datasets: [{
              label: 'Users',
              backgroundColor: '#26a69a',
              borderColor: '#26a69a',
              fill: false,
              data: Object.entries(orderedData).map(([_, value]) => value),
          }]
      }
    });
  });

  const syncButton = document.getElementById('sync-button');

  syncButton.addEventListener('click', _ => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready
        .then(sw => {
          const data = {
            id: new Date().getTime(),
            sunday: 10
          };

          writeData('sync-requests', data)
            .then(_ => {
              sw.sync.register('sync-request')
            });
        });
    }
  });

};
