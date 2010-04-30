<!DOCTYPE html>
<html>
<head>
	<title>$testfilename</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">

	<link rel="stylesheet" href="css/style.css" type="text/css">
	<script type="text/javascript">if(parent.emulator)parent.emulator.begin(window);</script>
</head>
<body>
	<div class="statusBar">
		<span class="numTestsDone">0</span>/<span class="numTests">0</span> tests,
		<span class="numFailed">0</span> failed (<span class="percentFailed">0</span>%)
	</div>
	
	<a href="javascript:widget.openURL('http://vodafone.com')" class="copyright">
		<img src="img/logo.png" alt="by Vodafone" />
	</a>
	
<div id="dbg" style="color:red;"></div>
	<div class="content">
	</div>
	
	<div class="manualTest">
		<h1 class="testName"></h1>
		<div class="whatToDo">
			<h1>What to do?</h1>
			<p class="text"></p>
			<button class="goButton">GO</button>
			<p class="testInfo"></p>
		</div>
		
		<div class="timeout">
			<h1>Timeout</h1>
			<p>
				Test automatically fails in:
				<span class="countdown"><span class="minutes">0:00</span> min</span>
				<!--<button class="failButton">Fail Now</button>i dont know how to implement this-->
			</p>
		</div>
		
		<div class="result">
			<h1>What should have happened?</h1>
			<p class="text"></p>
			<button class="yesButton">Yes</button>
			<button class="noButton">No</button>
		</div>
	</div>
	
	
	<script type="text/javascript">
		//window.onerror = function(){
		//	var ret = ["ERROR"];
		//	for (var i=0, l=arguments.length; i<l; i++){
		//		var v = arguments[i];
		//		if (typeof v=="object"){
		//			for (var k in v){
		//				if (typeof v[k]=="function") continue;
		//				if (k==k.toUpperCase()) continue;
		//				ret.push(k + ": " + v[k]);
		//			}
		//		} else {
		//			ret.push(v);
		//		}
		//	}
		//	alert(ret.join(" | "));
		//}
	</script>
	<script type="text/javascript" src="js/doh2/doh.js"></script>
	<script type="text/javascript" src="js/doh2/config.js"></script>
	<script type="text/javascript" src="js/doh2/util.js"></script>
	
	<script type="text/javascript" src="js/util.js"></script>
	
	<script type="text/javascript" src="js/doh2/deferred.js"></script>
	<script type="text/javascript" src="js/doh2/assert.js"></script>
	<script type="text/javascript" src="js/ui.js"></script>
	<script type="text/javascript" src="js/doh2_ui.js"></script>
	<script type="text/javascript" src="js/dohx.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
	<script type="text/javascript">
		// This is just for the local testing, load the compat.js file, which allows testing in opera+FF
		// without the need of the emulator around it, its much faster!
		if ((!window.widget && navigator.product=="Gecko") || (window.widget && window.widget.widgetMode=="widget")){
			document.write("<scri"+"pt src='js/compat.js' type='text/javascript'></scr"+"ipt>");
		}
		if (typeof console=="undefined" || !console.log){
		//else {
			var dbgNode = document.getElementById("dbg");
			console = {log:function(){
				dbgNode.innerHTML += Array.prototype.slice.call(arguments, 0).join(", ")+" ";
			}};
		}
		if (!config.isValid){
			ui.invalidConfig();
		}
	</script>
	<script src='tests/$test.js' type='text/javascript'></script>
	<script type="text/javascript">
		if (config.isValid){
			util.query(".statusBar .numTests")[0].innerHTML = doh._numTests;
			try{
				doh.run();
			}catch(e){
				util.query(".content")[0].innerHTML += e;
			}
		}
	</script>
</body>
</html>
