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

// Make sure the widget ID and name are the same for all "updateX" widgets.
config.widgetIdSuffix = config.widgetIdSuffix.replace(/\d$/, "0");

var features = ["widget", "audioplayer", "multimedia"];
var xml = xmlHelper.getXmlObject(config, features);
xml.@version = "1";
//xml.widget.id =
