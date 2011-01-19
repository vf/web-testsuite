<!DOCTYPE html>
<html>
<head>
	<title>{widgetName}</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />

	<link rel="stylesheet" href="css/style.css" type="text/css" />
</head>
<body>
	<div class="statusBar">
		<span class="numTestsDone">0</span>/<span class="numTests">0</span> tests,
		<span class="numFailed">0</span> failed (<span class="percentFailed">0</span>%)
		<span class="notCustomConfigured" style="display:none; color:#FBB;">[not configured]</span>
	</div>
	
	<a href="javascript:widget.openURL('http://vodafone.com')" class="copyright">
		<img src="img/logo.png" alt="by Vodafone" />
	</a>
	
	<div class="content"></div>
	<div id="dbg" style="color:red;"></div>
	
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
	
	<script type="text/javascript" src="js/doh2/doh.js"></script>
	<script type="text/javascript" src="js/doh2/config.js"></script>
	<script type="text/javascript" src="js/doh2/util.js"></script>
	
	<script type="text/javascript" src="js/util.js"></script>
	
	<script type="text/javascript" src="js/doh2/deferred.js"></script>
	<script type="text/javascript" src="js/doh2/assert.js"></script>
	<script type="text/javascript" src="js/ui.js"></script>
	<script type="text/javascript" src="js/doh2_ui.js"></script>
	<script type="text/javascript" src="js/dohx.js"></script>
	<script type="text/javascript" src="js/compat.js"></script> <!-- if compat is not packaged it wont be loaded -->
	<script type="text/javascript" src="js/embed.js"></script>
	<script type="text/javascript" src="js/config.js"></script> <!-- Load it after the compat, so we can use Widget, etc. -->
	<script type="text/javascript">

		// Try to override the console.log, so we can use it in the code, mainly for developing purposes though.
		try{
			var dbgNode = document.getElementById("dbg");
			console = {log:function(){
				dbgNode.innerHTML += Array.prototype.slice.call(arguments, 0).join(" ")+" ";
			}};
		}catch(e){}
		
		configHelper.onConfigured = function(){
			var node = document.createElement("script");
			node.type = "text/javascript";
			node.src = "{testFile}?nocache="+(+new Date());
			document.body.appendChild(node);
			// Add the timeout, just so the appended file above gets the time to load and run ... unfortunately not really bullet-proof
			// but we are "only" doing that so the number of tests are shown properly.
			setTimeout(function(){
				util.query(".statusBar .numTests")[0].innerHTML = doh._numTests;
				try{
					doh.run();
				}catch(e){
					util.query(".content")[0].innerHTML += e;
				}
			}, 100);
		};
		if (config._meta.numAsynchConfigs==0){
			configHelper.finishConfiguration();
		}
	</script>
</body>
</html>
