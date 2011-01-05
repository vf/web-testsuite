

var arg0 = arguments[0].split("/"); // This is something like "/Users/cain/bla/config.xml"
var TARGET_FILE = arg0[arg0.length-1]; // This shall become "config.xml" or "index.html"
var SRC_PATH = util.endInSlash(arg0.slice(0, -1).join("/")); // This shall be "/Users/cain/bla/"
var TEST_FILE = arguments[1].replace(SRC_PATH, ""); // E.g. "tests/w3c/config.xml/warp.js"

var pathParts = TEST_FILE.replace(/\.js$/, "").split("/");
var now = new Date();
var config = {
	
	testFile: TEST_FILE,
	
	// The complete path to the config.xml template that will be used to render and all placeholder in there will be replaced
	templateFile: SRC_PATH + TARGET_FILE + ".tpl",
	
	destinationFile: SRC_PATH + TARGET_FILE,
	
	defaultNamespace: TARGET_FILE=="config.xml" ? "http://www.w3.org/ns/widgets" : "",
	
	// The version string to be used for the widget.
	// Using the date initially ensures that the latest version will always be newer
	// than any old one and the update will take place automatically (used to be an H1/2 problem).
	// Is used in the following attribute:
	// 		<widget version="????">
	// So the latest widget has always a newer version and automatically updates when installed.
	versionString: "" + now.getFullYear() + (now.getMonth()+1) + ("0"+now.getDate()).substr(-2)
					+ ("0"+now.getHours()).substr(-2) + ("0"+now.getMinutes()).substr(-2) + ("0"+now.getSeconds()).substr(-2), 
	
	// This string is added to the widget ID attribute.
	//    <widget id="http://jil.org/wid/cc4b75....e8d0b1/{widgetIdSuffix}"
	// Normally that is just the widget name in a URL encoded way.
	widgetIdSuffix: pathParts.join("-"),
	
	// This is the string that is used inside the following tag:
	// 		<widget><name>????</name></widget>
	widgetName: pathParts[pathParts.length-1] + " (" + pathParts.slice(0, -1).join("/") + ")"
};

//for (var i in config)print(i+": "+config[i]);
