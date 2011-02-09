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
//
//	This file contains compatibility layer.
//

Widget = {};
widget = {};

(function(){
	var __prefStore = {};
	if (window["opera"]){
		// Make "console.log()" work.
		console = {};
		console.log = function(){
			opera.postError(arguments.join(" "));
		}
		
		// Fake the object "Widget" if it doesn't exist.
		// Do this only on opera by mapping "widget" to it.
		if (typeof window["Widget"]=="undefined"){
			// Map opera stuff to JIL.
			var W = window.Widget = {},
				w = window.widget;
			W.setPreferenceForKey = function(key, value){
				// Opera (the not JIL way, "widget") wants the params in reverse order.
				return window.widget.setPreferenceForKey(value, key);
			}
			// Why the heck does this not work? W.preferenceForKey = w.preferenceForKey; :-(
			W.preferenceForKey = function(key){return w.preferenceForKey(key);}
			W.openURL = function(url){return w.openURL(url)};
			//w.onShow = function(){
// Doesnt seem to work
			//	if (typeof W.onWakeup=="function"){
			//		W.onWakeup();
			//	}
			//}
		}
	}
	
	Widget = {
		
		// Methods.
		setPreferenceForKey:function(value, key){
			__prefStore[key] = value;
		},
		openURL:function(){},
		preferenceForKey:function(key){
			return __prefStore[key];
		}
	};
	widget.setPreferenceForKey = Widget.setPreferenceForKey;
	widget.preferenceForKey = Widget.preferenceForKey;
	widget.openURL = Widget.openURL;
	widget.showNotification = function(headline, text, callback){
		alert(headline+"\n==========\n\n"+text);
		if (callback) callback();
	};
		
	Widget.Device = {
		// Properties.
		widgetEngineName:"emulated Data - widgetEngineName",
		//widgetEngineProvider:"Firefox :-)",
		widgetEngineVersion:"emulated Data - widgetEngineVersion",
		// Methods.
		vibrate:function(secs){
			console.log("vibrating "+secs+" seconds");
		}
	};
	
	Widget.Device.DeviceInfo = {
		ownerInfo:"emulated Data - ownerInfo",
		phoneColorDepthDefault:42,
		phoneFirmware:"emulated Data - phoneFirmware",
		phoneManufacturer:"emulated Data - phoneManufacturer",
		phoneModel:"emulated Data - phoneModel",
		phoneOS:"emulated Data - phoneOS",
		phoneScreenHeightDefault:23,
		phoneScreenWidthDefault:42,
		phoneSoftware:"emulated Data - phoneSoftware",
		totalMemory:42
	};
	
	Widget.Device.DeviceStateInfo = {
		audioPath:"C:/music",
		availableMemory:1,
		backLightOn:false,
		// Methods
		requestPositionInfo:function(method){
			// Simulate onPositionRetrieved callback, which returns proper data.
			setTimeout(doh.util.hitch(this, function(){
				if (this.onPositionRetrieved){
					this.onPositionRetrieved(new Widget.Device.PositionInfo(), method);
				}
			}), 100);
		},
		// Objects
		Config:{
			vibrationSetting:'OFF'
		},
		AccelerometerInfo:{
		  // probably most common position for holding a mobile-phone
		  xAxis: 0,
		  yAxis: -0.5,
		  zAxis: 0.5
		}
	};
	
	Widget.Device.PositionInfo = function(){
		this.latitude = 52.522311;
		this.longitude = 13.4141;
	};
	
	Widget.PowerInfo = {
		isCharging:true,
		percentRemaining:42
	};
	Widget.RadioInfo = {
		isRadioEnabled:true,
		isRoaming:true,
		radioSignalSource:"towa",
		radioSignalStrengthPercent:100,
		RadioSignalSourceTypes:{
			"CDMA":"CDMA",
			"GSM":"GSM",
			"LTE":"LTE",
			"TDSCDMA":"TDSCDMA",
			"WCDMA":"WCDMA"
		}
	};
		
	Widget.Exception = function(params){
		doh.util.mixin(this, params);
	};
	Widget.ExceptionTypes = {
		INVALID_PARAMETER:"INVALID_PARAMETER",
		UNSUPPORTED:"UNSUPPORTED",
		SECURITY:"SECURITY"
	};
	Widget.PIM = {
		addCalendarItem:function(){},
		findAddressBookItems:function(address, startIndex, endIndex){
			if (!util.isNumber(startIndex) || startIndex<0 || !util.isNumber(endIndex) || endIndex<0){
				throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
			}
			setTimeout(doh.util.hitch(this, function(){
				if (this.onAddressBookItemsFound){
					this.onAddressBookItemsFound([new Widget.PIM.AddressBookItem()]);
				}
			}), 400);
		},
		findCalendarItems:function(){
			setTimeout(doh.util.hitch(this, function(){
				if (this.onCalendarItemsFound){
					this.onCalendarItemsFound([new Widget.PIM.CalendarItem()]);
				}
			}), 400);
		},
		getAddressBookItem:function(){
			return new Widget.PIM.AddressBookItem();
		},
		getCalendarItem:function(){
			return new Widget.PIM.CalendarItem();
		},
		getAddressBookItemsCount:function(){ return 106 },
		
		// Objects
		AddressBookItem:function(){
			this.addressBookItemId = 1;
			this.fullName = "abc";
			this.company = "uxebu";
			this.email = "a@b";
		},
		CalendarItem:function(){
			this.calendarItemId = 1;
		},
		EventRecurrenceTypes:{
			DAILY:"DAILY",
			EVERY_WEEKDAY:"EVERY_WEEKDAY",
			MONTHLY_ON_DAY:"MONTHLY_ON_DAY",
			MONTHLY_ON_DAY_COUNT:"MONTHLY_ON_DAY_COUNT",
			NOT_REPEAT:"NOT_REPEAT",
			WEEKLY_ON_DAY:"WEEKLY_ON_DAY",
			YEARLY:"YEARLY"
		}
	};
		
	Widget.WidgetManager = {
		checkWidgetInstallationStatus:function(){}
	};
	
	Widget.PIM.AddressBookItem.prototype = {
		setAttributeValue:function(){},
		getAttributeValue:function(){},
		getAddressGroupNames:function(){},
		update:function(){}
	};
	Widget.PIM.CalendarItem.prototype.update = function(){}
})();


//
//	AccountInfo
//
Widget.Device.AccountInfo = {
	phoneMSISDN:"myID",
	phoneOperatorName:"Vodafone",
	phoneUserUniqueId:"42",
	userAccountBalance:0,
	userSubscriptionType:"-"
};

//
//	Application
//
Widget.Device.ApplicationTypes = {
	CONTACTS:"CONTACTS",
	MEDIAPLAYER:"MEDIAPLAYER",
	BROWSER:"BROWSER",
	CALENDAR:"CALENDAR",
	CAMERA:"CAMERA",
	MAIL:"MAIL",
	PICTURES:"PICTURES",
	PHONECALL:"PHONECALL",
	ALARM:"ALARM",
	CALCULATOR:"CALCULATOR",
	FILES:"FILES",
	GAMES:"GAMES",
	MESSAGING:"MESSAGING",
	PROG_MANAGER:"PROG_MANAGER",
	SETTINGS:"SETTINGS",
	TASKS:"TASKS",
	WIDGET_MANAGER:"WIDGET_MANAGER"
};
Widget.Device.getAvailableApplications = function(){
	return Widget.Device.ApplicationTypes;
};
Widget.Device.launchApplication = function(){
	console.log("launchApplication = ", arguments);
}

//
//	DataNetworkInfo
//
Widget.Device.DataNetworkInfo = {};
Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes = {
	BLUETOOTH: "bluetooth",
	EDGE: "edge",
	EVDO: "evdo",
	GPRS: "gprs",
	IRDA: "irda",
	LTE: "lte",
	ONEXRTT: "1xrtt",
	WIFI: "wifi"
};
(function(){
	var wdd = Widget.Device.DataNetworkInfo;
	wdd.isDataNetworkConnected = false;
	wdd.networkConnectionType = [];
	for (var key in wdd.DataNetworkConnectionTypes){
		wdd.networkConnectionType.push(wdd.DataNetworkConnectionTypes[key]);
	}
	wdd.getNetworkConnectionName = function(networkConnectionType){
		if (!networkConnectionType || networkConnectionType.toLowerCase().indexOf("invalid")!=-1){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
		return "home " + networkConnectionType;
	};
})();

//
//	Multimedia
//

Widget.Multimedia = {};

//
//	AudioPlayer
//
Widget.Multimedia.AudioPlayer = {
	open:function(){},
	play:function(){},
	pause:function(){},
	resume:function(){},
	stop:function(){}
};

//
//	VideoPlayer
//
(function(){
	var v = Widget.Multimedia.VideoPlayer = {};
	
	function _triggerOnStageChange(newState){
console.log("_triggerOnStageChange", arguments);
		setTimeout(function(){
			if (v.onStateChange) v.onStateChange(newState);
		}, 5);
	}
	
	v.open = function(fileUrl){
console.log("open", arguments);
		_triggerOnStageChange("opened");
	}
	v.play = function(repeatTimes){
console.log("play", arguments);
		_triggerOnStageChange("playing");
	}
	v.pause = function(){
console.log("pause");
		_triggerOnStageChange("paused");
	}
	v.resume = function(){
console.log("resume");
		_triggerOnStageChange("playing");
	}
	v.stop = function(){
console.log("stop");
		_triggerOnStageChange("stopped");
	}
	v.setWindow = function(){}
})();


//
//	Camera
//
(function(){
	var wmc = Widget.Multimedia.Camera = {};
	
	wmc.setWindow = function(){};
	
	wmc.startVideoCapture = wmc.captureImage = function(fileName){
		if (fileName.toLowerCase().indexOf("invalid")!=-1){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
		// Simulate that we do take a pic and trigger the callback after a bit :-).
		setTimeout(doh.util.hitch(this, function(){
			if (this.onCameraCaptured){
				this.onCameraCaptured(fileName);
			}
		}), 500);
		return fileName;
	};
	
	wmc.stopVideoCapture = function(){};
})();

//
//	File
//
Widget.Device.File = function(){
	this.createDate = new Date();
	this.fileName = "";
	this.filePath = "";
	this.fileSize = 1;
	this.isDirectory = false;
	this.lastModifyDate = new Date();
};

Widget.Device.copyFile = function(){};
Widget.Device.deleteFile = function(){return true};
Widget.Device.getFile = function(f){
	if (f.toLowerCase().indexOf("notexisting")!=-1){
		throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
	}
	return new Widget.Device.File();
};
Widget.Device.getDirectoryFileNames = function(f){
	if (f.toLowerCase().indexOf("notexisting")!=-1){
		throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
	}
	return [1,2,3]
};
Widget.Device.findFiles = function(){
	var wd = Widget.Device;
	// Wrap the setTimeout around everything so we do the wd.onFilesFound check
	// only right before the call. This allows for calling findFIles() first and
	// defining the callback afterwards.
	setTimeout(function(){
		if (wd.onFilesFound){
			wd.onFilesFound(["DUMMY FILE.xxx"]);
		}
	}, 10);
};
Widget.Device.getFileSystemRoots = function(){return []};

//
//	Telephony
//
(function(){
	var wt = Widget.Telephony = {};
	
	wt.CallRecord = function(){
		this.callRecordAddress = "",
		this.callRecordId = "";
		this.callRecordName = "";
		this.callRecordType = "";
		this.durationSeconds = 0;
		this.startTime = new Date();
	};
	
	wt.CallRecordTypes = {
		MISSED:'MISSED',
		OUTGOING:'OUTGOING',
		RECEIVED:'RECEIVED'
	};
	
	wt.findCallRecords = function(){
		setTimeout(doh.util.hitch(this, function(){
			if (this.onCallRecordsFound){
				this.onCallRecordsFound();
			}
		}), 10);
	};
	
	wt.getCallRecord = function(){
		return new wt.CallRecord();
	};
	
	wt.getCallRecordCnt = function(){
		return 0;
	};
	
	wt.initiateVoiceCall = function(phoneNumber){
		setTimeout(function(){
			if (wt.onCallEvent){
				wt.onCallEvent(wt.CallRecordTypes.OUTGOING, phoneNumber);
			}
		}, 500);
	};
	wt.deleteCallRecord =
	wt.deleteAllCallRecords = function(){}

})();

//
//	Messaging
//
(function(){
	var wm = Widget.Messaging = {};
	
	wm.Account = {
		accountId:"",
		accountName:""
	};
	
	wm.MessageFolderTypes = {
		DRAFTS:"DRAFTS",
		INBOX:"INBOX",
		OUTBOX:"OUTBOX",
		SENTBOX:"SENTBOX"
	};
	
	wm.MessageTypes = {
		EmailMessage:"EmailMessage",
		MMSMessage:"MMSMessage",
		SMSMessage:"SMSMessage"
	};
	
	wm.getMessageQuantities = function(){
		return doh.util.mixin({}, Widget.Messaging.MessageQuantities); // Clone the object and return it
	}
	wm.createMessage = function(msgType){
		if (typeof msgType=="undefined" || msgType.toLowerCase().indexOf("invalid")!=-1){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
		var ret = new wm.Message();
		ret.messageType = msgType;
		return ret;
	}
	wm.moveMessageToFolder = function(){}
	wm.deleteMessage = function(){}
	wm.findMessages = function(){
		setTimeout(function(){
			if (wm.onMessagesFound){
				wm.onMessagesFound([], "");
			}
		}, 10);
	}
	wm.getMessage = function(){
		if (arguments.length != 3){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
		return new wm.Message();
	}
	wm.sendMessage = function(){
	}
	
	//
	//	Email account stuff
	//
	wm.getEmailAccounts = function(){
		return [doh.util.mixin({}, wm.Account), doh.util.mixin({}, wm.Account)];
	}
	wm.getCurrentEmailAccount = function(){
		return doh.util.mixin({}, wm.Account);
	}
	wm.setCurrentEmailAccount = function(account){
		if (typeof account=="undefined" || account.toLowerCase().indexOf("invalid")!=-1){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
	}
	wm.deleteEmailAccount = function(account){
		if (typeof account=="undefined" || account.toLowerCase().indexOf("invalid")!=-1){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
	}
	
	//
	//	Folder stuff
	//
	wm.createFolder = function(msgType, folderName){
		if (typeof msgType=="undefined" || typeof folderName=="undefined" || folderName.toLowerCase().indexOf("invalid")!=-1){
			throw new Widget.Exception({"type":Widget.ExceptionTypes.INVALID_PARAMETER});
		}
	}
	wm.getFolderNames = function(){
		return [];
	}
	
	//
	//	Message
	//
	wm.Message = function(){
		this.attachments = [];
		this.bccAddress = [];
		this.body = "emulated Data - body";
		this.callbackNumber = "+42";
		this.ccAddress = [];
		this.destinationAddress = [];
		this.isRead = false;
		this.messageId = "emulated Data - "+(+new Date);
		this.messagePriority= false;
		this.messageType = "";
		this.sourceAddress = "";
		this.subject = "emulated Data - subject";
		this.time = new Date();
		this.validityPeriodHours = 0;
		
		this.addAddress = function(){};
		this.addAttachment = function(){};
		this.deleteAddress = function(){};
		this.deleteAttachment = function(){};
		this.saveAttachment = function(){};
	}
})();

(function(){
	Widget.Messaging.MessageQuantities = {
		totalMessageCnt:0,
		totalMessageReadCnt:0,
		totalMessageUnreadCnt:0
	};
})();

//*/

