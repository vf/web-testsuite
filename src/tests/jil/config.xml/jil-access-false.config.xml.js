
var features = [];
var xml = xmlHelper.getXmlObject(config, features);
//xml.@version = "0";
//xml.widget.id =

//
//	Do all modifications to elements inside the default namespace (not prefixed with e.g. "jil:")
//
default xml namespace = "http://www.w3.org/ns/widgets";
delete xml.access; // We dont want the access tag here

//
//	Do all modifications in the JIL namespace.
//
default xml namespace = "http://www.jil.org/ns/widgets1.2";
// Explicitly make the tag to ONLY contain that one attribute "network".
delete xml.access.@*;
xml.access.@network = "false";
