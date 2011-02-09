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
	
	<a href="http://w3.org" class="copyright" title="HTML5 Logo by W3C">
		<img src="img/logo.png" alt="HTML5 Logo by W3C" />
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
	
	<button id="backButton" style="display:none; z-index:200; position:fixed; bottom:0; heigth:1.5em;" onclick="window.parent.showList()">BACK</button>
	
	<div id="loading" style="position:absolute; left:1em; top:1em; background-color:red; padding:1em; opacity:0.9;">
		
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
		var TEST_FILE = "{testFile}";
	</script>
	<script type="text/javascript" src="js/loader.js"></script>
</body>
</html>
