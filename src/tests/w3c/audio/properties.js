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
	var inWidgetAudioFiles = cf.playableAudioFiles.inWidget;
	var onDeviceAudioFiles = cf.playableAudioFiles.onDevice;
	
	// All tests will use this. Its global, so tearDown can access it too and clean up properly.
	var audioNode = embed.query("audio")[0];
	
	dohx.add({name:"properties",
		mqcExecutionOrderBaseOffset:580000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
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
				name:"src is empty",
				test:function(t){
					t.assertFalse(!!audioNode.src, "Attribute 'src' expected to by empty, but has the value: '" + audioNode.src + "'");
				}
			},
			{
				id:200,
				name:"currentSrc is empty",
				test:function(t){
					t.assertFalse(!!audioNode.currentSrc, "Attribute 'currentSrc' expected to eb empty, but has the value: '" + audioNode.currentSrc + "'");
				}
			},
			{
				id:300,
				name:"src with a value",
				test:function(t){
					audioNode.src = localAudioFile.songMp3;
					t.assertFalse(!!audioNode.src, "Attribute 'src' expected to by empty, but has the value: '" + audioNode.src + "'");
				}
			},
//*/
		]
	});
})();
