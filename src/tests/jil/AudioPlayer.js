(function(){
	
	var wm = util.isObject("Widget.Multimedia") ? Widget.Multimedia : {};
	var wma = util.isObject("Widget.Multimedia.AudioPlayer") ? Widget.Multimedia.AudioPlayer : {};
	var cf = config.fileSystem;
	var audioFiles = cf.playableAudioFiles.inWidget;
	var onDeviceAudioFiles = cf.playableAudioFiles.onDevice;
	
	// This is a mini object, to wrap audio functionality and make it better useable inside the
	// tests.
	// It basically implements the Finite state machine that the spec shows on page 110, and maps
	// all state changes to the proper method call.
	// The constructor has the following signature:
	// 		new myAudio = ("url to the audio file", {
	// 			autoPlay: true|false,
	// 			repeatTimes: 0..x
	// 			onOpen:function(){},
	// 			onPlay:function(){},
	// 			onStop:function(){},
	// 			onPause:function(){},
	// 			onComplete:function(){}
	// 		})
	// All options are optional.
	var myAudio = function(url, options){
		this.state = null;
		this._quit = false;
		this.cleanUp = function(){
			wma.stop();
			wma.onStateChange = null;
		}
		wma.onStateChange = doh.util.hitch(this, function(newState){
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
					wma.play(options.repeatTimes ? options.repeatTimes : 1);
				}
			} else {
				var b4 = options.onOpen;
				options.onOpen = function(){
					wma.play(options.repeatTimes ? options.repeatTimes : 1);
					b4();
				}
			}
		}
		wma.open(url);
	};
	
	// All tests will use this. Its global, so tearDown can access it too and clean up properly.
	var audioObj;
	
	dohx.add({name:"AudioPlayer",
		mqcExecutionOrderBaseOffset:70000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:1,
				name:"Verify Preconditions",
				instructions:[
					"Make sure all the preconditions listed are met. They will be required by upcoming tests.",
					"Copy the content of the testsuite's zip-file's  folder 'audio' into the music directory on the phone. (The exact name of the destination folder may vary on your device.)",
					"Click 'GO' to start testing."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			}
		]
	});

	dohx.add({name:"isAudioPlaying",
		mqcExecutionOrderBaseOffset:50000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Multimedia.AudioPlayer.open",
			"Widget.Multimedia.AudioPlayer.play",
			"Widget.Multimedia.AudioPlayer.stop"
		],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"Multimedia.isAudioPlaying true",
				timeout:10 * 1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.loopWav, {
						autoPlay:true,
						onPlay:function(){
							t.assertTrue(wm.isAudioPlaying);
							wma.stop();
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:200,
				name:"isAudioPlaying false",
				test:function(t){
					wma.stop(); // Make sure it's not playing :-)
					t.assertFalse(wm.isAudioPlaying);
				}
			},
			{
				id:300,
				name:"isAudioPlaying true after a while",
				timeout: 10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){ // Let the audio play for a second, that's just more real.
								t.assertTrue(wm.isAudioPlaying);
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:400,
				name:"isAudioPlaying false when paused",
				timeout: 10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){ // Let the audio play for a second, that's just more real.
								wma.pause();
								t.assertFalse(wm.isAudioPlaying);
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			}
		]
	});
	
	dohx.add({name:"audio Codecs",
		mqcExecutionOrderBaseOffset:60000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Multimedia.AudioPlayer.open",
			"Widget.Multimedia.AudioPlayer.play",
			"Widget.Multimedia.AudioPlayer.stop"
		],
		tests:[
			{
				id:100,
				name:"mp3, song",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:2000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.stop();
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:200,
				name:"mp3, loop (very small file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:2000,
				test:function(t){
					audioObj = new myAudio(audioFiles.loopMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.stop();
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:300,
				name:"wav, song",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songWav,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.stop();
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:400,
				name:"wav, loop (very small file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.loopWav,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.stop();
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
		]
	});
	
	dohx.add({name:"AudioPlayer",
		mqcExecutionOrderBaseOffset:70000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Multimedia.AudioPlayer.open",
			"Widget.Multimedia.AudioPlayer.play",
			"Widget.Multimedia.AudioPlayer.stop"
		],
		tests:[
			{
				id:100,
				name:"open, play 1sec, stop",
				instructions:"Click 'GO' to play audio for a second.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.stop();
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:200,
				name:"pause",
				instructions:"Click 'GO' to play audio for a second.",
				expectedResult:"Did the playback stop after about 1 second?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.pause();
							}, 1000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:300,
				name:"pause and play again",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did the audio stop and play again?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3,{
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.pause();
								setTimeout(function(){
									wma.resume();
									setTimeout(function(){
										wma.stop();
									}, 500);
								}, 500);
							}, 500);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:400,
				name:"play loop",
				instructions:"Click 'GO' to play audio looping twice.",
				expectedResult:"Did the audio play the same piece twice?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.loopMp3, {
						autoPlay: true,
						repeatTimes: 2
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:500,
				name:"play loop",
				instructions:"Click 'GO' to play audio looping five times.",
				expectedResult:"Did the audio play the same piece five times (5x)?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.loopMp3, {
						autoPlay: true,
						repeatTimes: 5
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:600,
				name:"play, resume",
				instructions:"Click 'GO' to play audio, pause and hear it continue.",
				expectedResult:"Did it pause for about 2secs and continue from where it had stopped?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3, {
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wma.pause();
								setTimeout(function(){
									wma.resume();
									setTimeout(function(){
										wma.stop();
									}, 2000);
								}, 2000);
							}, 2000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:700,
				name:"play - Play MP3 file from device '" + onDeviceAudioFiles.songMp3 + "'.",
				instructions:[
					"Make sure you have copied the audio files in to the devices music folder.",
					"Click 'GO'."
				],
				expectedResult:"Do you hear the audio play?",
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3, {autoPlay:true});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:800,
				name:"play - Play WAV file from device '" + onDeviceAudioFiles.songWav + "'.",
				instructions:[
					"Make sure you have copied the audio files in to the devices music folder.",
					"Click 'GO'."
				],
				expectedResult:"Do you hear the audio play?",
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songWav, {autoPlay:true});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			}
		]
	});

	dohx.add({name:"Multimedia misc",
		mqcExecutionOrderBaseOffset:80000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Multimedia"
		],
		tests:[
			{
				id:100,
				name:"Check if Widget.MultiMedia.stopAll() stops audio playing.",
				requiredObjects:[
					"Widget.Multimedia.AudioPlayer.open", "Widget.Multimedia.AudioPlayer.play", "Widget.Multimedia.AudioPlayer.stop",
					"Widget.Multimedia.stopAll"
				],
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did it stop after about 2sec?",
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3, {
						autoPlay:true,
						onPlay:function(){
							setTimeout(function(){
								wm.stopAll();
							}, 2000);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:200,
				name:"Verify the volume value.",
				requiredObjects:["Widget.Multimedia.getVolume"],
				instructions:[
					"Change the volume of the phone to very loud!",
					"Click 'GO'."
				],
				expectedResult:"Is the shown volume level correct?",
				test:function(t){
					dohx.showInfo("API reports volume is at: " + wm.getVolume()*10 +"%");
				}
			},
			{
				id:300,
				name:"Verify a different(!) volume value again.",
				requiredObjects:["Widget.Multimedia.getVolume"],
				instructions:[
					"Change the volumne of the phone to very low!",
					"Click 'GO'."
				],
				expectedResult:"Is the shown volume level correct?",
				test:function(t){
					dohx.showInfo("API reports volume is at: " + wm.getVolume()*10 +"%");
				}
			},
			{
				id:400,
				name:"Verify the volume value, 100% (10).",
				requiredObjects:["Widget.Multimedia.getVolume"],
				instructions:[
					"Change the volume of the phone to the loudest possible!",
					"Click 'GO'."
				],
				test:function(t){
					t.assertEqual(10, wm.getVolume());
				}
			},
			{
				id:500,
				name:"Verify the volume value, 0.",
				requiredObjects:["Widget.Multimedia.getVolume"],
				instructions:[
					"Change the volume of the phone to the lowest possible value!",
					"Click 'GO'."
				],
				test:function(t){
					t.assertEqual(0, wm.getVolume());
				}
			},
			{
				id:600,
				name:"Change volume while song is playing", // Seems not to be working in latest firmware.
				requiredObjects:[
					"Widget.Multimedia.AudioPlayer.open", "Widget.Multimedia.AudioPlayer.play", "Widget.Multimedia.AudioPlayer.stop"
				],
				instructions:[
					"Change the volume up, to as loud as possible.",
					"Click 'GO'!",
					"Turn down the volume to the lowest possible value.",
					"Turn down the volume back up.",
				],
				expectedResult:"Had you been able to turn down the volume and back up?",
				test:function(t){
					audioObj = new myAudio(audioFiles.songMp3, {autoPlay:true, repeatTimes:5});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			}
//*/
		]
	});
})();
