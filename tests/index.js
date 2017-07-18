var casparcg = require("./../js/index.js").CasparCG;

// var foop = new CasparCG({onConnected: function(){
var foop = new casparcg({host: "10.0.1.111", onConnected: function(e){
console.log("connected", e);
foop.play(1, 0, "amb");
// global.setTimeout(() => foop.restart(), 5000);
global.setTimeout(() => foop.restart(), 5000);
global.setTimeout(() => foop.diag(), 12000);
}});

foop.onDisconnected = (e) => console.log("disconnected", e);
foop.onError = (e) => console.log("error", e);
foop.onLog = (e) => console.log("log", e);
foop.onConnectionChanged = (e) => console.log("connectionchanged", e);
foop.onConnectionStatus = (e) => console.log("connectionstatus", e);

global.setInterval(() => console.log("."), 20000);