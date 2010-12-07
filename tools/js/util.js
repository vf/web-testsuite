var util = {
	endInSlash:function(path){
		return path.substr(-1)!="/" ? path+"/" : path;
	},
	
	_loadJsonFile:function(fileName, throwError){
		var ret = null;
		try{
			eval("ret = "+readFile(fileName));
		}catch(e){
			if (typeof throwError=="undefined" || throwError!=false){
				console.error("ERROR: reading file '" + fileName + "' at line "+ e.lineNumber);
				for (var key in e){ if (typeof e[key]!="function") console.error(key, ((""+e[key]).length>100 ? e[key].substr(0, 100)+"..." : e[key])) }
			}
		}
		return ret;
	},
	
	loadTextFile:function(fileName, throwError){
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
	},
}
