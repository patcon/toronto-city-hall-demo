scheduleDelayed = function (data) {
  var now = new Date().getTime(),
      _5_sec_from_now = new Date(now + 5 * 1000);

  cordova.plugins.notification.local.schedule({
      id: 2,
      icon: 'res://icon',
      title: data.upcoming.count + ' upcoming votes',
      text: 'City Council',
      at: _5_sec_from_now,
  });
};

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  navigator.splashscreen.hide();

  setupCards();

  var path = window.location.href.replace('index.html', '');
  var request = pegasus(path + 'data.json');
  request.then(
    function (data, xhr) {
      cordova.plugins.notification.local.on("click", function (notification) {
        if (notification.id == 1) {
          scheduleDelayed(data);
        };
      });
    },
    function (data, xhr) {
      console.error(data, xhr.status);
    }
  );

  cordova.plugins.notification.local.schedule({
      id: 1,
      icon: 'res://icon',
      // See: http://androiddrawables.com
      // Most icons with 'ic' prefix work.
      text: 'Click to start demo',
      at: new Date(),
      ongoing: true,
  });
};
