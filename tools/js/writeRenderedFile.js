//
// This file writes the resulting XML into the appropriate "config.xml" file.
//

//XML.prettyPrinting = false;
var s = ""+xml;
// *** hacky "fixing" of the XML to be valid HTML
if (/\.html$/.test(config.destinationFile)){
	//
	//	HTML post processing
	//
	// Make sure all <.../> tags become <...></...> tags, since that is what HTML understands.
	s = s.replace(/<(\w+)([^<>]*)\/>/g, "<$1$2></$1>");
}
// *** hacky end, would love a nicer way, let me know if u got one!!!!

// Cool thing is the header for HTML is the doctype and for XML the XML header, works smooth :)
file.write(config.destinationFile, xmlHelper.header + "\n" + s);
