(function(){
	
	var wm = util.isObject("Widget.Multimedia") ? Widget.Multimedia : {};
	var wma = util.isObject("Widget.Multimedia.AudioPlayer") ? Widget.Multimedia.AudioPlayer : {};
	var cf = config.fileSystem;
	var inWidgetAudioFiles = cf.playableAudioFiles.inWidget;
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
//document.getElementById("dbg").innerHTML += "<br /><br />"+url+" =&gt; "+embed.toJson(options);
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
			if (options.onStateChange) options.onStateChange(oldState, newState);
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
		// Decouple it, Operas Nokia runtime e.g. wont render until it has opened the file, it seeems.
		setTimeout(function(){
			wma.open(url);
		}, 1);
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
					"Copy the content of the testsuite's zip-file's  folder 'test-audio' into the music directory (should be: '" + config._userInfo.audioDirectory + "') on the phone. (The exact name of the destination folder may vary on your device.)",
					"Ensure the volume is set to high, so you can hear the audio playing!",
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
				name:"Multimedia.isAudioPlaying true (in widget file '" + inWidgetAudioFiles.loopWav + "')",
				timeout:10 * 1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.loopWav, {
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
				id:150,
				name:"Multimedia.isAudioPlaying true (on device file '" + onDeviceAudioFiles.loopWav + "')",
				timeout:10 * 1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.loopWav, {
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
				name:"isAudioPlaying true after a while (in widget file '" + inWidgetAudioFiles.songMp3 + "')",
				timeout: 10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3,{
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
				id:350,
				name:"isAudioPlaying true after a while (on device file '" + onDeviceAudioFiles.songMp3 + "')",
				timeout: 10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3,{
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
				name:"isAudioPlaying false when paused (in widget file '" + inWidgetAudioFiles.songMp3 + "')",
				timeout: 10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3,{
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
			},
			{
				id:450,
				name:"isAudioPlaying false when paused (on device file '" + onDeviceAudioFiles.songMp3 + "')",
				timeout: 10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3,{
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
				name:"mp3, song (in widget file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:2000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3,{
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
				id:150,
				name:"mp3, song (on device file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:2000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3,{
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
				name:"mp3, loop, very small file (in widget file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:2000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.loopMp3,{
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
				id:250,
				name:"mp3, loop, very small file (on device file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:2000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.loopMp3,{
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
				name:"wav, song  (in widget file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songWav,{
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
				id:350,
				name:"wav, song  (on device file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songWav,{
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
				name:"wav, loop, very small file (in widget file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.loopWav,{
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
				id:450,
				name:"wav, loop, very small file (on device file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.loopWav,{
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
				id:500,
				name:"streaming MP3 (mp3 128k)",
				instructions:[
					"Click 'GO' to play audio.",
					"Please be patient, it might take a while, depending on your network, etc."
				],
				expectedResult:"Did you hear any playback?",
				test:function(t){
					dohx.showInfo("Loading...");
					audioObj = new myAudio("http://stream10.jamendo.com/stream/106471/mp31/03%20-%20PILL%20-%20Fearless.mp3",{
						autoPlay:true,
						onStateChange:function(oldState, newState){
							dohx.showInfo("Audio file state: " + oldState + " =&gt; " + newState);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:510,
				name:"redirected streaming MP3 (mp3 128k)",
				instructions:[
					"Click 'GO' to play audio.",
					"Please be patient, it might take a while, depending on your network, etc."
				],
				expectedResult:"Did you hear any playback?",
				test:function(t){
					dohx.showInfo("Loading...");
					audioObj = new myAudio("http://api.jamendo.com/get2/stream/track/redirect/?id=106471&streamencoding=mp31",{
						autoPlay:true,
						onStateChange:function(oldState, newState){
							dohx.showInfo("Audio file state: " + oldState + " =&gt; " + newState);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:600,
				name:"streaming OGG (ogg vorbis q4)",
				instructions:[
					"Click 'GO' to play audio.",
					"Please be patient, it might take a while, depending on your network, etc."
				],
				expectedResult:"Did you hear any playback?",
				test:function(t){
					dohx.showInfo("Loading...");
					audioObj = new myAudio("http://stream101.jamendo.com/stream/106471/ogg2/03%20-%20PILL%20-%20Fearless.ogg",{
						autoPlay:true,
						onStateChange:function(oldState, newState){
							dohx.showInfo("Audio file state: " + oldState + " =&gt; " + newState);
						}
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:610,
				name:"redirected streaming OGG (ogg vorbis q4)",
				instructions:[
					"Click 'GO' to play audio.",
					"Please be patient, it might take a while, depending on your network, etc."
				],
				expectedResult:"Did you hear any playback?",
				test:function(t){
					dohx.showInfo("Loading...");
					audioObj = new myAudio("http://api.jamendo.com/get2/stream/track/redirect/?id=106471&streamencoding=ogg2",{
						autoPlay:true,
						onStateChange:function(oldState, newState){
							dohx.showInfo("Audio file state: " + oldState + " =&gt; " + newState);
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
				name:"open, play 1sec, stop (in widget file)",
				instructions:"Click 'GO' to play audio for a second.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3,{
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
				id:150,
				name:"open, play 1sec, stop (on device file)",
				instructions:"Click 'GO' to play audio for a second.",
				expectedResult:"Did you hear any playback?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3,{
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
				name:"pause (in widget file)",
				instructions:"Click 'GO' to play audio for a second.",
				expectedResult:"Did the playback stop after about 1 second?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3,{
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
				id:250,
				name:"pause (on device file)",
				instructions:"Click 'GO' to play audio for a second.",
				expectedResult:"Did the playback stop after about 1 second?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3,{
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
				name:"pause and play again (in widget file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did the audio stop and play again?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3,{
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
				id:350,
				name:"pause and play again (on device file)",
				instructions:"Click 'GO' to play audio.",
				expectedResult:"Did the audio stop and play again?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3,{
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
				name:"play loop (in widget file)",
				instructions:"Click 'GO' to play audio looping twice.",
				expectedResult:"Did the audio play the same piece twice?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.loopMp3, {
						autoPlay: true,
						repeatTimes: 2
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:450,
				name:"play loop (on device file)",
				instructions:"Click 'GO' to play audio looping twice.",
				expectedResult:"Did the audio play the same piece twice?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.loopMp3, {
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
				name:"play loop (in widget file)",
				instructions:"Click 'GO' to play audio looping five times.",
				expectedResult:"Did the audio play the same piece five times (5x)?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.loopMp3, {
						autoPlay: true,
						repeatTimes: 5
					});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			},
			{
				id:550,
				name:"play loop (on device file)",
				instructions:"Click 'GO' to play audio looping five times.",
				expectedResult:"Did the audio play the same piece five times (5x)?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.loopMp3, {
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
				name:"play, resume (in widget file)",
				instructions:"Click 'GO' to play audio, pause and hear it continue.",
				expectedResult:"Did it pause for about 2secs and continue from where it had stopped?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(inWidgetAudioFiles.songMp3, {
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
				id:650,
				name:"play, resume (on device file)",
				instructions:"Click 'GO' to play audio, pause and hear it continue.",
				expectedResult:"Did it pause for about 2secs and continue from where it had stopped?",
				timeout:10*1000,
				test:function(t){
					audioObj = new myAudio(onDeviceAudioFiles.songMp3, {
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
					audioObj = new myAudio(inWidgetAudioFiles.songMp3, {
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
					audioObj = new myAudio(inWidgetAudioFiles.songMp3, {autoPlay:true, repeatTimes:5});
				},
				tearDown:function(){
					audioObj.cleanUp();
				}
			}
//*/
		]
	});
})();
