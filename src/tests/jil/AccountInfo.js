(function(){
	
	var wda = util.isObject("Widget.Device.AccountInfo") ? Widget.Device.AccountInfo : {};
  
	dohx.add({name:"AccountInfo",
		mqcExecutionOrderBaseOffset:10000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.AccountInfo"],
		tests:[
			//
			//	phoneMSISDN
			//
			{
				id: 100,
				name: "Check that phoneMSISDN is not empty!",
				requiredObjects:["Widget.Device.AccountInfo.phoneMSISDN"],
				test: function(t) {
					var msisdn = wda.phoneMSISDN;
					t.assertTrue(!!msisdn);
					return msisdn;
				}
			},
			{
				id: 200,
				name: "Check value of phoneMSISDN.",
				requiredObjects:["Widget.Device.AccountInfo.phoneMSISDN"],
				instructions:[
					"Try to find out your Mobile Directory Number (MDN) and not the Mobile Identification Number (MIN)",
					"Click 'GO'."
				],
				expectedResult:"Is the above phoneMSISDN correct?",
				test: function(t) {
					var msisdn = wda.phoneMSISDN;
					dohx.showInfo(msisdn ? ("API reports phoneMSISDN: " + msisdn) : "Could not read MSISDN.");
				}
			},
			//
			//	phoneOperatorName
			// 
			{
				id: 300,
				name: "Check that phoneOperatorName is not empty!",
				requiredObjects:["Widget.Device.AccountInfo.phoneOperatorName"],
				test: function(t) {
					t.assertTrue(!!wda.phoneOperatorName);
					return wda.phoneOperatorName;
				}
			},
			{
				id: 400,
				name: "phoneOperatorName",
				requiredObjects:["Widget.Device.AccountInfo.phoneOperatorName"],
				instructions:[
					"Make sure you know the operator's name of this phone (e.g. Vodafone UK).",
					"Click 'GO'."
				],
				expectedResult:"Is the shown operator name correct?",
				test: function(t) {
					dohx.showInfo("Operator name is: " + wda.phoneOperatorName);
				}
			},
			//
			//	phoneUserUniqueId
			//
			{
				id: 500,
				name: "Check that phoneUserUniqueId is not empty!",
				requiredObjects:["Widget.Device.AccountInfo.phoneUserUniqueId"],
				test: function(t) {
					t.assertTrue(!!wda.phoneUserUniqueId);
					return wda.phoneUserUniqueId;
				}
			},
			//
			//	userAccountBalance
			//
// TODO the following ar edisabled for now, since I dont know how we can check if the tests are applicable for the current device,
// actually better for the current operator and SIM card ... maybe untestable?
			{
				id: 600,
addIf:false,
				name: "userAccountBalance",
				instructions:[
					"Make sure you know your account balance.",
					"Click 'GO'."
				],
				expectedResult:"Is the above account balance correct?",
				test: function(t) {
					dohx.showInfo("API reports account balance: " + wda.userAccountBalance);
				}
			},
			//
			//	userSubscriptionType
			// 
			{
				id: 700,
addIf:false,
				name: "Check that userSubscriptionType is not empty!",
				test: function(t) {
					t.assertTrue(!!wda.userSubscriptionType);
					return wda.userSubscriptionType;
				}
			},
			{
				id: 800,
addIf:false,
				name: "userSubscriptionType",
				instructions:[
					"Make sure you know your subscription type, e.g. prepaid, postpaid or other.",
					"Click 'GO'."
				],
				expectedResult:"Is the shown subscription type correct?",
				test: function(t) {
					dohx.showInfo("API reports : " + wda.userSubscriptionType);
				}
			}
//*/
		]  
	});
})();