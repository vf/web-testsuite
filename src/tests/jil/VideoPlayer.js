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
	
	var wm = util.isObject("Widget.Multimedia") ? Widget.Multimedia : {};
	var wmv = util.isObject("Widget.Multimedia.VideoPlayer") ? Widget.Multimedia.VideoPlayer : {};
	var cf = config.fileSystem;
	var videoFiles = cf.playableVideoFiles;
	
	// This is a mini object, to wrap video functionality and make it better useable inside the
	// tests.
	// It basically implements the Finite state machine that the spec shows on page 122, and maps
	// all state changes to the proper method call.
	// The constructor has the following signature:
	// 		new myVideo = ("url to the video file", {
	// 			autoPlay: true|false,
	// 			repeatTimes: 0..x
	// 			onOpen:function(){},
	// 			onPlay:function(){},
	// 			onStop:function(){},
	// 			onPause:function(){},
	// 			onComplete:function(){}
	// 		})
	// All options are optional.
	var myVideo = function(url, options){
		this.state = null;
		this._quit = false;
		var timeouts = []; // Store timeouts for this class in here, so we can clean up properly when cleanUp() is called.
		this.cleanUp = function(){
			wmv.stop();
			wmv.setWindow(null); // Make sure to reset the window its playing in.
			wmv.onStateChange = null;
			// Clean timeouts if there are any.
			for (var i=0, l=timeouts.length; i<l; i++){
				clearTimeout(timeouts[i]);
			}
		}
		wmv.onStateChange = doh.util.hitch(this, function(newState){
//document.getElementById("dbg").innerHTML += "<br />"+this.state +" =&gt; "+ newState;
			var fsm = [
				// oldState, newState, function to call
				[null, "opened", "onOpen"],
				["opened", "opened", "onOpen"],
				["opened", "stopped", "onStop"],
				["opened", "playing", "onPlay"],
				["stopped", "playing", "onPlay"],
				["playing", "stopped", "onStop"],
				["playing", "paused", "onPause"],
				["playing", "completed", "onComplete"],
				["completed", "playing", "onPlay"],
				["completed", "opened", "onOpen"],
				["paused", "playing", "onPlay"],
				["paused", "stopped", "onStop"],
				["stopped", "playing", "onPlay"],
				["stopped", "opened", "onOpen"]
			];
			// Set this.state before calling the method in t[2] that one maybe relies on the new state value.
			// Since we are not calling it asynchronously.
			var oldState = this.state;
			this.state = newState;
			for (var i=0, l=fsm.length, t; i<l; i++){
				t = fsm[i];
				if (t[0]==oldState && t[1]==newState){
					if (options[t[2]]) options[t[2]]();
					break;
				}
			}
		});
		if (options.autoPlay){
			if (!options.onOpen){
				options.onOpen = function(){
					wmv.play(options.repeatTimes ? options.repeatTimes : 1);
				}
			} else {
				var b4 = options.onOpen;
				options.onOpen = function(){
					wmv.play(options.repeatTimes ? options.repeatTimes : 1);
					b4();
				}
			}
		}
		// Add "stopAfter", which has to be added to onPlay and be triggered by a timeout.
		if (options.stopAfter){
			var onPlay = options.onPlay || function(){};
			options.onPlay = function(){
				onPlay();
				timeouts.push(setTimeout(function(){
					wmv.stop();
				}, options.stopAfter));
			}
		}
		wmv.open(url);
	};
	
	function _setUp(){
		dohx.showInfo('<object id="_videoWindow_" type="video/3gp" width="320" height="240" />');
		wmv.setWindow(util.byId("_videoWindow_"));
	};
	function _tearDown(){
		wmv.setWindow(null);
		videoObj.cleanUp();
	};
	
	var videoObj;
	
	dohx.add({name:"VideoPlayer",
		mqcExecutionOrderBaseOffset:250000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Multimedia.VideoPlayer.open",
			"Widget.Multimedia.VideoPlayer.play",
			"Widget.Multimedia.VideoPlayer.stop"
		],
		tests:[
			{
				id:1,
				name:"Verify Preconditions",
				instructions:[
					"Make sure all the preconditions listed are met. They will be required by upcoming tests.",
					"Copy the content of the testsuite's zip-file's  folder 'video' into the videos directory on the phone. (The exact name of the destination folder may vary on your device.)",
					"Click 'GO' to start testing."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			},
			//
			//	Protocols. Spec says: http, https, file, rtsp and widget context (=none of the listed prefixes) are supported.
			//
			
// TODO isVideoPlaying
			
/*			{
				id:100,
				name:"Protocol - http",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video?",
				test:function(t){
					videoObj = new myVideo(videoFiles.viaHttp, {
						autoPlay:true,
						stopAfter:10*1000
					});
				},
				tearDown:function(){
					videoObj.cleanUp();
				}
			},
			{
				id:200,
				name:"Protocol - https",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video?",
				test:function(t){
					videoObj = new myVideo(videoFiles.viaHttps, {
						autoPlay:true,
						stopAfter:10*1000
					});
				},
				tearDown:function(){
					videoObj.cleanUp();
				}
			},
			{
				id:300,
				name:"Protocol - rtsp",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video?",
				test:function(t){
					videoObj = new myVideo(videoFiles.viaRtsp, {
						autoPlay:true,
						stopAfter:10*1000
					});
				},
				tearDown:function(){
					videoObj.cleanUp();
				}
			},
*/
			//{
			//	id:400,
			//	name:"Protocol - 3GP file",
			//	instructions:"Click 'GO' to play video.",
			//	expectedResult:"Did you see the video?",
			//	setUp:_setUp,
			//	test:function(t){
			//		videoObj = new myVideo(videoFiles.threeGp.onDevice, {
			//			autoPlay:true,
			//			stopAfter:10*1000
			//		});
			//	},
			//	tearDown:_tearDown
			//},
			//{
			//	id:410,
			//	name:"Protocol - H.264 file",
			//	instructions:"Click 'GO' to play video.",
			//	expectedResult:"Did you see the video?",
			//	setUp:_setUp,
			//	test:function(t){
			//		videoObj = new myVideo(videoFiles.h264.onDevice, {
			//			autoPlay:true,
			//			stopAfter:10*1000
			//		});
			//	},
			//	tearDown:_tearDown
			//},
			//{
			//	id:500,
			//	name:"Protocol - 3GP widget context",
			//	instructions:"Click 'GO' to play video.",
			//	expectedResult:"Did you see the video?",
			//	setUp:_setUp,
			//	test:function(t){
			//		videoObj = new myVideo(videoFiles.threeGp.relativePath, {
			//			autoPlay:true,
			//			stopAfter:10*1000
			//		});
			//	},
			//	tearDown:_tearDown
			//},
			//{
			//	id:510,
			//	name:"Protocol - H.264 widget context",
			//	instructions:"Click 'GO' to play video.",
			//	expectedResult:"Did you see the video?",
			//	setUp:_setUp,
			//	test:function(t){
			//		videoObj = new myVideo(videoFiles.h264.relativePath, {
			//			autoPlay:true,
			//			stopAfter:10*1000
			//		});
			//	},
			//	tearDown:_tearDown
			//},
			//
			//	play()
			//
			{
				id:600,
				name:"play 2x loop",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video twice?",
				setUp:_setUp,
				test:function(t){
					videoObj = new myVideo(videoFiles.mpeg4.relativePath, {
						autoPlay:true,
						repeatTimes:2
					});
				},
				tearDown:_tearDown
			},
			{
				id:700,
				name:"play 5x loop",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video five times?",
				setUp:_setUp,
				test:function(t){
					videoObj = new myVideo(videoFiles.mpeg4.relativePath, {
						autoPlay:true,
						repeatTimes:5
					});
				},
				tearDown:_tearDown
			},
			{
				id:800,
				name:"play, pause and play again",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did the video play, pause and play again?",
				setUp:_setUp,
				test:function(t){
					videoObj = new myVideo(videoFiles.mpeg4.relativePath, {
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wmv.pause();
								setTimeout(function(){
									wmv.resume();
								}, 2000);
							}, 2000);
						}
					});
				},
				tearDown:_tearDown
			},
			
			//
			//	setWindow()
			//
			{
				// Spec page 124. VideoPlayer.setWindow
				// Passing a null value will disassociate the  
				// preview window from the HTML; widget developers should do this in order to free  
				// resources and restore the display when previewing is no longer required.
addIf:false, // make this a somehow meaningful test, it is a bit strange right now, just a black screen and thats it ....
				id:1000,
				name:"setWindow - Disassociate preview window: setWindow(null).",
				requiredObjects:["Widget.Multimedia.VideoPlayer.setWindow"],
				timeout:10*1000,
				setUp:_setUp,
				expectedResult:"Did the preview window disappear after about 5 seconds?",
				test:function(t){
					setTimeout(function(){
						wmv.setWindow(null);
					}, 5000);
				},
				tearDown:_tearDown
			}
		]
	});
	
	// Start at ID offset 3000, just to have some place before.
	var _videoFiles = [
		{id:3020, "type":"h263", location:"relativePath"},
		{id:3030, "type":"h263", location:"onDevice"},
		{id:3040, "type":"h264", location:"relativePath"},
		{id:3050, "type":"h264", location:"onDevice"},
		{id:3060, "type":"mpeg4", location:"relativePath"},
		{id:3070, "type":"mpeg4", location:"onDevice"},
		{id:3080, "type":"h264", location:"relativePath1"},
		{id:3090, "type":"h264", location:"onDevice1"},
		{id:3100, "type":"h263", location:"relativePath"},
		{id:3110, "type":"h263", location:"onDevice"},
		{id:3120, "type":"mpeg4", location:"relativePath1"},
		{id:3130, "type":"mpeg4", location:"onDevice1"},
		{id:3140, "type":"theora", location:"relativePath"},
		{id:3150, "type":"theora", location:"onDevice"},
		{id:3160, "type":"theora", location:"relativePath1"},
		{id:3170, "type":"theora", location:"onDevice1"},
		{id:3180, "type":"webm", location:"relativePath"},
		{id:3190, "type":"webm", location:"onDevice"},
		{id:3200, "type":"webm", location:"relativePath1"},
		{id:3210, "type":"webm", location:"onDevice1"}
	];
	for (var i=0, l=_videoFiles.length; i<l; i++){
		(function(videoFileInfo){
			var filename = videoFiles[videoFileInfo.type][videoFileInfo.location];
			dohx.add({name:"VideoPlayer",
				mqcExecutionOrderBaseOffset:250000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
				requiredObjects:[
					"Widget.Multimedia.VideoPlayer.open",
					"Widget.Multimedia.VideoPlayer.play",
					"Widget.Multimedia.VideoPlayer.stop"
				],
				tests:[
					{
						id:videoFileInfo.id,
						name:"Protocol - Test codec '"+ videoFileInfo.type +"' from '" + filename + "'",
						instructions:"Click 'GO' to play video.",
						expectedResult:"Did you see the video?",
						setUp:_setUp,
						test:function(t){
							videoObj = new myVideo(filename, {
								autoPlay:true,
								stopAfter:10*1000
							});
						},
						tearDown:_tearDown
					}
				]
			});
		})(_videoFiles[i]);
	};
	
})();
