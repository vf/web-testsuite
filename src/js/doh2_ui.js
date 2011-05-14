/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
doh.ui = {
	// summary: This object contains the functions that are responsible for rendering out the results of each test.
	// description: Override this object or the funtion(s) you need to override.
	
	results:[],

	started:function(){
		// summary: This is called when run() was called the first time.
		//console.log(doh._numTests + " tests registered, in " + doh._groups.length + " groups");
		//console.log("--------");
		embed.query(".notCustomConfigured")[0].style.display = config._meta.isCustomConfiguration ? "none" : "inline";
	},

	groupStarted:function(group){
		// summary: Called before a group's tests get executed.
		ui.groupHeader(group.name, group.tests.length);
	},
	
	groupFinished:function(group){
		// summary: After all group's tests ran.
		//console.log(group.numTestsExecuted + " tests ran, " +
		//			group.numFailures + " failures, " +
		//			group.numErrors + " errors");
		//console.log("--------");
	},
	
	testStarted:function(group, test){
		// summary: Before a test's test() method is executed.
	},
	
	testFailure:function(group, test, error){
		// summary: After a test failed.
		var out = "";
		if(error instanceof doh.assert.Failure){
			if(error.fileName){ out += error.fileName + ':'; }
			if(error.lineNumber){ out += error.lineNumber + ' '; }
			out += error+": "+error.message;
		}
		ui.failure(test, error);
	},
	
	testError:function(group, test, error){
		// summary: After a test failed.
		ui.error(test, error);
	},
	
	testFinished:function(group, test, success){
		// summary: 
		if (success){
			ui.success(test);
		}
		var numFailed = doh._numFailures + doh._numErrors;
		embed.query(".statusBar .numFailed")[0].innerHTML = numFailed;
		embed.query(".statusBar .percentFailed")[0].innerHTML = Math.round(100 * numFailed / doh._numTestsExecuted);
		embed.query(".statusBar .numTestsDone")[0].innerHTML = doh._numTestsExecuted;
		ui.resetInfo();
	},
	
	storeResult:function(resultData){
		this.results.push(resultData);
	},
	
	showStats:function(){
		var node = document.getElementById("statsOverlay"); // Fill the stats in here.
		node.innerHTML = ""; // Empty it first, multiple calls would add the same content again.
		node.style.display = "block";
		window.scrollTo(0, 0);
		var lastGroup = null;
		for (var i=0, l=this.results.length, res; i<l; i++){
			res = this.results[i];
			if (lastGroup!=res.test.groupName){
				embed.create("h1", {innerHTML:"Tests: " + res.test.groupName}, node);
				lastGroup = res.test.groupName;
			}
			var innerHTML = res.test._rawId + ": " + res.test.name;
			var barNode = embed.create("div", {"class":"bar " + res.result.replace(/[^0-9a-zA-Z]/, ""), innerHTML:innerHTML}, node);
		}
		// Create and connect the close button.
		// no idea why this
		// 		 onclick:"doh.ui.hideStats()"
		// as a property in the create() doesnt work :(
		embed.connect(embed.create("button", {innerHTML:"Close"}, node), "onclick", function(){ doh.ui.hideStats() });
	},
	
	hideStats:function(){
		var node = document.getElementById("statsOverlay");
		node.style.display = "none";
	},
	
	report:function(){
		// summary: 
		ui.report(doh._numTests, doh._groups.length, doh._numErrors, doh._numFailures, doh._numNotApplicable);
		var infoData = [
			"window.navigator.appCodeName",
			"window.navigator.appName",
			"window.navigator.appMinorVersion",
			"window.navigator.appVersion",
			"window.navigator.userAgent",
			"window.navigator.language",
			"window.navigator.product",
			"window.navigator.mimeTypes",
			"window.navigator.plugins",
			"window.navigator.onLine",
			"window.navigator.platform",
			"window.navigator.vendor",
			"window.navigator.cookieEnabled",
			"window.navigator.geolocation",
			"window.navigator.productSub",
			"window.navigator.userLanguage",
			"window.navigator.vendorSub",
			"window.navigator.javaEnabled",
			"window.navigator.getStorageUpdates",
			"window.navigator.taintEnabled",
			"window.applicationCache",
			"window.HTMLCanvasElement",
			"window.HTMLMediaElement",
			"window.HTMLAudioElement",
			"window.HTMLVideoElement",
			"window.HTMLMeterElement",
			"window.localStorage",
			"window.NodeList",
			"window.SVGDocument",
			"window.JSON.stringify",
			"window.JSON.parse",
			"window.WebGLRenderingContext",
			"window.Worker",
			"window.screen.availHeight",
			"window.screen.availLeft",
			"window.screen.availWidth",
			"window.screen.availTop",
			"window.screen.height",
			"window.screen.left",
			"window.screen.top",
			"window.screen.width",
			"widget.name",
			"widget.id",
			"widget.version",
			"widget.widgetMode",
			"widget.height",
			"widget.width",
			"Widget.Device.widgetEngineName",
			"Widget.Device.widgetEngineProvider",
			"Widget.Device.widgetEngineVersion",
			"Widget.Device.AccountInfo.phoneOperatorName",
			"Widget.Device.DeviceInfo.phoneColorDepthDefault",
			"Widget.Device.DeviceInfo.phoneFirmware",
			"Widget.Device.DeviceInfo.phoneManufacturer",
			"Widget.Device.DeviceInfo.phoneModel",
			"Widget.Device.DeviceInfo.phoneOS",
			"Widget.Device.DeviceInfo.phoneScreenHeightDefault",
			"Widget.Device.DeviceInfo.phoneScreenWidthDefault",
			"Widget.Device.DeviceInfo.phoneSoftware",
			"Widget.Device.DeviceInfo.totalMemory",
			"Widget.Device.DeviceStateInfo.language",
		];
		var info = {};
		for (var i=0, l=infoData.length, d; i<l; i++){
			d = infoData[i];
			var obj = util.getObject(d);
			// Convert functions and object into strings.
			// But only if they are not null, 0, undefined, or alike, leave those alone.
			if (obj && (typeof obj=="function" || typeof obj=="object")){
				obj = ""+obj;
			}
			info[d] = obj;	
		}
		// ******************
		// The version of the data structure we send to the server to store the data
		// If any of the data change, update this version!!!!!!!!!!!
		// ******************
		info.__version__ = 20110104;
		//this._sendToJdrop(info);
	},
	
	_sendToJdrop:function(info){
// still TODO
		if (confirm("Click OK to send the test results to 'http://jdrop.org/save'")){
			var el = embed.query(".report .sendingResults")[0];
			el.style.display = "block";
			util.xhrPost({
				url:"http://jdrop.org/save",
				callback:function(){
					el.innerHTML = "Test results sent.";
					// Delay the hiding a bit, so the user sees it for sure.
					setTimeout(function(){
						// The Opera WRT doesn't seem to do this properly :(
						el.style.display = "none";
					}, 2000);
				},
				data: "info=" + window.encodeURIComponent(embed.toJson(info))
					+ "&test_data=" + window.encodeURIComponent(embed.toJson(this.results))
			});
		}
	},
	
	_sendToVodafone:function(info){
		if (confirm("Click OK to send the test results to 'developer.vodafone.com'")){
			var el = embed.query(".report .sendingResults")[0];
			el.style.display = "block";
			util.xhrPost({
				url:"http://developer.vodafone.com/widget-test/add/",
				callback:function(){
					el.innerHTML = "Test results sent.";
					// Delay the hiding a bit, so the user sees it for sure.
					setTimeout(function(){
						// The Opera WRT doesn't seem to do this properly :(
						el.style.display = "none";
					}, 2000);
				},
				data: "info=" + window.encodeURIComponent(embed.toJson(info))
					+ "&test_data=" + window.encodeURIComponent(embed.toJson(this.results))
			});
		}
	}
};