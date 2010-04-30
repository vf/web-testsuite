//
//	This file contains compatibility layer.
//

(function(){
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
	
	if (navigator.product=="Gecko"){
		Widget = {
			
			// Methods.
			setPreferenceForKey:function(){},
			openURL:function(){},
			preferenceForKey:function(){},
			
			// Objects.
			Device:{
				// Properties.
				widgetEngineName:"Browser",
				//widgetEngineProvider:"Firefox :-)",
				widgetEngineVersion:"GOLD",
				// Methods.
				vibrate:function(secs){
					console.log("vibrating "+secs+" seconds");
				},
				// Objects
				DataNetworkInfo:{},
				DeviceInfo:{
					ownerInfo:"me",
					phoneColorDepthDefault:1,
					phoneFirmware:"boot",
					phoneManufacturer:"me",
					phoneModel:"new",
					phoneOS:"BeOS",
					phoneScreenHeightDefault:1,
					phoneScreenWidthDefault:1,
					phoneSoftware:"DOS",
					totalMemory:1
				},
				DeviceStateInfo:{
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
				},
				PositionInfo:function(){
					this.latitude = 52.522311;
					this.longitude = 13.4141;
				},
				PowerInfo:{
					isCharging:true,
					percentRemaining:42
				},
				RadioInfo:{
					isRadioEnabled:true,
					isRoaming:true,
					radioSignalSource:"towa",
					radioSignalStrengthPercent:100
				}
			},
			
			Exception: function(params){
				doh.util.mixin(this, params);
			},
			ExceptionTypes:{
				INVALID_PARAMETER:"INVALID_PARAMETER"
			},
				
			Multimedia: {
				Camera: {
					startVideoCapture:function(){}
				}
			},
				
			PIM:{
				addCalendarItem:function(){},
				findAddressBookItems:function(){
					setTimeout(doh.util.hitch(this, function(){
						if (this.onAddressBookItemsFound){
							this.onAddressBookItemsFound([new Widget.PIM.AddressBookItem()]);
						}
					}), 500);
				},
				findCalendarItems:function(){
					setTimeout(doh.util.hitch(this, function(){
						if (this.onCalendarItemsFound){
							this.onCalendarItemsFound([new Widget.PIM.CalendarItem()]);
						}
					}), 500);
				},
				getAddressBookItem:function(){
					return new Widget.PIM.AddressBookItem();
				},
				getCalendarItem:function(){
					return new Widget.PIM.CalendarItem();
				},
				getAddressBookItemsCount:function(){ return 6 },
				
				// Objects
				AddressBookItem:function(){
					this.fullName = "Foo Bar";
					this.company = "uxebu";
					this.email = "a@b";
				},
				CalendarItem:function(){},
				EventRecurrenceTypes:{
					DAILY:"DAILY",
					EVERY_WEEKDAY:"EVERY_WEEKDAY",
					MONTHLY_ON_DAY:"MONTHLY_ON_DAY",
					MONTHLY_ON_DAY_COUNT:"MONTHLY_ON_DAY_COUNT",
					NOT_REPEAT:"NOT_REPEAT",
					WEEKLY_ON_DAY:"WEEKLY_ON_DAY",
					YEARLY:"YEARLY"
				}
			},
			
			WidgetManager:{
				checkWidgetInstallationStatus:function(){}
			}
		};
		Widget.PIM.AddressBookItem.prototype = {
			setAttributeValue:function(){},
			getAttributeValue:function(){},
			update:function(){}
		};
		Widget.PIM.CalendarItem.prototype.update = function(){}
	}
})();


//
//	Application
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
//	AudioPlayer
//
Widget.Multimedia.AudioPlayer = {
	open:function(){},
	play:function(){},
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
})();


//
//	Camera
//
Widget.Multimedia.Camera.captureImage = function(fileName){
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
