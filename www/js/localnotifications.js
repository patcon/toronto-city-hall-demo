scheduleDelayed = function () {
    var now = new Date().getTime(),
        _5_sec_from_now = new Date(now + 5 * 1000);

    cordova.plugins.notification.local.schedule({
        id: 1,
        icon: 'res://icon',
        // See: http://androiddrawables.com
        // Most icons with 'ic' prefix work.
        smallIcon: null,
        title: '3 upcoming votes',
        text: 'City Council',
        at: _5_sec_from_now,
    });
};

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  document.getElementById('btn-test-notification').addEventListener('click', scheduleDelayed);
}
