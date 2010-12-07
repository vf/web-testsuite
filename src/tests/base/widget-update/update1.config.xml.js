
// Make sure the widget ID and name are the same for all "updateX" widgets.
config.widgetIdSuffix = config.widgetIdSuffix.replace(/\d$/, "0");

var features = ["widget", "audioplayer", "multimedia"];
var xml = xmlHelper.getXmlObject(config, features);
xml.@version = "1";
//xml.widget.id =
