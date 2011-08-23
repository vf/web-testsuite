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
var testList = {
	
	configXmlDependent:{
		applies:!!window.Widget,
		files:[
			// Those are the tests that depend on a certain setup in the config.xml
			// so they normally can not be run form the all.html.
			"tests/jil/config.xml/jil-access-false.js",
			"tests/jil/config.xml/jil-access-warp.js",
			"tests/jil/config.xml/jil-access.js",
			"tests/jil/config.xml/missing-access.js",
			"tests/jil/config.xml/warp-jil-access.js",
			
			"tests/w3c/config.xml/warp.js"
		]
	},
	
	simple:{
		applies:true,
		files:[
			"tests/window/scroll/basics.js",
			
			"tests/base/window.js",
			"tests/base/xhr/ports.js",
			
			"tests/w3c/css/animation.js",
			"tests/w3c/css/basics.js",
			"tests/w3c/css/pseudoClass.js",
			"tests/w3c/css/transform.js",
			"tests/w3c/css/transition.js",
			
			"tests/w3c/indexedDb/basics.js",
			
			"tests/w3c/mediaquery/orientation.js",
			"tests/w3c/mediaquery/widthHeight.js",
			"tests/w3c/mediaquery/misc.js",
			
			"tests/w3c/audio/properties.js",
			
			"tests/w3c/events/batterystatus.js",
			"tests/w3c/events/devicemotion.js",
			"tests/w3c/events/deviceorientation.js",
			"tests/w3c/events/orientationchange.js",
			
			"tests/w3c/input/attributes.js",
			//"tests/w3c/input/typeColor.js",
			"tests/w3c/input/typeCamera.js",
			"tests/w3c/input/typeDate.js",
			"tests/w3c/input/typeDatetime.js",
			"tests/w3c/input/typeDatetimeLocal.js",
			//"tests/w3c/input/typeEmail.js",
			"tests/w3c/input/typeMonth.js",
			//"tests/w3c/input/typeNumber.js",
			"tests/w3c/input/typeWeek.js",
			"tests/w3c/input/typeRange.js",
			//"tests/w3c/input/typeSearch.js",
			//"tests/w3c/input/typeTel.js",
			//"tests/w3c/input/typeUrl.js",
			
			"tests/w3c/dom/classList.js",
			"tests/w3c/dom/dataset.js",
			
			"tests/w3c/history/basics.js",
			
			"tests/w3c/localStorage/basics.js",
			
			"tests/misc/uri/sms.js",
			"tests/misc/uri/mailto.js",
			
			"tests/javascript/string/methods.js",
			"tests/javascript/string/properties.js",
			
			"tests/javascript/array/methods.js",
			"tests/javascript/array/properties.js",
			
			"tests/javascript/object/methods.js",
			"tests/javascript/object/properties.js"
		]
	},
	
	widget:{
		applies:!!window.widget,
		files:[
			"tests/vendor/vodafone/metrics.js",
			
			"tests/base/widget.js",
			"tests/base/widget-update/update0.js",
			"tests/base/widget-update/update1.js"
		]
	},
	
	jil:{
		applies:!!window.Widget,
		files:[
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
			
			"tests/performance/jil/AddressBook.js"
		]
	}
	
};
