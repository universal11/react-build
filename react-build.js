var Babel = require("babel-core");
var FileSystem = require('fs');
var UglifyJS = require('uglify-js');
var Path = require("path");
 


var inputFilePath = null;
var outputFilePath = null;
var doMangle = false;

function init(arguments){
	for(var i=0; i < arguments.length; i++){
		var argument = arguments[i];
		var argumentLength = arguments.length;
		switch(argument){
			case "--source":
				if(optionHasValue(i, argumentLength)){
					inputFilePath = arguments[(i + 1)];
					outputFilePath = inputFilePath.replace(Path.extname(inputFilePath), ".min.js");
				}
				break;
			case "--mangle":
				doMangle = true;
				console.log("Loaded Option: Mangle");
				break;
			default:
				break;
		}
	}
}

function optionHasValue(optionIndex, numberOfArguments){
	if((optionIndex + 1) < numberOfArguments){
		return true;
	}
	return false;
}


//begin script

init(process.argv);


console.log("Source: " + inputFilePath);
if(inputFilePath != null && outputFilePath != null){

	var contents = FileSystem.readFileSync(inputFilePath, 'utf8');
	var output = null;

	try{
		output = Babel.transform(contents, {
		 	presets: [ 
		 		["react"],
		 		["babili"]
	  	 	]
		});
	}
	catch(exception){
		console.log("Failed to transform " + inputFilePath);
		console.log("Exception: " + exception);
	}

	if(output != null){

		if(doMangle){
			output = UglifyJS.minify(output.code, {
				fromString: true,
				mangleProperties: true
			});
		}

		FileSystem.writeFileSync(outputFilePath, output.code);
		console.log("Created: " + outputFilePath);
	}

}
else{
	console.log("Please provide a source file using the --source option.");
}
