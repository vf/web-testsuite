


/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/dojo.js
********************/


var embed = dojo = {};
embed.config = {};
embed.global = window;
embed.doc = document;
embed.body = function() {
	return document.body;
};



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/json/json.js
********************/


// NOTE: dojo's JSON impl differs from native!
//	(e.g. revier function)

dojo.toJson = function(/* Mixed */ data){
	return JSON.stringify(data);
};

dojo.fromJson = function(/* String */ json){
	return JSON.parse(json);
}
