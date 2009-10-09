
var util = require("util");
var fs = require("file");
var args = require('args');
var installer = require('narwhal/tusk/install');
var parser =  new args.Parser();
var packages = [];

parser.option('-g', '--grades','grades')
    .help('specify the grades u want, separated by commas but without spaces in-between, e.g. --grades=1,2,3')
    .action(function(options, name,  grades) { 
		options.grades = grades.split(',');
	    });

parser.option('-s', '--subjects','subjects')
    .help('specify the subjects u want, separated by commas but without spaces in-between')
    .action(function(options, name,  subjects) { 
		options.subjects = subjects.split(',');
	    });




parser.help('Query the tusk catalog  for karma packages');

parser.helpful();

var install = exports.install = function (options) {
    var queries = [];
    var packages = [];
        

    // creates list of queries that packages must match
    util.forEachApply(util.items(options), function(key,value) { 
			  if ( key === "grades" || key === "subjects"){
			      queries.push([key , new RegExp(value.join("|"))]);
			  }
		      });

    queries = [["name", new RegExp("oauth|jake")], ["githubName", new RegExp("jake")]];

    packages = util.values(JSON.parse(fs.read("catalog.json")).packages);
    packages = packages.filter(function(pkg) {
				  return queries.every(function(query){
						   var key = query[0];
						   var pattern = query[1];
						   return pattern.test(pkg[key]);
					       });
			       }).map(function(pkg) { return pkg.name;});
    
    print(packages);
    
    
    
/*   
    packages = util.values(JSON.parse(fs.read("catalog.json")).packages).filter(function(info){ 
		   return info.name === "karma-test";
	       }).map(function(info){ return info.name;});
				  
    installer.install('', packages);
*/    

};

exports.main = function main(args) {
    var options = parser.parse(args);
    
    if (options.args.length > 1) {
        parser.printHelp(options);
        parser.exit(options);
    }

    install(options);    



   // if(options.interactive === true){
//	print("interactive is true");
  //  }
//    install();

};

if (module.id == require.main){
    exports.main(system.args);
}
    
