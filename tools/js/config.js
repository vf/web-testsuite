

var SRC_PATH = util.endInSlash(arguments[0]);
var TEST_FILE = arguments[1].replace(SRC_PATH, "");

var pathParts = TEST_FILE.replace(/\.js$/, "").split("/");
var config = {
	
	// The complete path to the config.xml template that will be used to render and all placeholder in there will be replaced
	configXmlTemplateFile: SRC_PATH + "config.xml.tpl",
	
	// The version string to be used for the widget.
	// Using the date initially ensures that the latest version will always be newer
	// than any old one and the update will take place automatically (used to be an H1/2 problem).
	// Is used in the following attribute:
	// 		<widget version="????">
	versionString: +new Date(), // So the latest widget has always a newer version and automatically updates when installed.
	
	// This string is added to the widget ID attribute.
	//    <widget id="http://jil.org/wid/cc4b75....e8d0b1/{widgetIdSuffix}"
	// Normally that is just the widget name in a URL encoded way.
	widgetIdSuffix: pathParts.join("-"),
	
	// This is the string that is used inside the following tag:
	// 		<widget><name>????</name></widget>
	widgetName: pathParts[pathParts.length-1] + " (" + pathParts.slice(0, -1).join("/") + ")"
};

