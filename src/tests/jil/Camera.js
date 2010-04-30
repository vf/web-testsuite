(function(){
	var w = util.isObject("Widget") ? Widget : {};
	var wmc = util.isObject("Widget.Multimedia.Camera") ? Widget.Multimedia.Camera : {};
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	
	// Create a unique filename, so we dont have to rely on deleteFile() to work
	// and filenames dont clash with old tests. When using be sure to add some suffix,
	// like imgFile+"-wtf.jpg"
	var imgFile = "/virtual/photos/test-camera-" + new Date().getTime();
	
	dohx.add({name:"Camera",
		mqcExecutionOrderBaseOffset:130000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Multimedia.Camera.captureImage"],
		tests:[
			//
			// captureImage() - basics
			//
			{
				id:100,
				name:"Callback 'onCameraCaptured' triggered?",
				timeout:10*1000, // User may has to confirm security dialog.
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
						t.success("OK, file saved at "+fileName+".");
					}
					wmc.captureImage(imgFile+"-callback.jpg", true);
				},
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},{
				id:200,
				name:"Creates a file?",
				timeout:30*1000, // User may has to confirm security dialog.
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
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},{
				id:300,
				name:"Error during capture should pass 'undefined' to onCameraCaptured.",
				test:function(t){
// TODO verify this form the spec "If there is an error during capture,  onCameraCaptured will be called with an undefined parameter. "
					t.failure("Test not yet implemented.");
				}
			},{
				id:400,
				name:"Proper return value?",
				test:function(t){
					var myFileName = imgFile+"-retval.jpg";
					var ret = wmc.captureImage(myFileName, true);
					t.assertEqual(ret, myFileName);
					return "Returned expected filename: " + ret;
				},
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},{
				id:500,
				name:"Invalid destination path - throw INVALID_PARAMETER.",
				test:function(t){
					try{
						wmc.captureImage("/root/INVALIDDIR/1.jpg", true);
					}catch(e){
						// If multiple asserts would work the following would be easier, but doh2 is not capable of that (yet).
						var isInstanceof = e instanceof w.Exception;
						var isExcTypeOk = e.type == w.ExceptionTypes.INVALID_PARAMETER
						var msg = !isInstanceof ? "Exception not instance of Widget.Exception" :
									(!isExcTypeOk ? "Exception.type is not the expected Widget.ExceptionTypes.INVALID_PARAMETER": "");
						t.assertTrue(isInstanceof && isExcTypeOk, msg);
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
				expectedResult:"Please 1) open the filebrowser and 2) verify that the picture with the given name is the one you have taken.<br />Is it ok?",
				timeout:10*1000, // User may has to confirm security dialog.
				test:function(t){
					wmc.onCameraCaptured = function(fileName){
//Widget.Device.launchApplication(Widget.Device.ApplicationTypes.PICTURES, fileName); <= if that worked we could use it :(
						//dohx.showInfo('<img src="file://'+fileName+'" />'); doesnt work neither :(
						dohx.showInfo("Picture take stored at: '"+fileName+"'.");
					}
					wmc.captureImage(imgFile+"-lowRes.jpg", true);
				},
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},{
				id:700,
				name:"captureImage, lowRes - verify the stored file",
				timeout:10*1000, // User may has to confirm security dialog.
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
				tearDown:function(){
					delete wmc.onCameraCaptured;
				}
			},
			//
			//	captureImage() hiRes
			//
			{
				id:800,
				name:"captureImage, hiRes - verify the stored file",
				timeout:10*1000, // User may has to confirm security dialog.
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
			}//*/
		]
	});
})()

