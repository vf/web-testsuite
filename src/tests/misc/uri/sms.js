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
		[100, "Only one local number", ["12345"]],
		[200, "Only one global number", ["+12345678"]],
		[300, "Two local numbers", ["12345","223344"]],
		[400, "Two global numbers", ["+12345678","+333444"]],
		[500, "Multiple local numbers", ["12345","223344","444555","9090909","88888"]],
		[600, "Multiple global numbers", ["+12345678","+333444","+222222","+9990999"]],
		[700, "One local and global number", ["12345","+555666"]],
		[800, "One global and local number", ["+555666","12345"]],
		
		// Phone number and body given
		[1000, "One local number, body", ["12345"], "test content"],
		[1100, "One global number, body", ["+12345678"], "test content"],
	];
	
	var tests = [];
	for (var i=0, l=testSet.length, test; i<l; i++){
		test = testSet[i];
		var recipientsString = test[2].length > 1 ?
								(test[2].length + " recipients ("+ test[2].join(", ") +")") :
								test[2][0];
		var tmp = {
			id: test[0],
			name: test[1],
			instructions: [
				"Click 'GO'",
				"Follow the instructions on the screen.",
				"The SMS app should open, close it and come back to this app"
			],
			expectedResult: "Did the SMS app open a new message<br />* to " + recipientsString +
								(test.length == 3 ? "" : ("<br />* with the content '" + test[3] + "'")) + "?"
		};
		var url = "sms:" + test[2] + (test.length == 3 ? "" : "?body=" + window.encodeURIComponent(test[3]));
		tmp.test = (function(url){
			return function(t){
				// Remove the info node right after click, so the user can follow the instructions below and is not distracted.
				dohx.showInfo('<a class="sms" href="' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
			}
		})(url);
		tests.push(embed.mixin({}, tmp));
	}

	
	dohx.add({name:"SMS URI scheme",
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

