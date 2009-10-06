var util = require("util");
var fs = require("file");
var args = require('args');
var installer = require('narwhal/tusk/install');

var parser =  new args.Parser();


parser.help('Query the tusk catalog  for karma packages');

parser.helpful();

//parser.action(function (options) {
//    exports.install.call(this, options, options.args );
//});


parser.option('-i')
    .action(function (options) {
    exports.installk.call(this, options, options.args );
});

exports.installk = function (options, names) {

/*    var packages = util.values(JSON.parse(fs.read("catalog.json")).packages).
	filter(function(info){ 
		   return info.name === "karma-test";
	       }).map(function(info){ return info.name;});
				  
    installer.install('', packages);
*/
    print("foo");
};
