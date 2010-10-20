if (typeof console=="undefined"){
	var console = {
		_log:function(){
			var out = [];
			for (var i=0, l=arguments.length, arg; i<l; i++){
				arg = arguments[i];
				if (arg && typeof arg["length"]!="undefined"){
					out.push(""+arg);
				} else if (typeof arg=="object"){
					for (var key in arg){
						if (typeof arg[key]=="function") continue;
						out.push(key+": "+arg[key]+"\n");
					}
				} else {
					out.push(arg);
				}
			}
			print(out.join("    "));
		},
		log:function(){
			if (!config.isVerbose) return;
			this._log.apply(this, arguments);
		},
		error:function(){
			this._log.apply(this, arguments);
		}
	}
};

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

var xmlHelper = {
	header:"",
	getXmlObject:function(fileName, features){
		var rawConfigXml = loadTextFile(fileName);
		rawConfigXml = renderConfigTemplate(rawConfigXml, config);
		// Remove the first line, since that is the <?xml...> which E4X can't handle yet, we will add it later again.
		this.header = rawConfigXml.split("\n")[0];
		var configXml = rawConfigXml.split("\n").slice(1).join("\n");
		
		default xml namespace = "http://www.w3.org/ns/widgets";
		var ret = new XML(configXml);
		ret = this.addFeatureTags(ret, features);
		return ret;
	},
	
	addFeatureTags:function(xml, features){
		// summary: Add the given feature tags to the xml object.
		//
		// xml:	XML Object
		// 		The XML Object representing the config.xml.
		// 		The feature tags will be added in here.
		// features: Array
		// 		A list of the tags that shall be added to the
		// 		xml object.
		// 		The values are just the API names, e.g. like so
		// 		["multimedia", "account", "config"]
		
		// Just for the Nokia it has to be before AudioPlayer *cough*
		var possibleFeatures = [
			"http://jil.org/jil/api/1.1/multimedia",
			"http://jil.org/jil/api/1.1/accelerometerinfo",
			"http://jil.org/jil/api/1.1/account",
			"http://jil.org/jil/api/1.1/accountinfo",
			"http://jil.org/jil/api/1.1/addressbookitem",
			"http://jil.org/jil/api/1.1/attachment",
			"http://jil.org/jil/api/1.1/audioplayer",
			"http://jil.org/jil/api/1.1/calendaritem",
			"http://jil.org/jil/api/1.1/callrecord",
			"http://jil.org/jil/api/1.1/config",
			"http://jil.org/jil/api/1.1/device",
			"http://jil.org/jil/api/1.1/deviceinfo",
			"http://jil.org/jil/api/1.1/devicestateinfo",
			"http://jil.org/jil/api/1.1/eventrecurrencetypes",
			"http://jil.org/jil/api/1.1/message",
			"http://jil.org/jil/api/1.1/messaging",
			"http://jil.org/jil/api/1.1/messagequantities",
			"http://jil.org/jil/api/1.1/messagetypes",
			"http://jil.org/jil/api/1.1/powerinfo",
			"http://jil.org/jil/api/1.1/positioninfo",
			"http://jil.org/jil/api/1.1/widget",
		
			"http://jil.org/jil/api/1.1.1/datanetworkinfo",
			"http://jil.org/jil/api/1.1.1/file",
			"http://jil.org/jil/api/1.1.1/radioinfo",
			"http://jil.org/jil/api/1.1.1/pim",
			"http://jil.org/jil/api/1.1.1/telephony",
			"http://jil.org/jil/api/1.1.1/callrecordtypes",
			"http://jil.org/jil/api/1.1.1/widgetmanager",
		
			"http://jil.org/jil/api/1.1.2/camera",
			"http://jil.org/jil/api/1.1.2/videoplayer",
		
			"http://jil.org/jil/api/1.1.4/messagefoldertypes",
		
			"http://jil.org/jil/api/1.1.5/applicationtypes",
			"http://jil.org/jil/api/1.1.5/exception",
			"http://jil.org/jil/api/1.1.5/exceptiontypes",
			"http://jil.org/jil/api/1.1.5/radiosignalsourcetypes",
		];
		// Create a regexp that search for the tag name at the end of the string, so we
		// don't find "message" in "messagetype". Regexp will look like so: /config$|message$/
		var featuresRegExp = new RegExp(features.join("$|").toLowerCase()+"$");
console.log(featuresRegExp);
		// Make sure we add them in the order they are in possibleFeatures.
		for (var i=0, l=possibleFeatures.length, f; i<l; i++){
			feature = possibleFeatures[i];
			if (feature.match(featuresRegExp)){
				var tag = <feature name="{feature}" required="false" />; // why the fuck does this not work for me? thought it replaces the literal {feature} :(
				tag.@name = feature; // when the line above works we can remove this one here
				xml.feature += tag;
			}
		}
		return xml;
	},
};

//
//	The real stuff
//
var config = {
	versionString:+new Date(), // So the latest widget has always a newer version and automatically updates when installed.
	widgetIdSuffix: "test-base-widget-update-update-v0",
	widgetName:"update0 (base/widget-update)"
};

var features = ["widget", "audioplayer", "multimedia"];
var xml = xmlHelper.getXmlObject("/Users/cain/work/vodafone-jil/src/widget-test-suite/src/config.xml.tpl", features);
xml.@version = "0";
//xml.widget.id =


print(xmlHelper.header);
print(xml);




/*


importPackage(java.io); // So we can use FileWriter, FileReader.
importPackage(java.util);
var file = {
	
	appendFile:function(fromFileName, toFileName){
		var r = new Scanner(new FileReader(fromFileName));
		var w = new FileWriter(toFileName, true); // 2nd param true, means append new stuff.
		w.write(fromFileName.replace(config.rootDirectory, ""));
		var text;
		// repeat until all lines is read
		while (r.hasNextLine()){
			w.write(r.nextLine()+"\n");
		}
		w.close(); // Make sure to flush, thats what close() does, otherwise we loose lines :).
	},
	
	write:function(fileName, content){
		var f = new FileWriter(fileName);
		f.write(content);
		f.close();
	},
	
	exists:function(fileName){
		return new File(fileName).exists();
	},
};
*/