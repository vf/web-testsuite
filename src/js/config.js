var config = {
	isValid: false
};
(function(){
	
// TOD how can we embed this into the synchronous loading process to fill the config??
	//function _findValidAddressBookItemId(callback){
	//	try{
	//		var pim = Widget.PIM;
	//		var addr = new pim.AddressBookItem();
	//		addr.setAttributeValue("fullName", "*");
	//		Widget.PIM.onAddressBookItemsFound = function(items){
	//			if (items.length>0){
	//				callback(items[0].addressBookItemId);
	//			}
	//		}
	//		pim.findAddressBookItems(addr, 0, 1);
	//		delete pim.onAddressBookItemsFound;
	//	}catch(e){
	//		callback(null);
	//	}
	//}

	var defaults = {
		// summary: This configuration defines the features of the phone.
		// description: It maybe used to determine if a test is viable
		// 		and shall be added or not. E.g. if a phone has a certain hardware
		// 		feature or not, like a clamshell.
		hasAccelerometer:true,
		hasClipboard:false,
		hasClamshell:false,
		hasKeypadLight:false,
		
		supportsOrientationLandscape:true,
		supportsMultipleEmailAccounts:true,
		supportsDeleteEmailAccounts:true,
		// The H2 for example doesn't support editing the folders in email, sms and MMS
		// this option allows to disable it.
		supportsMessagingFolderEditing:true,

		
		// Set this to true if the device can open multiple applications.
		// E.g. we can only test Widget.onRestore when the device allows to put the
		// application in the background.
		canDoMultitasking:true,
		
		canGetPositionByCellid:true,
		canGetPositionByGps:true,
		canGetPositionByAgps:true,
		
		validAddressBookItemId:"",
		validCalendarItemId:"",
		validPhoneNumber:"0049123456789",
		
		// Various file system settings that will be used for testing, etc.
		// NOTE: Paths must always end with the directorySeparator
		// (just to have less hazzle when just adding a filename in the test).
		fileSystem:{
			directorySeparator:"/",
			
			// A path where we can read a file from, do directory listing or something alike.
			readablePath:"/virtual/photos/",
			// Specify a file name here for a file that is readable.
			// E.g. for testing methods like getFile().
			readableFile:"/virtual/photos/test-photo/test.txt",
			emptyReadableDirectory:"/virtual/photos/test-photo/testdir",
			
			// Writeable file or path.
			writeablePath:"/virtual/photos/",
			writeableFile:"/virtual/photos/test-photo/test-write.txt",
			
			// The root path of the widget, where we can e.g. read out all the
			// files provided with the widget (like audio or video files).
			widgetPath:"",
			playableAudioFiles:{
				inWidget:{
					songWav:"audio/wav/music.wav",
					songMp3:"audio/mp3/music.mp3",
					loopWav:"audio/wav/loop.wav",
					loopMp3:"audio/mp3/loop.mp3"
				},
				onDevice:{
					songWav:"/virtual/music/test-audio/wav/music.wav",
					songMp3:"/virtual/music/test-audio/mp3/music.mp3",
					loopWav:"/virtual/music/test-audio/wav/loop.wav",
					loopMp3:"/virtual/music/test-audio/mp3/loop.mp3"
				}
			},
			playableVideoFiles:{
				viaHttp:"http://...",
				viaHttps:"https://...",
				viaRtsp:"rtsp://...",
				viaFile:"file:///", // ??? shall this be the virtual FS or the real FS (=device specific)???
				threeGp:{
					inWidget:"test-video/3gp/testvideo.3gp",
					onDevice:"/virtual/videos/test-video/3gp/testvideo.3gp",
				}
				//loop3gp:"video/mp4/???.mp4"
			},
			imageFile:""
		},
		
		geolocation:{
			timeouts:{
				gps:180 * 1000,
				agps:5 * 1000,
				cellId:5 * 1000
			}
		}
	};

	//
	//	Configure your stuff here!!!!!!!!!!!!!!
	//
	var configs = {
		//
		//	Vodafone 360 Devices, H1/M1
		//
		"regexp:^WidgetManager;\\sSAMSUNG-GT-I8320-Vodafone;AppleWebKit.*":function(){
			// Figure out the widget's root directory by making a filesystem
			// function throw an error and reading the "sourceURL" property of this error.
			// It returns the filename for this config.js file.
			var readableFile = "";
			try{
				Widget.Device.getDirectoryFileNames("doesn't exist anyway!");
			}catch(e){
				if (e.sourceURL){
					readableFile = e.sourceURL;
				}
			}
			// Replace multiple trailing slashes, explicitly (just to be sure).
			var widgetPath = readableFile.replace(/\/js\/config\.js$/, "").replace(/\/+$/, "")+"/";
			
			var ret = {
				canDoMultitasking:false,
				validCalendarItemId:"1",
				validAddressBookItemId:"1",
				validPhoneNumber:"00491234567890"
				// Add the device's configuration, different from the default here!
			};
			return ret;
		},
		//
		//	Vodafone 360 Devices, H2, M2
		//
		"regexp:^WidgetManager;\\sSAMSUNG-GT-I8330-Vodafone;AppleWebKit.*":function(){
			var ret = {
				supportsMultipleEmailAccounts:false,
				supportsDeleteEmailAccounts:false,
				supportsMessagingFolderEditing:false,
				validCalendarItemId:"1",
				validAddressBookItemId:"1" // The first contact filled in this device really has the ID "1".
			};
			// AGPS==GPS
			ret.geolocation = {
				timeouts: {
					agps: defaults.geolocation.timeouts.gps
				}
			};
			return ret;
		},
		//
		//	Opera Widget Runtime for Vodafone for Android
		//
		"regexp:^WidgetManager;.*\\(Android.*Opera.*Widgets.*":function(){
			var ret = {
			};
			return ret;
		},
		//
		//	PC, Opera Widget Runtime
		//
		"regexp:Opera\\/9\\.64(.*)Presto\\/2\\.1\\.1":function(){
			var ret = {
				hasClipboard:true,
				hasClamshell:false,
				validAddressBookItemId:1,
				validCalendarItemId:1,
				validPhoneNumber:"00491234567890"
			};
			return ret;
		},
		//
		//	Opera Widgets 10.00 (Emulator, maybe also when running on a device)
		//
		"regexp:Opera\\/9\\.80(.*)Presto\\/2\\.4\\.18":function(){
		},
		//
		//	Firefox on PC
		//
		// e.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-GB; rv:1.9.2) Gecko/20100115 Firefox/3.6"
		"regexp:Mozilla.*Gecko\/\\d+\\sFirefox.*":function(){
// using only "AppleWebkit" here would also be found on the H2
		//"regexp:(.*AppleWebKit.*)|(Mozilla.*Gecko\/\\d+\\sFirefox.*)":function(){
			var ret = {
				hasClipboard:true,
				hasClamshell:false,
				validAddressBookItemId:1,
				validCalendarItemId:1,
				validPhoneNumber:"00491234567890"
			};
			return ret;
		},
		//
		// Chrome, Ripple
		//
		//"regexp:Mozilla.*Chrome":function(){
		//	var ret = {
		//	};
		//	return ret;
		//},
		
		// Made for UAs
		// 		WidgetManager; Nokia N96....
		// 		WidgetManager; Nokia 5800...
		"regexp:^WidgetManager;\\sNokia\\s(N)?\\d+;\\sOpera.*":function(){
			var widgetPath = (""+window.location).replace("widget://localhost/", "").replace(/index.html$/, "");
			var ret = {
				hasClipboard:true,
				hasClamshell:false,
				validAddressBookItemId:"00e150ed9bcd6f11",
				validCalendarItemId:1,
				validPhoneNumber:"00491234567890"
			};
			return ret;
		},
		"WidgetManager; NOKIA E52-1; Opera/9.5 (S60; Symbian OS; U; de; Opera Mobile/1109)":function(){
			var widgetPath = (""+window.location).replace("widget://localhost/", "").replace(/index.html$/, "");
			var ret = {
				hasClipboard:true,
				hasClamshell:false,
				validAddressBookItemId:1,
				validCalendarItemId:1,
				validPhoneNumber:"00491234567890"
			};
			return ret;
		}
	};
	//
	//	END of the configuring stuff.
	//




	//
	// Find the config we have to mixin.
	//
	var ua = window.navigator.userAgent,
		configToMixin = null;
//ua = "WidgetManager; SAMSUNG-GT-I8320-Vodafone;AppleWebKit/528.5+(X11;U;Linux;en;i8329BUIH8)";
	for (var key in configs){
		var c = configs[key];
		if (key.indexOf("regexp:")===0){
			if (ua.match(new RegExp(key.substr(7)))){
				configToMixin = c();
				break;
			}
		} else if(key===ua){
			configToMixin = c();
			break;
		}
	}
	if (configToMixin!==null){
		doh.util.mixin(config, defaults);
		// Mixin the additional config params.
		// Mixin recursively so objects don't have to declare each key again!
		for (var key in configToMixin){
			var v = configToMixin[key];
			if (typeof v=="object"){
				doh.util.mixin(config[key], v);
			} else {
				config[key] = v;
			}
		}
		config.isValid = true;
	}
})();
