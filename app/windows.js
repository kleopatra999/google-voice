var URL = require('url');
var electron = require('electron');
var shell = electron.shell;

var inbox = require('./inbox');

var googleHosts = [
  'accounts.google.com',
  'voice.google.com',
];

module.exports = function(win) {
  var wc = win.webContents;
  wc.on('new-window', function(ev, url, name) {
    var host = URL.parse(url).host;
    if (host == 'voice.google.com') {
      ev.preventDefault();
      inbox.open(url, name);
    }
    else if (!~googleHosts.indexOf(host)) {
      ev.preventDefault();
      shell.openExternal(url);
    }
  });
};
