(function(){
	var w = util.isObject("Widget") ? Widget : {};
	var wmc = util.isObject("Widget.Multimedia.Camera") ? Widget.Multimedia.Camera : {};
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	
	// Create a unique filename, so we dont have to rely on deleteFile() to work
	// and filenames dont clash with old tests. When using be sure to add some suffix,
	// like imgFile+"-wtf.jpg"
	var imgFile = "/virtual/photos/test-camera-" + new Date().getTime();
	
	function _setUp(){
		dohx.showInfo('<object id="_cameraWindow_" type="video-camera/3gp" width="240" height="320" />');
		wmc.setWindow(util.byId("_cameraWindow_"));
	};
	function _tearDown(){
		wmc.setWindow(null);
		delete wmc.onCameraCaptured;
	};
	
	dohx.add({name:"Camera",
		mqcExecutionOrderBaseOffset:130000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Multimedia.Camera"],
		tests:[
			//
			// captureImage() - basics
			//
			{
				id:100,
				name:"Callback 'onCameraCaptured' triggered?",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
				timeout:10*1000, // User may has to confirm security dialog.
				setUp:_setUp,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
						t.success("OK, file saved at "+fileName+".");
					}
					wmc.captureImage(imgFile+"-callback.jpg", true);
				},
				tearDown:_tearDown
			},
			{
				id:200,
				name:"Creates a file?",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
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
					wmc.captureImage(imgFile+"-creates-file.jpg", true);
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
				name:"Proper return value?",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
				setUp:_setUp,
				test:function(t){
					var myFileName = imgFile+"-retval.jpg";
					var ret = wmc.captureImage(myFileName, true);
					t.assertEqual(ret, myFileName);
					return "Returned expected filename: " + ret;
				},
				tearDown:_tearDown
			},
			{
				id:500,
				name:"Invalid destination path - throw INVALID_PARAMETER.",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
				test:function(t){
					try{
						wmc.captureImage("/root/INVALIDDIR/1.jpg", true);
					}catch(e){
						t.assertJilException(e, w.ExceptionTypes.INVALID_PARAMETER);
						return e;
					}
				},
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},
			//
			//	captureImage() lowRes
			//
// 1) verify resulting file name is the same as passed in
// 2) verify that loRes and hiRes files are different size
// 3) show filename and let user open the pic in the picture viewer to verify its the pic he has expected
			{
				id:600,
				name:"captureImage, lowRes - takes a picture at all?",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
				expectedResult:"Please 1) open the filebrowser and 2) verify that the picture with the given name is the one you have taken.<br />Is it ok?",
				timeout:10*1000, // User may has to confirm security dialog.
				setUp:_setUp,
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
//Widget.Device.launchApplication(Widget.Device.ApplicationTypes.PICTURES, fileName); <= if that worked we could use it :(
						//dohx.showInfo('<img src="file://'+fileName+'" />'); doesnt work neither :(
						dohx.showInfo("Picture take stored at: '"+fileName+"'.");
					}
					wmc.captureImage(imgFile+"-lowRes.jpg", true);
				},
				tearDown:_tearDown
			},
			{
				id:700,
				name:"captureImage, lowRes - verify the stored file",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
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
					wmc.captureImage(imgFile+"-lowRes-verify.jpg", true);
				},
				tearDown:_tearDown
			},
			//
			//	captureImage() hiRes
			//
			{
				id:800,
				name:"captureImage, hiRes - verify the stored file",
				requiredObjects:["Widget.Multimedia.Camera.captureImage"],
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
					wmc.captureImage(imgFile+"-hiRes-verify.jpg", true);
				},
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},
			//
			//	Test setWindow() with different preview sizes
			//
			{
				id:900,
				name:"setWindow - Using &lt;object&gt; with 160x120",
				requiredObjects:["Widget.Multimedia.Camera.setWindow"],
				timeout:10*1000,
				setUp:function(){
					dohx.showInfo('<object id="_cameraWindow_" type="video-camera/3gp" width="160" height="120" />');
					wmc.setWindow(util.byId("_cameraWindow_"));
				},
				expectedResult:"Do you see a downscaled preview of the camera image?",
				test:function(t){
					wmc.onCameraCaptured = function(){
						t.success("Callback 'onCameraCaptured' fired.");
					}
					wmc.captureImage(imgFile + "-setWindow-" + new Date().getTime() + ".jpg", true);
				},
				tearDown:_tearDown
			},
			{
				id:1000,
				name:"setWindow - Using &lt;object&gt; with 200x200",
				requiredObjects:["Widget.Multimedia.Camera.setWindow"],
				timeout:10*1000,
				setUp:function(){
					dohx.showInfo('<object id="_cameraWindow_" type="video-camera/3gp" width="200" height="200" />');
					wmc.setWindow(util.byId("_cameraWindow_"));
				},
				expectedResult:"Do you see a downscaled preview of the camera image?",
				test:function(t){
					wmc.onCameraCaptured = function(){
						t.success("Callback 'onCameraCaptured' fired.");
					}
					wmc.captureImage(imgFile + "-setWindow-" + new Date().getTime() + ".jpg", true);
				},
				tearDown:_tearDown
			},
			{
				id:1100,
				name:"setWindow - Using &lt;div&gt; with 200x200",
				requiredObjects:["Widget.Multimedia.Camera.setWindow"],
				timeout:10*1000,
				setUp:function(){
					dohx.showInfo('<div id="_cameraWindow_" type="video-camera/3gp" style="width:200px; height:200px;"></div>');
					wmc.setWindow(util.byId("_cameraWindow_"));
				},
				expectedResult:"Do you see a downscaled preview of the camera image?",
				test:function(t){
					wmc.onCameraCaptured = function(){
						t.success("Callback 'onCameraCaptured' fired.");
					}
					wmc.captureImage(imgFile + "-setWindow-" + new Date().getTime() + ".jpg", true);
				},
				tearDown:_tearDown
			},
			{
				id:1200,
				name:"setWindow - Using &lt;object&gt; fullscreen",
				requiredObjects:["Widget.Multimedia.Camera.setWindow"],
				timeout:10*1000,
				setUp:function(){
					dohx.showInfo('<object id="_cameraWindow_" type="video-camera/3gp" width="100%" height="100%" style="position:absolute; top:0; left:0;"></div>');
					wmc.setWindow(util.byId("_cameraWindow_"));
				},
				expectedResult:"Did you see a downscaled preview of the camera image?",
				test:function(t){
					wmc.onCameraCaptured = function(){
						t.success("Callback 'onCameraCaptured' fired.");
						// Hide the preview node, which filled the entire screen, to let user confirm result.
						setTimeout(function(){
							util.style("_cameraWindow_", "display", "none");
						}, 5000);
					}
					wmc.captureImage(imgFile + "-setWindow-" + new Date().getTime() + ".jpg", true);
				},
				tearDown:_tearDown
			},
			{
				id:1300,
				name:"setWindow - Using &lt;div&gt; fullscreen",
				requiredObjects:["Widget.Multimedia.Camera.setWindow"],
				timeout:10*1000,
				setUp:function(){
					dohx.showInfo('<div id="_cameraWindow_" type="video-camera/3gp" style="position:absolute; top:0; left:0; width:100%; height:100%;">&nbsp;</div>');
					wmc.setWindow(util.byId("_cameraWindow_"));
				},
				expectedResult:"Do you see a downscaled preview of the camera image?",
				test:function(t){
					wmc.onCameraCaptured = function(){
						t.success("Callback 'onCameraCaptured' fired.");
						// Hide the preview node, which filled the entire screen, to let user confirm result.
						setTimeout(function(){
							util.style("_cameraWindow_", "display", "none");
						}, 5000);
					}
					wmc.captureImage(imgFile + "-setWindow-" + new Date().getTime() + ".jpg", true);
				},
				tearDown:_tearDown
			}
//*/
		]
	});
})()

