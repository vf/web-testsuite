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
	
	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmm = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};

	var supports = config.supports.Messaging;
	
	dohx.add({name:"MessagingEmailAccount",
		mqcExecutionOrderBaseOffset:310000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Messaging"],
		tests:[
			//
			// getCurrentEmailAccount
			//
			{
				id:100,
				name:"getCurrentEmailAccount - Verify it.",
				requiredObjects:["Widget.Messaging.getCurrentEmailAccount"],
				expectedResult:"Is the above info correct?",
				test:function(t){
					var ret = wm.getCurrentEmailAccount();
					dohx.showInfo("API reports: " + embed.toJson(ret));
					return ret;
				}
			},
			
			//
			// getEmailAccounts
			//
			{
				id:200,
				name:"getEmailAccounts - Verify it returns an array.",
				requiredObjects:["Widget.Messaging.getEmailAccounts"],
				test:function(t){
					var ret = wm.getEmailAccounts();
					t.assertTrue(doh.util.isArray(ret));
					return ret;
				}
			},
			{
				id:300,
				name:"getEmailAccounts - Verify return value.",
				requiredObjects:["Widget.Messaging.getEmailAccounts"],
				instructions:[
					"Make sure you have at least one Email account configured.",
					"Click 'GO'."
				],
				expectedResult:"Is the above result correct?",
				test:function(t){
					var ret = wm.getEmailAccounts();
					dohx.showInfo("API reports: " + embed.toJson(ret));
					return ret;
				}
			},
			
			//
			// setCurrentEmailAccount
			//
			{
				id:400,
				name:"setCurrentEmailAccount - Switch.",
				addIf:supports.multipleEmailAccounts,
				requiredObjects:["Widget.Messaging.getEmailAccounts", "Widget.Messaging.getCurrentEmailAccount", "Widget.Messaging.setCurrentEmailAccount"],
				instructions:[
					"Make sure you have at least TWO Email accounts configured.",
					"Click 'GO'."
				],
				test:function(t){
					// Read all the accounts.
					// Find out which is the current one.
					// Set the other one to current.
					var accounts = wm.getEmailAccounts();
					var oldAccount = wm.getCurrentEmailAccount();
					if (accounts.length<2){
						t.failure("Two email accounts required to run test.");
					}
					for (var i=0, l=accounts.length, a; i<l; i++){
						a = accounts[i];
						if (a.accountId != oldAccount.accountId){
							wm.setCurrentEmailAccount(a.accountId);
							break;
						}
					}
					t.assertNotEqual(oldAccount.accountId, wm.getCurrentEmailAccount().accountId);
				}
			},
			{
				id:500,
				name:"setCurrentEmailAccount - Throw INVALID_PARAMETER for invalid param.",
				addIf:supports.multipleEmailAccounts,
				requiredObjects:["Widget.Messaging.setCurrentEmailAccount"],
				test:function(t){
					try{
						wm.setCurrentEmailAccount("nix da INVALID");
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:600,
				name:"setCurrentEmailAccount - Throw INVALID_PARAMETER for no param.",
				addIf:supports.multipleEmailAccounts,
				requiredObjects:["Widget.Messaging.setCurrentEmailAccount"],
				test:function(t){
					try{
						wm.setCurrentEmailAccount();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			
			//
			// deleteEmailAccount
			//
			{
				id:700,
				name:"deleteEmailAccount - Verify it works.",
				requiredObjects:["Widget.Messaging.deleteEmailAccount"],
				addIf:supports.multipleEmailAccounts,
				instructions:[
					"Make sure you have at least ONE Email accounts configured.",
					"Click 'GO'."
				],
				test:function(t){
					var accounts = wm.getEmailAccounts();
					if (accounts.length<1){
						t.failure("At least one email account required to run test.");
					}
					wm.deleteEmailAccount(accounts[0].accountId);
					t.assertNotEqual(accounts.length, wm.getEmailAccounts().length);
				}
			},
			{
				id:800,
				name:"deleteEmailAccount - Throw INVALID_PARAMETER for invalid param.",
				requiredObjects:["Widget.Messaging.deleteEmailAccount"],
				addIf:supports.multipleEmailAccounts,
				test:function(t){
					try{
						wm.deleteEmailAccount("nix da INVALID");
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:900,
				name:"deleteEmailAccount - Throw INVALID_PARAMETER for no param.",
				requiredObjects:["Widget.Messaging.deleteEmailAccount"],
				addIf:supports.multipleEmailAccounts,
				test:function(t){
					try{
						wm.deleteEmailAccount();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:910,
				name:"deleteEmailAccount not supported - throw exception",
				requiredObjects:["Widget.Messaging.deleteEmailAccount"],
				addIf:!supports.multipleEmailAccounts,
				test:function(t){
					try{
						wm.deleteEmailAccount();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
		]
	});
})();
