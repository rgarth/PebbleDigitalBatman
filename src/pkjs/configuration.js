Pebble.addEventListener('showConfiguration', function(e) {
  var battery = localStorage.getItem('battery');
  if (! battery) { battery = true; }
  var color = localStorage.getItem('color');
  if (! color) { color = "55FF00"; }
  var URL = 'http://rgarth.github.io/PebbleDigitalPower/configuration.html?' + 
  //var URL = 'http://localhost:8000/configuration.html?' + 
      'color=' + color + '&battery=' + battery;
  console.log('Configuration window opened. ' + URL);
  Pebble.openURL(URL);
});

Pebble.addEventListener('webviewclosed',
  function(e) {
    var configuration = JSON.parse(decodeURIComponent(e.response));
    var showBattery = 0;
    if (configuration.battery) {
      showBattery = 1;
    }
    console.log('Show Battery = ' + showBattery);
    var dictionary = {
      "KEY_BATTERY": showBattery,
      "KEY_COLOR": parseInt(configuration.color, 16)
    };
    console.log('Battery ' + configuration.battery);
    console.log('Color ' + configuration.color);
    localStorage.setItem('battery', configuration.battery);
    localStorage.setItem('color', configuration.color);
    // Send to Pebble
    Pebble.sendAppMessage(dictionary,
      function(e) {
        console.log("Configuration sent to Pebble successfully!");
      },
      function(e) {
        console.log("Error sending configuration info to Pebble!");
      }
    );
  }
); 
