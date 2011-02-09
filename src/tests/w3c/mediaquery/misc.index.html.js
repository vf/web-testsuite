/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

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