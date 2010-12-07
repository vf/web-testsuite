

//var SRC_PATH = arguments[0];
//var TEST_FILE = arguments[1];
//print(TEST_FILE);

var loadTextFile = function(fileName, throwError){
	var ret = null;
	try{
		ret = readFile(fileName);
	}catch(e){
		if (typeof throwError=="undefined" || throwError!=false){
			console.error("ERROR: reading file '" + fileName);
			for (var key in e){ if (typeof e[key]!="function") console.error(key, ((""+e[key]).length>100 ? e[key].substr(0, 100)+"..." : e[key])) }
		}
	}
	return ret;
};

//
//	
//

function renderConfigTemplate(tplString, variables){
	// summary: Replace placeholders like {x} in the tplString file.

	// It can also be done using XML Literal Interpolation (see http://rephrase.net/days/07/06/e4x)
	// but that seems simpler for now ... would love to learn better.
	var ret = tplString;
	for (var key in variables){
		var placeholder = '{'+key+'}';
		while(ret.indexOf(placeholder)!=-1){
			ret = ret.replace(placeholder, config[key]);
		}
	}
	return ret;
}



