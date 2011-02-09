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
delete xml.access;