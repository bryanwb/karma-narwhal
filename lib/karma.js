#!/usr/bin/env narwhal

var util = require("util");
var fs = require("file");
var args = require('args');
var installer = require('narwhal/tusk/install');

var parser =  new args.Parser();


parser.help('Query the tusk catalog  for karma packages');

parser.helpful();

parser.action(function (options) {
    exports.install.call(this, options, options.args );
});

var install = exports.install = function (options, names) {
    
    packages = util.values(JSON.parse(fs.read("catalog.json")).packages).filter(function(info){ 
		   return info.name === "karma-test";
	       }).map(function(info){ return info.name;});
				  
    installer.install('', packages);
    

};

exports.main = function main(args) {
    var options = parser.parse(args);
    
    if (options.args.length > 1) {
        parser.printHelp(options);
        parser.exit(options);
    }
    
    exports.install();

};

if (module.id == require.main){
    exports.main(system.args);
}
    
