try{
	// Try to override the console.log, so we can use it in the code, mainly for developing purposes though.
	var dbgNode = document.getElementById("dbg");
	console = {log:function(){
		dbgNode.innerHTML += Array.prototype.slice.call(arguments, 0).join(" ")+" ";
	}};
}catch(e){}

function _startTests(){
	util.query(".statusBar .numTests")[0].innerHTML = doh._numTests;
	try{
		doh.run();
	}catch(e){
		util.query(".content")[0].innerHTML += e;
	}
}

var numTries = 0;
var loadingNode = embed.byId("loading");
function startTests(){
	// Add the timeout, just so the appended file above gets the time to load and run ... unfortunately not really bullet-proof
	// but we are "only" doing that so the number of tests are shown properly.
	if (numTries>30){
		loadingNode.innerHTML = 'This seems not to work<br /><a href="javasc'+'ript:numTries=0;startTests();">Try again</a>';
	} else {
		setTimeout(function(){
			if (!doh._numTests){
				numTries++;
				loadingNode.innerHTML = "Loading tests, tried " + numTries + "x...";
				startTests();
			} else {
				embed.style(loadingNode, "display", "none");
				_startTests();
			}
		}, 200);
	}
}

configHelper.onConfigured = function(){
	var node = document.createElement("script");
	node.type = "text/javascript";
	node.src = TEST_FILE + "?nocache="+(+new Date());
	document.body.appendChild(node);
	startTests();
};
if (config._meta.numAsynchConfigs==0){
	configHelper.finishConfiguration();
}

if (location.href.match("embedded=true")){
	embed.style(embed.byId("backButton"), "display", "block");
}
