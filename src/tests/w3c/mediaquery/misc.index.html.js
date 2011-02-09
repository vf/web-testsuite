
// No features are needed for this test.
var xml = xmlHelper.getXmlObject(config);

xml.head.link += <link rel="stylesheet" href="tests/w3c/mediaquery/misc.css" type="text/css" />;

var mediaQueries = '';

var step = 10;
var maximumSize = 400;

for (var i=step;i<maximumSize+1;i+=step) {
	mediaQueries += '\n@media all and (min-resolution: ' + i + 'dpi) and (max-resolution: ' + (i+step-1) + 'dpi) {';
	mediaQueries += '#dpi' + i + '{display: block}';
	mediaQueries += '#dpi {display: none;} }';
}

xml.head.link += <style>{mediaQueries}</style>;