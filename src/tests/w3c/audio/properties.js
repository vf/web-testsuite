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
//	Test set for the 
//		<audio>
//	tag. This file worries just about verifying properties of the audio tag and everything around them.

(function(){
	
	var cf = config.fileSystem;
	var localAudioFiles = cf.playableAudioFiles.relativePath;
	
	// All tests will use this. Its global, so tearDown can access it too and clean up properly.
	var audioNode = embed.query("audio")[0];
	
	dohx.add({name:"properties",
		mqcExecutionOrderBaseOffset:580000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		definedInSpecs:["http://www.w3.org/TR/2010/WD-widgets-20101005/"],
		tests:[
			{
				id:1,
				name:"Verify Preconditions",
				instructions:[
					"Make sure all the preconditions listed are met. They will be required by upcoming tests.",
					"Be sure the content of the testsuite's zip-file's  folder 'test-audio' is available in the relative path 'test-audio'.",
					"Ensure the volume is set to high, so you can hear the audio playing!",
					"Click 'GO' to start testing."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			},
			
			//
			//	src, currentSrc
			//
			{
				id:100,
				name:"src, is empty",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#location-of-the-media-resource"],
				test:function(t){
					t.assertFalse(!!audioNode.src, "Attribute 'src' expected to by empty, but has the value: '" + audioNode.src + "'");
				}
			},
			{
				id:200,
				name:"currentSrc, is empty",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#location-of-the-media-resource"],
				test:function(t){
					t.assertFalse(!!audioNode.currentSrc, "Attribute 'currentSrc' expected to eb empty, but has the value: '" + audioNode.currentSrc + "'");
				}
			},
			{
				id:300,
				name:"src, set it and verify it ends in '" + localAudioFiles.loopWav + "'",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#location-of-the-media-resource"],
				test:function(t){
					audioNode.src = localAudioFiles.loopWav;
					t.assertTrue(new RegExp(localAudioFiles.loopWav + "$").test(audioNode.src));
				}
			},
			{
				id:400,
				name:"currentSrc, ends in '" + localAudioFiles.loopWav + "'",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#location-of-the-media-resource"],
				test:function(t){
					t.assertTrue(new RegExp(localAudioFiles.loopWav + "$").test(audioNode.currentSrc));
				}
			},
			
			//
			//	networkState
			//
			{
				id:1000,
				name:"networkState, NETWORK_EMPTY",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#network-states"],
				test:function(t){
					var node = document.createElement("audio")
					t.assertEqual(node.NETWORK_EMPTY, node.networkState);
				}
			},
			{
// I am not sure if networkState has to be NETWORK_IDLE after loadeddata was fired ... Safari doesnt do so, Firefox does though :/
addIf:false,
				// The src is already loaded, so it should be idle by now.
				id:1100,
				name:"networkState, NETWORK_IDLE",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#network-states"],
				test:function(t){
					audioNode.load();
					audioNode.addEventListener("loadeddata", function(){
						t.assertEqual(audioNode.NETWORK_IDLE, audioNode.networkState);
					}, false);
				}
			},
			{
				// Set some non-existing src, to check NETWORK_NO_SOURCE
				id:1200,
				name:"networkState, NETWORK_NO_SOURCE",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#network-states"],
				test:function(t){
					var node = document.createElement("audio");
					node.src = "non-existent-audio-file" + (+new Date());
					t.assertEqual(node.NETWORK_NO_SOURCE, node.networkState);
				}
			},

			//
			//	readyState
			//
			{
				id:2000,
				name:"readyState, HAVE_NOTHING",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#the-ready-states"],
				test:function(t){
					var node = document.createElement("audio")
					t.assertEqual(node.HAVE_NOTHING, node.readyState);
				}
			},
			{
				id:2100,
				name:"readyState, HAVE_METADATA",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#the-ready-states"],
				test:function(t){
					audioNode.load();
					audioNode._event = ["loadedmetadata", function(){
						t.assertTrue(audioNode.readyState >= audioNode.HAVE_METADATA);
					}, false];
					audioNode.addEventListener.apply(audioNode, audioNode._event);
				},
				tearDown:function(){
					audioNode.removeEventListener.apply(audioNode, audioNode._event);
				}
			},
			{
				id:2200,
				name:"readyState, HAVE_CURRENT_DATA",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#the-ready-states"],
				test:function(t){
					audioNode.load();
					audioNode._event = ["loadeddata", function(){
						t.assertTrue(audioNode.readyState >= audioNode.HAVE_CURRENT_DATA);
					}, false];
					audioNode.addEventListener.apply(audioNode, audioNode._event);
				},
				tearDown:function(){
					audioNode.removeEventListener.apply(audioNode, audioNode._event);
				}
			},
			{
				id:2300,
				name:"readyState, HAVE_FUTURE_DATA",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#the-ready-states"],
				test:function(t){
					audioNode.load(); // There is no reset() so reload the file for resetting.
					audioNode.play();
					audioNode._event = ["playing", function(){
						t.assertTrue(audioNode.readyState >= audioNode.HAVE_FUTURE_DATA);
					}, false];
					audioNode.addEventListener.apply(audioNode, audioNode._event);
				},
				tearDown:function(){
					audioNode.pause();
					audioNode.removeEventListener.apply(audioNode, audioNode._event);
				}
			},
			{
				id:2400,
				name:"readyState, HAVE_ENOUGH_DATA",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/video.html#the-ready-states"],
				test:function(t){
					audioNode.load(); // There is no reset() so reload the file for resetting.
					audioNode.play();
					audioNode._event = ["canplaythrough", function(){
						t.assertTrue(audioNode.readyState >= audioNode.HAVE_ENOUGH_DATA);
					}, false];
					audioNode.addEventListener.apply(audioNode, audioNode._event);
				},
				tearDown:function(){
					audioNode.pause();
					audioNode.removeEventListener.apply(audioNode, audioNode._event);
				}
			},


//*/
		]
	});
})();
