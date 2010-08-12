(function(){
	// Check the config stuff we need for the tests.
	if (!util.isConfigured(["validAddressBookItemId"])){
		return;
	}
	
	var pim = util.isObject("Widget.PIM") ? Widget.PIM : {};
	var addressProperties = ["address", "addressBookItemId", "company", "eMail", "fullName", "homePhone", "mobilePhone", "title", "workPhone"];
	var _testGroupName; // Will be filled by the tests, since multiple tests use it, its defined here.
	var _testFullName;
	
	function _getAddressInfo(info){
// TODO just here because iterating over the props doesnt work, using toJson()
		var ret = [];
		if (!info || typeof info!="object"){
			throw new Error("Expected object, got: '" + info + "' (type: " + (typeof info) +")");
		}
		for (var i=0, l=addressProperties.length; i<l; i++){
			var p = addressProperties[i];
			ret.push(p+": "+util.toJson(info[p]));
		}
		return ret.join(", ");
	}
	
	dohx.add({name:"AddressBook",
		mqcExecutionOrderBaseOffset:20000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.PIM"],
		tests:[
			//
			// Preconditions
			//
			{
				id:1,
				name:"Verify Preconditions",
				instructions:[
					"Make sure all the preconditions listed are met. They will be required by upcoming tests.",
					"The very first contact added on an H2 will have the ID=1.",
					"Click 'GO' to start testing."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			},
			//
			//	getAddressBookItem
			//
			{
				id:100,
				requiredObjects:["Widget.PIM.getAddressBookItem", "Widget.PIM.AddressBookItem"],
				name:"[1] getAddressBookItem - Get the one with ID "+ config.validAddressBookItemId +".",
				instructions:[
					"Make sure an address book item with the ID " + util.toJson(config.validAddressBookItemId) + " exists.",
					"Press 'GO'."
				],
				test:function(t){
					var item = pim.getAddressBookItem(config.validAddressBookItemId);
					t.assertTrue(item instanceof pim.AddressBookItem);
					return _getAddressInfo(item);
				}
			},
			{
				id:200,
				requiredObjects:["Widget.PIM.getAddressBookItem", "Widget.PIM.AddressBookItem"],
				name:"getAddressBookItem - Verify values.",
				expectedResult:"Are the shown values correct?",
				test:function(t){
					dohx.showInfo(_getAddressInfo(pim.getAddressBookItem(config.validAddressBookItemId)));
				}
			},
			{
				id:300,
				name:"getAddressBookItem - Verify returned 'AddressBookItem' object.",
// fails if e.g. one value is not given, then the property is missing.... what does the spec say????? not found yet
				requiredObjects:["Widget.PIM.getAddressBookItem"],
				test:function(t){
					var item = pim.getAddressBookItem(config.validAddressBookItemId)
					var check = util.checkProperties(item, addressProperties);
					t.assertTrue(check.missing.length==0, "Missing properties: " + check.missing.join(", ") + "!");
					return _getAddressInfo(item);
				}
			},

			//
			//	getAddressBookItemsCount
			//
			{
				id:400,
				name:"getAddressBookItemsCount - Verify it returns a number.",
				requiredObjects:["Widget.PIM.getAddressBookItemsCount"],
				test:function(t){
					var v = pim.getAddressBookItemsCount();
					t.assertTrue(util.isNumber(v), "'"+v+"' is not a number.");
					return v;
				}
			},
			{
				id:500,
				name:"getAddressBookItemsCount - Verify it returns the right number.",
				requiredObjects:["Widget.PIM.getAddressBookItemsCount"],
				instructions:[
					"Look up the number of contacts you have in your address book!",
					"Click 'GO'."
				],
				expectedResult:'Is this the number of contacts in your addressbook?',
				test:function(t){
					dohx.showInfo("API reports "+pim.getAddressBookItemsCount()+" items found.");
				}
			},
			//
			//	findAddressBookItems
			//
			{
				id:600,
				name:"findAddressBookItems - Verify it returns an array.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				timeout: 10 * 1000,
				test:function(t){
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "*");
					Widget.PIM.onAddressBookItemsFound = function(items){
						t.assertTrue(util.isArray(items), "Return value is not an array.");
						t.result = items.length + " items found. " + util.toJson(items.slice(0, 5));
					}
					pim.findAddressBookItems(addr, 0, 10);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
			},
			{
				id:700,
				name:"findAddressBookItems - Search for 'ab*'.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				instructions:[
					"Make sure a contact who's name starts with 'ab' is in your addressbook.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test:function(t){
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "ab*");
					Widget.PIM.onAddressBookItemsFound = function(items){
						t.assertTrue(items.length > 0);
						t.result = items.length ? _getAddressInfo(items[0]) : "No items found.";
					}
					pim.findAddressBookItems(addr, 0, 10);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
			},
			{
				id:800,
				name:"findAddressBookItems - If either startInx/endInx is negative throw exception.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				timeout:5*1000,
				test:function(t){
					try{
						pim.findAddressBookItems(new pim.AddressBookItem(), -1, -2);
						t.failure("Expected exception to be thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:900,
				name:"findAddressBookItems - If startInx==endInx return only one item.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				instructions:[
					"Make sure you have at least one address in your address book!",
					"Click 'GO'."
				],
				timeout:5*1000,
				test:function(t){
					pim.onAddressBookItemsFound = function(items) {
						t.assertTrue(items.length==1, "Number of items returned is not 1 but "+items.length+".");
						t.result = _getAddressInfo(items[0]);
					}
					pim.findAddressBookItems(new pim.AddressBookItem(), 0, 0);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
			},
			//
			//	getAvailableAddressGroupNames()
			//
			{
				id:1000,
				name:"getAvailableAddressGroupNames - verify its an array.",
				requiredObjects:["Widget.PIM.getAvailableAddressGroupNames"],
				test:function(t){
					var groups = pim.getAvailableAddressGroupNames();
					t.assertTrue(util.isArray(groups), "Expected array.");
					return groups;
				}
			},
			//
			//	createAddressBookGroup
			//
			{
				id:1100,
				name:"createAddressBookGroup - verify group is added.",
				requiredObjects:["Widget.PIM.getAvailableAddressGroupNames", "Widget.PIM.createAddressBookGroup"],
				test:function(t){
					var numItems = pim.getAvailableAddressGroupNames().length;
					_testGroupName = "TestGroup-" + new Date().getTime(); // Prevent nameclashes
					pim.createAddressBookGroup(_testGroupName);
					var newNumItems = pim.getAvailableAddressGroupNames().length;
					t.assertTrue(newNumItems-numItems==1, "Adding new address group failed.");
					return newNumItems;
				}
			},
			{
				id:1200,
				name:"createAddressBookGroup - throw INVALID_PARAMETER",
				requiredObjects:["Widget.PIM.createAddressBookGroup"],
				test:function(t){
					try{
						pim.createAddressBookGroup();
						t.failure("Expected INVALID_PARAMETER exception.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			//
			//	deleteAddressBookGroup
			//
			{
				id:1300,
				name:"deleteAddressBookGroup",
				requiredObjects:["Widget.PIM.getAvailableAddressGroupNames", "Widget.PIM.createAddressBookGroup"],
				test:function(t){
					var numItems = pim.getAvailableAddressGroupNames().length;
					pim.deleteAddressBookGroup(_testGroupName);
					var newNumItems = pim.getAvailableAddressGroupNames().length;
					t.assertTrue(numItems-newNumItems==1, "Deleting address group failed.");
					return newNumItems;
				}
			},
			{
				id:1400,
				name:"deleteAddressBookGroup - throw INVALID_PARAMETER",
				requiredObjects:["Widget.PIM.deleteAddressBookGroup"],
				test:function(t){
					try{
						pim.deleteAddressBookGroup();
						t.failure("Expected INVALID_PARAMETER exception.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			//
			//	addAddressBookItem
			//
			{
				id:1500,
				name:"addAddressBookItem",
				requiredObjects:["Widget.PIM.addAddressBookItem"],
				test:function(t){
					var uniqueString = new Date().getTime();
					var addr = new pim.AddressBookItem();
					_testFullName = "test Contact " + uniqueString;
					addr.setAttributeValue("fullName", _testFullName);
					addr.setAttributeValue("address", "test Address " + uniqueString);
					pim.addAddressBookItem(addr);
					t.success("Didn't throw an exception.");
				}
			},
			{
				id:1600,
				name:"addAddressBookItem - Verify just added item.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				test:function(t){
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", _testFullName);
					Widget.PIM.onAddressBookItemsFound = function(items){
						t.assertTrue(items.length==1);
						t.result = _getAddressInfo(items[0]);
					}
					pim.findAddressBookItems(addr, 0, 10);
				}
			},
			{
				id:1700,
				name:"addAddressBookItem - throw INVALID_PARAMETER",
				requiredObjects:["Widget.PIM.addAddressBookItem"],
				test:function(t){
					try{
						pim.addAddressBookItem()
						t.failure("Expected INVALID_PARAMETER exception.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			}
//*/
		]
	});

})();