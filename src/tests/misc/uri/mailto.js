(function(){
	
	// The spec for that can be found at http://www.faqs.org/rfcs/rfc2368.html
	// The mailto URI spec:
	// 
	//mailtoURL  =  "mailto:" [ to ] [ headers ]
	//to         =  #mailbox
	//headers    =  "?" header *( "&" header )
	//header     =  hname "=" hvalue
	//hname      =  *urlc
	//hvalue     =  *urlc
	
	//var testSet = [
	//	// id, to, params
	//	[100, "test@home.de"],
	//	[200, null, {to:"test@home.de"}],
	//];
	//
	//var tests = [];
	//for (var i=0, l=testSet.length, test; i<l; i++){
	//	test = testSet[i];
	//	var recipientsString = test[2].length > 1 ?
	//							(test[2].length + " recipients ("+ test[2].join(", ") +")") :
	//							test[2][0];
	//	var tmp = {
	//		id: test[0],
	//		name: test[1],
	//		instructions: [
	//			"Click 'GO'",
	//			"Follow the instructions on the screen.",
	//			"The SMS app should open, close it and come back to this app"
	//		],
	//		expectedResult: "Did the SMS app open a new message<br />* to " + recipientsString +
	//							(test.length == 3 ? "" : ("<br />* with the content '" + test[3] + "'")) + "?"
	//	};
	//	var url = "sms:" + test[2] + (test.length == 3 ? "" : "?body=" + window.encodeURIComponent(test[3]));
	//	tmp.test = (function(url){
	//		return function(t){
	//			// Remove the info node right after click, so the user can follow the instructions below and is not distracted.
	//			dohx.showInfo('<a class="sms" href="' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
	//		}
	//	})(url);
	//	tests.push(embed.mixin({}, tmp));
	//}

	
	dohx.add({name:"mailto URI scheme",
		mqcExecutionOrderBaseOffset:540000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			//	ONE addressee only (no other param!)
			//
			{
				id: 100,
				name: "mailto:email1",
				expectedResult: "Did the mail client open the composer to<br />* email1@home.com",
				test: function(){
					var url = "email1@home.com";
					dohx.showInfo('<a class="mailto" href="mailto:' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
			{
				id: 200,
				name: "mailto:?to=email1",
				expectedResult: "Did the mail client open the composer to<br />* email1@home.com",
				test: function(){
					var url = "?to=email1@home.com";
					dohx.showInfo('<a class="mailto" href="mailto:' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
			
			//
			// MULTIPLE addressee only (no other param!)
			//
			{
				id: 1000,
				name: "mailto:email1,email2",
				expectedResult: "Did the mail client open the composer to<br />* email1@home.com and email2@home.com",
				test: function(){
					var url = "email1@home.com,email2@home.com";
					dohx.showInfo('<a class="mailto" href="mailto:' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
			{
				id: 1100,
				name: "mailto:?to=email1,email2",
				expectedResult: "Did the mail client open the composer to<br />* email1@home.com and email2@home.com",
				test: function(){
					var url = "?to=email1@home.com,email2@home.com";
					dohx.showInfo('<a class="mailto" href="mailto:' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
			{
				id: 1200,
				name: "mailto:email1?to=email2",
				expectedResult: "Did the mail client open the composer to<br />* email1@home.com and email2@home.com",
				test: function(){
					var url = "email1@home.com?to=email2@home.com";
					dohx.showInfo('<a class="mailto" href="mailto:' + url + '" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
		]
	});

})();
