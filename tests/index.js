var CasparCG = require("./../js/index.js").CasparCG;

var foo = new CasparCG({host: 'localhost', onConnected: function(){
    foo.play(1,0,'amb');
}})