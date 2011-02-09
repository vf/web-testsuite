var testList = {
	
	configXmlDependent:[
		// Those are the tests that depend on a certain setup in the config.xml
		// so they normally can not be run form the all.html.
		"tests/jil/config.xml/jil-access-false.js",
		"tests/jil/config.xml/jil-access-warp.js",
		"tests/jil/config.xml/jil-access.js",
		"tests/jil/config.xml/missing-access.js",
		"tests/jil/config.xml/warp-jil-access.js",
		
		"tests/w3c/config.xml/warp.js",
	],
	
	simple:[
		"tests/vendor/vodafone/metrics.js",
		
		"tests/base/window.js",
		"tests/base/widget.js",
		"tests/base/widget-update/update0.js",
		"tests/base/widget-update/update1.js",
		"tests/base/xhr/ports.js",
		
		"tests/jil/security/policy.js",
		
		"tests/jil/AccelerometerInfo.js",
		"tests/jil/AccountInfo.js",
		"tests/jil/AddressBook.js",
		"tests/jil/AddressBookItem.js",
		"tests/jil/Application.js",
		"tests/jil/AudioPlayer.js",
		"tests/jil/Basics.js",
		"tests/jil/Calendar.js",
		"tests/jil/Camera.js",
		"tests/jil/Config.js",
		"tests/jil/DataNetworkInfo.js",
		"tests/jil/Device.js",
		"tests/jil/DeviceInfo.js",
		"tests/jil/DeviceStateInfo.js",
		"tests/jil/File.js",
		//"tests/jil/MessageQuantities.js",
		"tests/jil/Messaging.js",
		"tests/jil/MessagingEmailAccount.js",
		"tests/jil/MessagingFolder.js",
		"tests/jil/PositionInfo.js",
		"tests/jil/PowerInfo.js",
		"tests/jil/RadioInfo.js",
		"tests/jil/Telephony.js",
		"tests/jil/VideoCamera.js",
		"tests/jil/VideoPlayer.js",
		"tests/jil/Widget.js",
		
		"tests/performance/jil/AddressBook.js",
		
		
		"tests/w3c/css/animation.js",
		"tests/w3c/css/basics.js",
		"tests/w3c/css/transform.js",
		"tests/w3c/css/transition.js",
		
		"tests/misc/uri/sms.js",
		"tests/misc/uri/mailto.js",
	]
	
};