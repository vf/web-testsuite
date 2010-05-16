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
					wmv.play(options.repeatTimes ? options.repeatTimes+1 : 1);
				}
			} else {
				var b4 = options.onOpen;
				options.onOpen = function(){
					wmv.play(options.repeatTimes ? options.repeatTimes+1 : 1);
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
		dohx.showInfo('<object id="_videoWindow_" type="video/3gp" width="240" height="320" />');
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
*/			{
				id:400,
				name:"Protocol - file",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video?",
				setUp:_setUp,
				test:function(t){
					videoObj = new myVideo(videoFiles.threeGp.onDevice, {
						autoPlay:true,
						stopAfter:10*1000
					});
				},
				tearDown:_tearDown
			},
			{
				id:500,
				name:"Protocol - widget context",
				instructions:"Click 'GO' to play video.",
				expectedResult:"Did you see the video?",
				setUp:_setUp,
				test:function(t){
					videoObj = new myVideo(videoFiles.threeGp.inWidget, {
						autoPlay:true,
						stopAfter:10*1000
					});
				},
				tearDown:_tearDown
			},
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
					videoObj = new myVideo(videoFiles.threeGp.inWidget, {
						autoPlay:true,
						stopAfter:10*1000,
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
					videoObj = new myVideo(videoFiles.threeGp.inWidget, {
						autoPlay:true,
						stopAfter:10*1000,
						repeatTimes:2
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
					videoObj = new myVideo(videoFiles.threeGp.inWidget, {
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
		]
	});
})();
