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
(function(){
	
	// The spec for that can be found at http://tools.ietf.org/html/rfc5724
	// The sms URI spec:
	// 
	//sms-uri        = scheme ":" sms-hier-part [ "?" sms-fields ]
	//scheme         = "sms"
	//sms-hier-part  = sms-recipient *( "," sms-recipient )
	//sms-recipient  = telephone-subscriber ; defined in RFC 3966
	//sms-fields     = sms-field *( "&" sms-field )
	//sms-field      = sms-field-name "=" escaped-value
	//sms-field-name = "body" / sms-field-ext ; "body" MUST only appear once
	//sms-field-ext  = 1*( unreserved )
	//escaped-value  = *( unreserved / pct-encoded ) ; defined in RFC 3986
	//
	//for RFC 3986 see end of file
	
	var testSet = [
		// Only phone number(s) are given
		[100, "Only one local number", ["12345"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[200, "Only one global number", ["+12345678"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[300, "Two local numbers", ["12345","223344"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[400, "Two global numbers", ["+12345678","+333444"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[500, "Multiple local numbers", ["12345","223344","444555","9090909","88888"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[600, "Multiple global numbers", ["+12345678","+333444","+222222","+9990999"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[700, "One local and global number", ["12345","+555666"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		[800, "One global and local number", ["+555666","12345"], null,
			["http://tools.ietf.org/html/rfc5724#appendix-A"]],
		
		// Phone number and body given
		[1000, "One local number, body", ["12345"], "test content",
			["http://tools.ietf.org/html/rfc5724#section-1.2.1"]],
		[1100, "One global number, body", ["+12345678"], "test content",
			["http://tools.ietf.org/html/rfc5724#section-1.2.1"]],
	];
	
	var tests = [];
	var ID_INDEX = 0;
	var NAME_INDEX = 1;
	var PHONENUMBERS_INDEX = 2;
	var BODY_INDEX = 3;
	var SPEC_INDEX = 4;
	for (var i=0, l=testSet.length, test; i<l; i++){
		test = testSet[i];
		var recipientsString = test[PHONENUMBERS_INDEX].length > 1 ?
								(test[PHONENUMBERS_INDEX].length + " recipients ("+ test[PHONENUMBERS_INDEX].join(", ") +")") :
								test[PHONENUMBERS_INDEX][0];
		var tmp = {
			id: test[ID_INDEX],
			name: test[NAME_INDEX],
			definedInSpecs:test[SPEC_INDEX],
			expectedResult: "Did the SMS app open a new message<br />* to " + recipientsString +
								(test[BODY_INDEX] == null ? "" : ("<br />* with the content '" + test[BODY_INDEX] + "'")) + "?"
		};
		var url = "sms:" + test[PHONENUMBERS_INDEX] + (test[BODY_INDEX] == null ? "" : "?body=" + window.encodeURIComponent(test[3]));
		tmp.test = (function(url){
			return function(t){
				// Remove the info node right after click, so the user can follow the instructions below and is not distracted.
				dohx.showInfo('<a class="sms" href="' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
			}
		})(url);
		tests.push(embed.mixin({}, tmp));
	}

	
	dohx.add({name:"sms URI scheme",
		mqcExecutionOrderBaseOffset:540000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:tests
	});

})();

// http://tools.ietf.org/html/rfc3966
// RFC 3966, mainly needed for "telephone-subscriber" the spec for the phone number which we will only test roughly here (for now)
// 
//telephone-subscriber = global-number / local-number
//global-number        = global-number-digits *par
//local-number         = local-number-digits *par context *par
//par                  = parameter / extension / isdn-subaddress
//isdn-subaddress      = ";isub=" 1*uric
//extension            = ";ext=" 1*phonedigit
//context              = ";phone-context=" descriptor
//descriptor           = domainname / global-number-digits
//global-number-digits = "+" *phonedigit DIGIT *phonedigit
//local-number-digits  =
//   *phonedigit-hex (HEXDIG / "*" / "#")*phonedigit-hex
//domainname           = *( domainlabel "." ) toplabel [ "." ]
//domainlabel          = alphanum
//					   / alphanum *( alphanum / "-" ) alphanum
//toplabel             = ALPHA / ALPHA *( alphanum / "-" ) alphanum
//parameter            = ";" pname ["=" pvalue ]
//pname                = 1*( alphanum / "-" )
//pvalue               = 1*paramchar
//paramchar            = param-unreserved / unreserved / pct-encoded
//unreserved           = alphanum / mark
//mark                 = "-" / "_" / "." / "!" / "~" / "*" /
//					   "'" / "(" / ")"
//pct-encoded          = "%" HEXDIG HEXDIG
//param-unreserved     = "[" / "]" / "/" / ":" / "&" / "+" / "$"
//phonedigit           = DIGIT / [ visual-separator ]
//phonedigit-hex       = HEXDIG / "*" / "#" / [ visual-separator ]
//visual-separator     = "-" / "." / "(" / ")"
//alphanum             = ALPHA / DIGIT
//reserved             = ";" / "/" / "?" / ":" / "@" / "&" /
//					   "=" / "+" / "$" / ","
//uric                 = reserved / unreserved / pct-encoded

