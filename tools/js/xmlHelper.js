var xmlHelper = {
	// summary: This object encapsulates functions for handling our XML files (like the config.xml file).
	
	header:"",
	
	getXmlObject:function(config, features){
		// summary: Create and return the XML object which represents the config.xml in order to manipulate it in any way.
		// config: Object
		// 		The keys in this object are those that can be used inside the config.xml.tpl-js
		var rawConfigXml = util.loadTextFile(config.configXmlTemplateFile);
		rawConfigXml = this._renderConfigTemplate(rawConfigXml, config);
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
		if (features=="all" || features.length){
			if (features=="all"){
				var allFeatures = true;
			} else {
				var featuresRegExp = new RegExp(features.join("$|").toLowerCase()+"$");
			}
			// Make sure we add them in the order they are in possibleFeatures.
			for (var i=0, l=possibleFeatures.length, f; i<l; i++){
				feature = possibleFeatures[i];
				if (allFeatures || feature.match(featuresRegExp)){
					var tag = <feature name="{feature}" required="false" />; // why the fuck does this not work for me? thought it replaces the literal {feature} :(
					tag.@name = feature; // when the line above works we can remove this one here
					xml.feature += tag;
				}
			}
		}
		return xml;
	},
	
	_renderConfigTemplate: function(tplString, variables){
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

};
