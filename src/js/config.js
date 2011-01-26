var config = {};

var configHelper = {
	_numAsynchConfigsDone:0,
	// This function better be overwritten to start everything that
	// shall be done after configuration is done.
	// The configuration has to be asynch since there are some methods
	// that are asynch for setting up the environment.
	onConfigured: function(){
		alert("You must override 'configHelper.onConfigured'!")
	},
	
	asynchConfigDone:function(){
		this._numAsynchConfigsDone++;
		this.finishConfiguration();
	},
	
	finishConfiguration:function(){
		if (this._numAsynchConfigsDone == config._meta.numAsynchConfigs){
			setTimeout(function(){
				configHelper.onConfigured();
			}, 100);
		}
	}
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
		_meta:{
			isCustomConfiguration:false,
			appliedConfigName:"",
			name:"default", // A nice readable name which we can also show in a string like "Configured for XXXX".
			numAsynchConfigs:0 // This is actually only needed while configuring, onConfigured is fired when all asynch config callbacks have returned.
		},
		
		// The "userInfo" data are purely meant for informing the user about
		// certain device settings, like where is the music folder located, etc.
		_userInfo:{
			audioDirectory:"unknown",
			videoDirectory:"unknown",
			photoDirectory:"unknown"
		},
		
		// summary: This configuration defines the features of the phone.
		// description: It maybe used to determine if a test is viable
		// 		and shall be added or not. E.g. if a phone has a certain hardware
		// 		feature or not, like a clamshell.
		hasAccelerometer:true,
		hasClipboard:true,
		hasClamshell:false,
		hasKeypadLight:false,
		
		supportsOrientationLandscape:true,
		supportsMultipleEmailAccounts:true,
		supportsDeleteEmailAccounts:true,
		
		unsupportedApis:[],
		
		// Some devices/platforms don't support certain features and they normally need to return UNSUPPORTED
		// exception, but to run the correct tests (those testing for the exception) we need to configure
		// the platforms. That is done here.
		// The list below ONLY lists those features that need to be turned off for a certain platform
		// if there is one missing add it, by default the features are all expected to be supported (default value is true).
		supports:{
			// On the first the module (=test file) is given.
			Messaging:{
				moveMessage:true, // moveToFolder()
				editFolder:true, // If createFolder(), moveFolder(), deleteFolder() are NOT supported set this to false.
				multipleEmailAccounts:true
			}
		},

		
		// Set this to true if the device can open multiple applications.
		// E.g. we can only test Widget.onRestore when the device allows to put the
		// application in the background.
		canDoMultitasking:true,
		
		validAddressBookItemId:"1",
		validCalendarItemId:"1", // The first contact filled in an H2 really has the ID "1".
		
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
				//FILE             | DETAILS - AUDIO
				//------------------------------------------------------------
				//loop.flac        | FLAC
				//song.flac        | Stereo, 44.1 GHz, 16 bps
				//-----------------+------------------------------------------
				//loop.m4a         | MPEG-4 AAC audio
				//song.m4a         | Stereo, 44.1 GHz, 128 Kb/s
				//-----------------+------------------------------------------
				//loop.mp2         | MPEG 1 Audio, Layer 2
				//song.mp2         | Stereo, 44.1 GHz, 160 Kb/s
				//-----------------+------------------------------------------
				//loop.mp3         | MPEG 1 Audio, Layer 3 (MP3)
				//song.mp3         | Stereo, 44.1 GHz, 128 Kb/s
				//-----------------+------------------------------------------
				//loop.ogg         | Vorbis
				//song.ogg         | Stereo, 44.1 GHz, 160 Kb/s
				//-----------------+------------------------------------------
				//loop.wav         | Uncomp. 16-bit PCM audio (PCM S16 LE)
				//song.wav         | Stereo, 44.1 GHz, 16 bps
				inWidget:{
					songFlac:"test-audio/song.flac",
					songM4a:"test-audio/song.m4a",
					songMp2:"test-audio/song.mp2",
					songMp3:"test-audio/song.mp3",
					songOgg:"test-audio/song.ogg",
					songWav:"test-audio/song.wav",
					
					loopFlac:"test-audio/loop.flac",
					loopM4a:"test-audio/loop.m4a",
					loopMp2:"test-audio/loop.mp2",
					loopMp3:"test-audio/loop.mp3",
					loopOgg:"test-audio/loop.ogg",
					loopWav:"test-audio/loop.wav"
				},
				onDevice:{
					songFlac:"/virtual/music/test-audio/song.flac",
					songM4a:"/virtual/music/test-audio/song.m4a",
					songMp2:"/virtual/music/test-audio/song.mp2",
					songMp3:"/virtual/music/test-audio/song.mp3",
					songOgg:"/virtual/music/test-audio/song.ogg",
					songWav:"/virtual/music/test-audio/song.wav",
					
					loopFlac:"/virtual/music/test-audio/loop.flac",
					loopM4a:"/virtual/music/test-audio/loop.m4a",
					loopMp2:"/virtual/music/test-audio/loop.mp2",
					loopMp3:"/virtual/music/test-audio/loop.mp3",
					loopOgg:"/virtual/music/test-audio/loop.ogg",
					loopWav:"/virtual/music/test-audio/loop.wav"
				}
			},
			playableVideoFiles:{
				//long-h263_lq.3gp | H.263, 176*144, 15 fps (bad quality)
				//loop-h263_lq.3gp | AMR audio, Mono, 8 GHz (bad quality)
				//-----------------+------------------------------------------
				//long-h264.mp4    | H.264 / AVC, 320*180, 30 fps
				//loop-h264.mp4    | MPEG-4 AAC audio, Stereo, 44.1 GHz
				//-----------------+------------------------------------------
				//long-mpeg4.mp4   | MPEG-4 video, 320*180, 30 fps
				//loop-mpeg4.mp4   | MPEG-4 AAC audio, Stereo, 44.1 GHz
				//-----------------+------------------------------------------
				//long-theora.ogv  | Theora, 320*180, 30 fps
				//loop-theora.ogv  | Vorbis, Stereo, 44.1 GHz, 112 Kb/s
				//-----------------+------------------------------------------
				//long-webm.webm   | VP8 video, 320*180, 30 fps
				//loop-webm.webm   | Vorbis, Stereo, 44.1 GHz, 112 Kb/s
				h263:{
					inWidget:"test-video/long-h263_lq.3gp",
					onDevice:"/virtual/videos/test-video/long-h263_lq.3gp",
					inWidget1:"test-video/loop-h263_lq.3gp",
					onDevice1:"/virtual/videos/test-video/loop-h263_lq.3gp"
				},
				h264:{
					inWidget:"test-video/long-h264.mp4",
					onDevice:"/virtual/videos/test-video/long-h264.mp4",
					inWidget1:"test-video/loop-h264.mp4",
					onDevice1:"/virtual/videos/test-video/loop-h264.mp4"
				},
				mpeg4:{
					inWidget:"test-video/long-mpeg4.mp4",
					onDevice:"/virtual/videos/test-video/long-mpeg4.mp4",
					inWidget1:"test-video/loop-mpeg4.mp4",
					onDevice1:"/virtual/videos/test-video/loop-mpeg4.mp4"
				},
				theora:{
					inWidget:"test-video/long-theora.ogv",
					onDevice:"/virtual/videos/test-video/long-theora.ogv",
					inWidget1:"test-video/loop-theora.ogv",
					onDevice1:"/virtual/videos/test-video/loop-theora.ogv"
				},
				webm:{
					inWidget:"test-video/long-webm.webm",
					onDevice:"/virtual/videos/test-video/long-webm.webm",
					inWidget1:"test-video/loop-webm.webm",
					onDevice1:"/virtual/videos/test-video/loop-webm.webm"
				}
			},
			imageFile:""
		},
		
		events:{
			invalidRecurrenceTypes:[] // By default all are valid, just list those here that are in the spec but not valid.
		},
		
		geolocation:{
			supportsAgps:true,
			supportsCellId:true,
			supportsGps:true,
			timeouts:{
				gps:180 * 1000,
				agps:5 * 1000,
				cellId:15 * 1000
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
				_meta:{name:"VF 360 (H1/M1)"},
				hasClipboard:false,
				canDoMultitasking:false
				// Add the device's configuration, different from the default here!
			};
			return ret;
		},
		//
		//	Vodafone 360 Devices, H2 (I8330), M2 (I6420)
		//
		"regexp:^WidgetManager;\\sSAMSUNG-GT-I\\d{4}-Vodafone;AppleWebKit.*":function(){
			var ret = {
				_meta:{name:"VF 360 (H2)"},
				hasClipboard:false,
				// AGPS==GPS so set the timeout to the same on the H2
				geolocation:{
					timeouts: {
						agps: defaults.geolocation.timeouts.gps
					}
				},
				events: {
					invalidRecurrenceTypes: ['EVERY_WEEKDAY', 'MONTHLY_ON_DAY']
				},
				supports: {
					Messaging:{
						moveMessage: false,
						editFolder: false,
						multipleEmailAccounts: false
					}
				}
			};
			return ret;
		},
		//
		//	Opera Widget Runtime for Vodafone for Android
		//
		"regexp:^WidgetManager;.*\\(Android.*Opera.*Widgets.*":function(){
			var ret = {
				_meta:{name:"Android Opera WRT", numAsynchConfigs:0},
				_userInfo:{
					audioDirectory:"/sdcard/media/audio",
					videoDirectory:"/sdcard/DCIM/100media",
					photoDirectory:"/sdcard/DCIM/100media",
				},
				validAddressBookItemId:1,
				fileSystem:{
					readablePath:"/sdcard",
					readableFile:"/sdcard/DCIM/100media/test-audio/loop.mp3",
					playableAudioFiles:{
						onDevice:{} // Will be set further down
					}
				},
				unsupportedApis:[
					"Widget.Device.RadioInfo.radioSignalSource",
					"Widget.Device.RadioInfo.radioSignalStrengthPercent",
					"Widget.Device.RadioInfo.onSignalSourceChange",
					"Widget.Device.DataNetworkInfo.onNetworkConnectionChanged",
					"Widget.Device.DataNetworkInfo.getNetworkConnectionName",
					"Widget.Device.DataNetworkInfo.networkConnectionType",
					"Widget.Device.clipboardString",
					"Widget.Device.copyFile",
					"Widget.Device.deleteFile",
					"Widget.Device.findFiles",
					"Widget.Device.getFileSystemRoots",
					"Widget.Device.getFileSystemSize",
					"Widget.Device.moveFile",
					"Widget.Device.onFilesFound",
					"Widget.Device.setRingtone",
					"Widget.Device.vibrate",
					"Widget.Device.PowerInfo",
					"Widget.Device.DeviceInfo.ownerInfo",
					"Widget.Device.DeviceInfo.totalMemory",
					"Widget.Device.DeviceStateInfo.audioPath",
					"Widget.Device.DeviceStateInfo.backLightOn",
					"Widget.Device.DeviceStateInfo.keypadLightOn",
					"Widget.Device.DeviceStateInfo.onScreenChangeDimensions",
					"Widget.Device.DeviceStateInfo.Config",
					"Widget.Device.DeviceStateInfo.processorUtilizationPercent",
					"Widget.Device.PositionInfo.altitudeAccuracy",
					"Widget.Device.PositionInfo.cellID",
					"Widget.PIM.deleteAddressBookItem",
					"Widget.Multimedia.isVideoPlaying",
					"Widget.Multimedia.VideoPlayer.*",
					"Widget.Multimedia.Camera.setWindow",
					"Widget.PIM.AddressBookItem.getAddressGroupNames",
					"Widget.PIM.addCalendarItem",
					"Widget.PIM.createAddressBookGroup",
					"Widget.PIM.deleteAddressBookGroup",
					"Widget.PIM.deleteCalendarItem",
					"Widget.PIM.exportAsVCard",
					"Widget.PIM.findCalendarItems",
					"Widget.PIM.getAvailableAddressGroupNames",
					"Widget.PIM.getCalendarItem",
					"Widget.PIM.getCalendarItems",
					"Widget.PIM.onCalendarItemAlert",
					"Widget.PIM.onCalendarItemsFound",
					"Widget.PIM.Calendar*",
					"Widget.PIM.EventRecurrenceTypes",
					"Widget.Device.AccountInfo.phoneMSISDN",
					"Widget.Device.AccountInfo.userSubscriptionType",
					"Widget.Device.AccountInfo.userAccountBalance",
					"Widget.Telephony*",
					"Widget.CallRecord*",
					"Widget.Messag*", // includes Message, Messaging, etc.
					"Widget.Attachment",
					"Widget.Account",
					"Widget.Config"
				]
			};
			
			for (var i in defaults.fileSystem.playableAudioFiles.onDevice){
				ret.fileSystem.playableAudioFiles.onDevice[i] = defaults.fileSystem.playableAudioFiles.onDevice[i].replace("/virtual/music", "file:///sdcard/DCIM/100media");
 			}
			
			// Get the first calendarItemId found.
// No cal implemented on opera yet
			//ret._meta.numAsynchConfigs++; // We have an asynch config parameter here, "register" it.
			//pim.onCalendarItemsFound = function(items){
			//	if (items.length>0){
			//		config.validCalendarItemId = items[0].calendarItemId;
			//	}
			//	setTimeout(function(){ pim.onCalendarItemsFound = null; }, 1);
			//	configHelper.asynchConfigDone();
			//}
			//var item = new pim.CalendarItem();
			//item.eventName = "*";
			//pim.findCalendarItems(item, 0, 1);
			
			// If the addressbook item with ID 0 doesnt exist search for it.
			// Why? (Currently the Opera WRT crashes on findAddressBookItem) and mostly ID=1 exists.
			// And since that is prefix for every widget, we would like it not to crash :).
			try{
				var pim = Widget.PIM;
				// Try to read the item, by spec it throws an exception if the ID is invalid.
				pim.getAddressBookItem(ret.validAddressBookItemId);
			}catch(e){
				// Get the first addressbook item
				ret._meta.numAsynchConfigs++; // We have an asynch config parameter here, "register" it.
				try{ // Possibly the getting the addressbookitem fails, maybe because the feature URL is missing ...
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "*");
					Widget.PIM.onAddressBookItemsFound = function(items){
						if (items && items.length>0){
							config.validAddressBookItemId = items[0].addressBookItemId;
						}
						setTimeout(function(){ pim.onAddressBookItemsFound = null; }, 1);
						configHelper.asynchConfigDone();
					}
					pim.findAddressBookItems(addr, 0, 1);
				}catch(e){
					ret._meta.numAsynchConfigs--; // Decrease it again, since it obviously failed.
				}
			}
			
			return ret;
		},
		//
		//	Opera Widget Runtime for Vodafone for Nokia
		//
		"regexp:^WidgetManager;.*\\(S60;\\sSymbian.*Opera":function(){
			var ret = {
				_meta:{name:"S60 Opera WRT", numAsynchConfigs:0},
				_userInfo:{
					audioDirectory:"C:/Data/Sounds",
					videoDirectory:"C:/Data/Videos",
					photoDirectory:"C:/Data/Images"
				},
				validAddressBookItemId:1,
				fileSystem:{
					readablePath:"C:/Data/Sounds",
					readableFile:"C:/Data/Sounds/test-audio/loop.mp3",
					playableAudioFiles:{
						onDevice:{
							// Hope we soon wont need it and opera builds the virtual fs
							songWav:"file://C:/Data/Sounds/test-audio/music.wav",
							songMp3:"file://C:/Data/Sounds/test-audio/music.mp3",
							loopWav:"file://C:/Data/Sounds/test-audio/loop.wav",
							loopMp3:"file://C:/Data/Sounds/test-audio/loop.mp3"
						}
					}
				},
				unsupportedApis:[
					"Widget.Device.RadioInfo.radioSignalSource",
					"Widget.Device.RadioInfo.radioSignalStrengthPercent",
					"Widget.Device.RadioInfo.onSignalSourceChange",
					"Widget.Device.DataNetworkInfo.onNetworkConnectionChanged",
					"Widget.Device.DataNetworkInfo.getNetworkConnectionName",
					"Widget.Device.DataNetworkInfo.networkConnectionType",
					"Widget.Device.clipboardString",
					"Widget.Device.copyFile",
					"Widget.Device.deleteFile",
					"Widget.Device.findFiles",
					"Widget.Device.getFileSystemRoots",
					"Widget.Device.getFileSystemSize",
					"Widget.Device.moveFile",
					"Widget.Device.onFilesFound",
					"Widget.Device.setRingtone",
					"Widget.Device.vibrate",
					"Widget.Device.PowerInfo",
					"Widget.Device.DeviceInfo.ownerInfo",
					"Widget.Device.DeviceInfo.totalMemory",
					"Widget.Device.DeviceStateInfo.audioPath",
					"Widget.Device.DeviceStateInfo.backLightOn",
					"Widget.Device.DeviceStateInfo.keypadLightOn",
					"Widget.Device.DeviceStateInfo.onScreenChangeDimensions",
					"Widget.Device.DeviceStateInfo.Config",
					"Widget.Device.DeviceStateInfo.processorUtilizationPercent",
					"Widget.Device.PositionInfo.altitudeAccuracy",
					"Widget.Device.PositionInfo.cellID",
					"Widget.PIM.deleteAddressBookItem",
					"Widget.Multimedia.isVideoPlaying",
					"Widget.Multimedia.VideoPlayer.*",
					"Widget.Multimedia.Camera.setWindow",
					"Widget.PIM.AddressBookItem.getAddressGroupNames",
					"Widget.PIM.addCalendarItem",
					"Widget.PIM.createAddressBookGroup",
					"Widget.PIM.deleteAddressBookGroup",
					"Widget.PIM.deleteCalendarItem",
					"Widget.PIM.exportAsVCard",
					"Widget.PIM.findCalendarItems",
					"Widget.PIM.getAvailableAddressGroupNames",
					"Widget.PIM.getCalendarItem",
					"Widget.PIM.getCalendarItems",
					"Widget.PIM.onCalendarItemAlert",
					"Widget.PIM.onCalendarItemsFound",
					"Widget.PIM.Calendar*",
					"Widget.PIM.EventRecurrenceTypes",
					"Widget.Device.AccountInfo.phoneMSISDN",
					"Widget.Device.AccountInfo.userSubscriptionType",
					"Widget.Device.AccountInfo.userAccountBalance",
					"Widget.Telephony*",
					"Widget.CallRecord*",
					"Widget.Messag*", // includes Message, Messaging, etc.
					"Widget.Attachment",
					"Widget.Account",
					"Widget.Config"
				]
			};
			
			// Get the first calendarItemId found.
// No cal implemented on opera yet
			//ret._meta.numAsynchConfigs++; // We have an asynch config parameter here, "register" it.
			//pim.onCalendarItemsFound = function(items){
			//	if (items.length>0){
			//		config.validCalendarItemId = items[0].calendarItemId;
			//	}
			//	setTimeout(function(){ pim.onCalendarItemsFound = null; }, 1);
			//	configHelper.asynchConfigDone();
			//}
			//var item = new pim.CalendarItem();
			//item.eventName = "*";
			//pim.findCalendarItems(item, 0, 1);
			
			
			// If the addressbook item with ID 0 doesnt exist search for it.
			// Why? (Currently the Opera WRT crashes on findAddressBookItem) and mostly ID=1 exists.
			// And since that is prefix for every widget, we would like it not to crash :).
			try{
				var pim = Widget.PIM;
				// Try to read the item, by spec it throws an exception if the ID is invalid.
				pim.getAddressBookItem(ret.validAddressBookItemId);
			}catch(e){
				// Get the first addressbook item
				ret._meta.numAsynchConfigs++; // We have an asynch config parameter here, "register" it.
				try{ // Possibly the getting the addressbookitem fails, maybe because the feature URL is missing ...
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "*");
					Widget.PIM.onAddressBookItemsFound = function(items){
						if (items && items.length>0){
							config.validAddressBookItemId = items[0].addressBookItemId;
						}
						setTimeout(function(){ pim.onAddressBookItemsFound = null; }, 1);
						configHelper.asynchConfigDone();
					}
					pim.findAddressBookItems(addr, 0, 1);
				}catch(e){
					ret._meta.numAsynchConfigs--; // Decrease it again, since it obviously failed.
				}
			}
			
			return ret;
		},
		//
		//	Nokia Symbian 3, Nokia Runtime
		//
		"regexp:.*Symbian\\/3.*":function(){
			var ret = {
				_meta:{name:"Symbian3 WRT", numAsynchConfigs:0},
				_userInfo:{
					audioDirectory:"C:/Data/Sounds",
					videoDirectory:"C:/Data/Videos",
					photoDirectory:"C:/Data/Images"
				},
				geolocation:{supportsCellId:false},
				events: {
					invalidRecurrenceTypes: ['EVERY_WEEKDAY']
				},
				unsupportedApis:[
					"Widget.Device.RadioInfo.onSignalSourceChange",
					"Widget.Device.setRingtone",
					"Widget.AccountInfo*",
					"Widget.AccountInfo.phoneUserUniqueId",
					"Widget.AccountInfo.phoneOperatorName",
					"Widget.AccountInfo.userSubscriptionType", 
					"Widget.AccountInfo.userAccountBalance",
					"Widget.Device.widgetEngineName",
					"Widget.Device.widgetEngineProvider",
					"Widget.Device.widgetEngineVersion",
					"Widget.Device.DeviceInfo.phoneColorDepthDefault",
					"Widget.Device.DeviceStateInfo.audioPath",
					"Widget.Device.PositionInfo.cellId",
					"Widget.Device.File.fullName",
					"Widget.Multimedia.isVideoPlaying",
					"Widget.Multimedia.VideoPlayer.*",
					"Widget.PIM.exportAsVCard",
					"Widget.PIM.getAddressBookItem",
					"Widget.PIM.getCalendarItem",
					"Widget.PIM.onCalendarItemAlert",
					"Widget.PIM.CalendarItem.alarmed",
					"Widget.onRestore",
					"Widget.Messaging.Message.callbackNumber",
					"Widget.Messaging.Message.saveAttachment",
					"Widget.Messaging.MessageQuantities*",
					"Widget.Messaging.copyMessageToFolder",
					"Widget.Messaging.createFolder",
					"Widget.Messaging.deleteAllMessages",
					"Widget.Messaging.deleteEmailAccount",
					"Widget.Messaging.deleteFolder",
					"Widget.Messaging.getFolderNames",
					"Widget.Messaging.getMessageQuantities",
					"Widget.Config.setDefaultRingtone",
				]
			};
			// Get the first calendarItemId found.
			ret._meta.numAsynchConfigs++; // We have an asynch config parameter here, "register" it.
			var pim = Widget.PIM;
			pim.onCalendarItemsFound = function(items){
				if (items.length>0){
					config.validCalendarItemId = items[0].calendarItemId;
				}
				setTimeout(function(){ pim.onCalendarItemsFound = null; }, 1);
				configHelper.asynchConfigDone();
			}
			var item = new pim.CalendarItem();
			item.eventName = "*";
			pim.findCalendarItems(item, 0, 1);
			
			// Get the first addressbook item
			ret._meta.numAsynchConfigs++; // We have an asynch config parameter here, "register" it.
			var addr = new pim.AddressBookItem();
			addr.setAttributeValue("fullName", null);
			Widget.PIM.onAddressBookItemsFound = function(items){
				if (items.length>0){
					config.validAddressBookItemId = items[0].addressBookItemId;
				}
				setTimeout(function(){ pim.onAddressBookItemsFound = null; }, 1);
				configHelper.asynchConfigDone();
			}
			pim.findAddressBookItems(addr, 0, 1);

			
			return ret;
		},
		//
		//	PC, Opera Widget Runtime
		//
		"regexp:Opera\\/9\\.64(.*)Presto\\/2\\.1\\.1":function(){
			var ret = {
				_meta:{name:"Opera 9.64"},
				hasClamshell:false
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
				_meta:{name:"Firefox", numAsynchConfigs:0},
				hasClamshell:false,
				geolocation:{
					timeouts: {
						agps: defaults.geolocation.timeouts.gps
					}
				},
				events: {
					invalidRecurrenceTypes: ['EVERY_WEEKDAY', 'MONTHLY_ON_DAY']
				},
				supports: {
					Messaging:{
						moveMessage: false,
						editFolder: false,
						multipleEmailAccounts: false
					}
				},
				unsupportedApis:[
					"Widget.Device.RadioInfo.radioSignalSource",
					"Widget.Device.RadioInfo.radioSignalStrengthPercent",
					"Widget.Device.RadioInfo.onSignalSourceChange",
					"Widget.Device.DataNetworkInfo.onNetworkConnectionChanged",
					"Widget.Device.DataNetworkInfo.getNetworkConnectionName",
					"Widget.Device.DataNetworkInfo.networkConnectionType",
					"Widget.Device.DataNetworkInfo.onNetworkConnectionChanged",
					"Widget.Device.clipboardString",
					"Widget.Device.copyFile",
					"Widget.Device.deleteFile",
					"Widget.Device.findFiles",
					"Widget.Device.getFileSystemRoots",
					"Widget.Device.getFileSystemSize",
					"Widget.Device.moveFile",
					"Widget.Device.onFilesFound",
					"Widget.Device.setRingtone",
					"Widget.Device.vibrate",
					"Widget.Device.PowerInfo",
					"Widget.Device.DeviceInfo.ownerInfo",
					"Widget.Device.DeviceInfo.totalMemory",
					"Widget.Device.DeviceStateInfo.audioPath",
					"Widget.Device.DeviceStateInfo.backLightOn",
					"Widget.Device.DeviceStateInfo.keypadLightOn",
					"Widget.Device.DeviceStateInfo.onScreenChangeDimensions",
					"Widget.Device.DeviceStateInfo.Config",
					"Widget.Device.DeviceStateInfo.processorUtilizationPercent",
					"Widget.Device.PositionInfo.altitudeAccuracy",
					"Widget.Device.PositionInfo.cellID",
					"Widget.PIM.deleteAddressBookItem",
					"Widget.Multimedia.isVideoPlaying",
					"Widget.Multimedia.VideoPlayer.*",
					"Widget.Multimedia.Camera.setWindow",
					"Widget.PIM.addCalendarItem",
					"Widget.PIM.createAddressBookGroup",
					"Widget.PIM.deleteAddressBookGroup",
					"Widget.PIM.deleteCalendarItem",
					"Widget.PIM.exportAsVCard",
					"Widget.PIM.findCalendarItems",
					"Widget.PIM.getAvailableAddressGroupNames",
					"Widget.PIM.getCalendarItem",
					"Widget.PIM.getCalendarItems",
					"Widget.PIM.onCalendarItemAlert",
					"Widget.PIM.onCalendarItemsFound",
					"Widget.PIM.Calendar*",
					"Widget.PIM.EventRecurrenceTypes",
					"Widget.Device.AccountInfo.phoneMSISDN",
					"Widget.Device.AccountInfo.userSubscriptionType",
					"Widget.Device.AccountInfo.userAccountBalance",
					"Widget.Telephony*",
					"Widget.CallRecord*",
					"Widget.Messag*", // includes Message, Messaging, etc.
					"Widget.Attachment",
					"Widget.Account",
					"Widget.Config"
				],
			};
			
			// Testing the asynch config stuff.
			ret._meta.numAsynchConfigs++;
			setTimeout(function(){
				config.validAddressBookItemId = "47";
				configHelper.asynchConfigDone();
			}, 300);
			ret._meta.numAsynchConfigs++;
			setTimeout(function(){
				configHelper.asynchConfigDone();
			}, 500);
			
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
				_meta:{name:"Nokia Opera WRT"},
				hasClamshell:false
			};
			return ret;
		},
		"WidgetManager; NOKIA E52-1; Opera/9.5 (S60; Symbian OS; U; de; Opera Mobile/1109)":function(){
			var widgetPath = (""+window.location).replace("widget://localhost/", "").replace(/index.html$/, "");
			var ret = {
				_meta:{name:"Nokia Opera WRT"},
				hasClamshell:false
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
	var ua = window.navigator.userAgent;
	var configToMixin = null;
//ua = "WidgetManager; (Android Opera Widgets";
//ua = "WidgetManager; (S60; Symbian Opera";
//var ua = "WidgetManager; SAMSUNG-GT-I8320-Vodafone;AppleWebKit/528.5+(X11;U;Linux;en;i8329BUIH8)";
	for (var key in configs){
		var c = configs[key];
		if (key.indexOf("regexp:")===0){
			if (ua.match(new RegExp(key.substr(7)))){
				configToMixin = c();
				configToMixin._meta.appliedConfigName = c;
				break;
			}
		} else if(key===ua){
			configToMixin = c();
			configToMixin._meta.appliedConfigName = c;
			break;
		}
	}
	if (configToMixin===null){
		configToMixin = doh.util.mixin({}, defaults);
	} else {
		configToMixin._meta.isCustomConfiguration = true;
	}
	
	// config is still empty at this point, just contains key "isCustomConfiguration".
	doh.util.mixin(config, defaults);
	// Mixin the additional config params.
	// Mixin recursively so objects don't have to declare each key again!
	function _mixin(base, overrider){
		// summary:
		// 		Recursive object mixin.
		// description:
		// 		base is the initial object, overrider contains values that
		// 		override the according values in base.
		var ret = doh.util.mixin({}, base); // clone base
		for (var key in overrider){
			var v = overrider[key];
			if (!doh.util.isArray(v) && typeof v=="object"){
				ret[key] = _mixin(ret[key], v);
			} else {
				ret[key] = v;
			}
		}
		return ret;
	}
	for (var key in configToMixin){
		var v = configToMixin[key];
		if (typeof v=="object" && !doh.util.isArray(v)){
			config[key] = _mixin(config[key], v);
		} else {
			config[key] = v;
		}
	}
})();
