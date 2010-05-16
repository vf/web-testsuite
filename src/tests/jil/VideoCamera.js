(function(){
	var w = util.isObject("Widget") ? Widget : {};
	var wmc = util.isObject("Widget.Multimedia.Camera") ? Widget.Multimedia.Camera : {};
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	
	// Create a unique filename, so we dont have to rely on deleteFile() to work
	// and filenames dont clash with old tests. When using be sure to add some suffix,
	// like imgFile+"-wtf.jpg"
	var videoFile = "/virtual/photos/test-videocamera-" + new Date().getTime();
	
	function _setUp(){
		dohx.showInfo('<object id="_cameraWindow_" type="video-camera/3gp" width="160" height="120" />');
		wmc.setWindow(util.byId("_cameraWindow_"));
	};
	function _tearDown(){
		wmc.setWindow(null);
		delete wmc.onCameraCaptured;
	};
	
	dohx.add({name:"Camera",
		mqcExecutionOrderBaseOffset:290000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Multimedia.Camera"],
		tests:[
			{
				id:100,
				name:"Callback 'onCameraCaptured' triggered?",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture", "Widget.Multimedia.Camera.stopVideoCapture"],
				timeout:20*1000,
				setUp:_setUp,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
						t.success("OK, file saved at " + fileName + ".");
					}
					wmc.startVideoCapture(videoFile + "-callback.mp4", true, 1, false);
				},
				tearDown:_tearDown
			},
			{
				id:200,
				name:"Creates a file?",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture", "Widget.Multimedia.Camera.stopVideoCapture"],
				timeout:30*1000, // User may has to confirm security dialog.
				setUp:_setUp,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
						try {
							var f = Widget.Device.getFile(fileName);
						}catch(e){
							t.failure("Excpetion getFile('"+fileName+"')." + e);
						}
						t.assertTrue(typeof f.fileSize!="undefined" && f.fileSize>0, "Filesize expected to be >0, but is: " + f.fileSize);
						t.result = util.toJson(f);
					}
					wmc.startVideoCapture(videoFile + "-creates-file.jpg", true, 1, false);
				},
				tearDown:_tearDown
			},
			{
				id:300,
				name:"Error during capture should pass 'undefined' to onCameraCaptured.",
				test:function(t){
// TODO verify this form the spec "If there is an error during capture,  onCameraCaptured will be called with an undefined parameter. "
					t.failure("Test not yet implemented.");
				}
			},
			{
				id:400,
				name:"Proper return value from startVideoCapture()?",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture", "Widget.Multimedia.Camera.stopVideoCapture"],
				test:function(t){
					var myFileName = videoFile + "-retval.mp4";
					var ret = wmc.startVideoCapture(myFileName, true, 1, false);
					t.assertEqual(ret, myFileName);
					return "Returned expected filename: " + ret;
				}
			},
			{
				id:500,
				name:"Invalid destination path - throw INVALID_PARAMETER.",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture", "Widget.Multimedia.Camera.stopVideoCapture"],
				test:function(t){
					try{
						wmc.startVideoCapture("/root/INVALIDDIR/1.jpg", true, 1, false);
					}catch(e){
						t.assertJilException(e, w.ExceptionTypes.INVALID_PARAMETER);
						return e;
					}
				}
			},
			//
			//	lowRes
			//
			{
				id:600,
				name:"lowRes",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture", "Widget.Multimedia.Camera.stopVideoCapture"],
				expectedResult:"Please 1) open the filebrowser and 2) verify that the picture with the given name is the one you have taken.<br />Is it ok?",
				timeout:10*1000, // User may has to confirm security dialog.
				setUp:_setUp,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
//Widget.Device.launchApplication(Widget.Device.ApplicationTypes.PICTURES, fileName); <= if that worked we could use it :(
						//dohx.showInfo('<img src="file://'+fileName+'" />'); doesnt work neither :(
						dohx.showInfo("Picture take stored at: '"+fileName+"'.");
					}
					wmc.startVideoCapture(videoFile + "-lowRes.jpg", true, 1, false);
				},
				tearDown:_tearDown
			},
			{
				id:700,
				name:"lowRes - verify the stored file",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture"],
				timeout:10*1000, // User may has to confirm security dialog.
				setUp:_setUp,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
						try {
							var f = Widget.Device.getFile(fileName);
						}catch(e){
							t.failure("Excpetion getFile('"+fileName+"')." + e);
						}
						t.assertTrue(fileName.indexOf(f.fileName)!=-1, "Expected to find '"+fileName+"' but got path:'"+f.filePath+"' file:'"+f.fileName+"'");
						t.result = fileName;
					}
					wmc.startVideoCapture(videoFile + "-lowRes-verify.jpg", true, 1, false);
				},
				tearDown:_tearDown
			},
			//
			//	hiRes
			//
			{
				id:800,
				name:"hiRes - verify the stored file",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture"],
				timeout:10*1000,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
						try {
							var f = Widget.Device.getFile(fileName);
						}catch(e){
							t.failure("Excpetion getFile('"+fileName+"')." + e);
						}
						t.assertTrue(fileName.indexOf(f.fileName)!=-1, "Expected to find '"+fileName+"' but got path:'"+f.filePath+"' file:'"+f.fileName+"'");
						t.result = fileName;
					}
					wmc.startVideoCapture(videoFile + "-hiRes-verify.mp4", true, 1, false);
				},
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},
			//
			//	Test parameters
			//
			{
				id:900,
				name:"Controls shown?",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture"],
				expectedResult:"Did you see the video recorder controls (e.g. play, pause, ...)?",
				timeout:10*1000,
				test:function(t){
					wmc.startVideoCapture(videoFile + "-verify-controls.mp4", true, 1, true);
				}
			},
			{
				id:1000,
				name:"stopVideoCapture() after 5 secs",
				requiredObjects:["Widget.Multimedia.Camera.startVideoCapture", "Widget.Multimedia.Camera.stopVideoCapture"],
				instructions:[
					"Click 'GO' to start recording",
					"Recording should stop after 5 seconds."
				],
				expectedResult:"Did the video recording stop after about 5 secs?",
				timeout:40*1000,
				setUp:_setUp,
				test:function(t){
					wmc.startVideoCapture(videoFile + "-verify-stop.mp4", true, 30, false);
					setTimeout(function(){
						wmc.stopVideoCapture();
					}, 5000);
				},
				tearDown:_tearDown
			}

// test stopVideoCapture() that it stops after the exact time

//*/
		]
	});
})()

