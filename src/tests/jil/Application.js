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
(function(){
	
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	var wda = util.isObject("Widget.Device.ApplicationTypes") ? Widget.Device.ApplicationTypes : {};
	var cfs = config.fileSystem;
	var widgethomeMp3File = "/virtual/widgethome/" + cfs.playableAudioFiles.relativePath.songMp3;
	var musicFolderMp3File = cfs.playableAudioFiles.onDevice.songMp3;
	

	//
	//	Application tests
	//
	dohx.add({name:"Application",
		mqcExecutionOrderBaseOffset:30000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Device",
			"Widget.Device.launchApplication",
			"Widget.Device.getAvailableApplications",
			"Widget.Device.ApplicationTypes"
		],
		tests:[
			{
				id:100,
				name:"getAvailableApplications - Should return an array.",
				test:function(t){
					var apps = wd.getAvailableApplications();
					t.assertTrue(util.isArray(apps), "Return value is not an array.");
					return apps;
				}
			},{
				id:200,
				name:"Start '"+ wda.CALCULATOR +"'.",
				instructions:"Click 'GO', should launch the calculator.",
				expectedResult:"Did the calculator start?",
				test:function(t){
					return wd.launchApplication(wda.CALCULATOR, "");
				}
			},
			{
				id:300,
				name:"Start '" + wda.MEDIAPLAYER + "' with '" + widgethomeMp3File + "'.",
				instructions:"Click 'GO', should launch an the music player and play a tune.",
				expectedResult:"Did the music player start AND play the file?",
				test:function(t){
					return wd.launchApplication(wda.MEDIAPLAYER, widgethomeMp3File);
				}
			},
			{
				id:310,
				name:"Start '" + wda.MEDIAPLAYER + "' with '" + musicFolderMp3File + "'.",
				instructions:[
					"Make sure the audio file '"+ musicFolderMp3File +"' exists!",
					"Click 'GO', should launch an the music player and play a tune.",
				],
				expectedResult:"Did the music player start AND play the file?",
				test:function(t){
					return wd.launchApplication(wda.MEDIAPLAYER, musicFolderMp3File);
				}
			},
//			{
// TODO provide image file with the widget
//				id:400,
//				name:"Start '" + wda.MEDIAPLAYER + "' with '" + cfs.imageFile + "'.",
//				instructions:"Click 'GO', to view an image.",
//				expectedResult:"Did the image-viewer application start AND show the image?",
//				test:function(t){
//t.assertFalse(true);
//return "TODO"
//					return wd.launchApplication(wda.MEDIAPLAYER, cfs.imageFile);
//				}
//			},
			{
				id:500,
				name:"Start '" + wda.MAIL + "' to 'email@vodafone.de'.",
				instructions:[
					"Click \'GO\', to init email to 'email@vodafone.de'.",
					'Close email app (if it opened) and come back to this app.'
				],
				expectedResult:"Did email to 'email@vodafone.de' get initiated?",
				test:function(t){
					return wd.launchApplication(wda.MAIL, "email@vodafone.de");
				}
			},{
				id:600,
				name:"launchApplication - Open website 'vodafone.de'.",
				instructions:[
					"Click \'GO\', to open browser with 'vodafone.de'.",
					'Close browser (if it opened) and come back to this app.'
				],
				expectedResult:"Did browser open the page 'vodafone.de'?",
				test:function(t){
					return wd.launchApplication(wda.BROWSER, "http://vodafone.de");
				}
			},{
				id:700,
				name:"launchApplication - Create a calendar event.",
				instructions:[
					"Click \'GO\', to open calendar.",
					'Close calendar and come back to this app.'
				],
				expectedResult:"Did calendar app open?",
				test:function(t){
					return wd.launchApplication(wda.CALENDAR, "Lunch with my phone");
				}
			}
		]
	});

	var apps = [
		{app:wda.ALARM, testId:100},
		{app:wda.BROWSER, testId:200},
		{app:wda.CALCULATOR, testId:300},
		{app:wda.CALENDAR, testId:400},
		{app:wda.CAMERA, testId:500},
		{app:wda.CONTACTS, testId:600},
		{app:wda.FILES, testId:700},
		{app:wda.GAMES, testId:800},
		{app:wda.MAIL, testId:900},
		{app:wda.MEDIAPLAYER, testId:1000},
		{app:wda.MESSAGING, testId:1100},
		{app:wda.PICTURES, testId:1200},
		{app:wda.PHONECALL, testId:1300},
		{app:wda.PROG_MANAGER, testId:1400},
		{app:wda.SETTINGS, testId:1500},
		{app:wda.TASKS, testId:1600},
		{app:wda.WIDGET_MANAGER, testId:1700}
	];
	
	for (var i=0, l=apps.length; i<l; i++){
		(function(app){
			dohx.add({name:"App launching",
				mqcExecutionOrderBaseOffset:40000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
				requiredObjects:["Widget.Device"],
				tests:[
					{
						id:app.testId,
						name:"launchApplication - Try start '"+ app.app +"'.",
						requiredObjects:["Widget.Device.launchApplication", "Widget.Device.getAvailableApplications"],
						instructions:[
							"Click 'GO', should launch '"+ app.app +"'.",
							app.app==wda.PHONECALL ? 'Dial any number and hang up, the app will close automatically.' : 'Close app (if it opened) and come back to this app.'
						],
						expectedResult:'Did app launch?',
						test:function(t){
							return wd.launchApplication(app.app, "");
						}
					}
				]
			});
		})(apps[i]);
	}
//*/
})();
