(function(){
	// Check the config stuff we need for the tests.
	//if (!util.isConfigured(["validAddressBookItemId"])){
	//	return;
	//}
	
	var pim = util.isObject("Widget.PIM") ? Widget.PIM : {},
		addressProperties = ["address", "addressBookItemId", "company", "eMail", "fullName", "homePhone", "mobilePhone", "title", "workPhone"];
	
	function showAddressInfo(info){
// TODO just here because iterating over the props doesnt work, using toJson()
		var ret = [];
		for (var i=0, l=addressProperties.length; i<l; i++){
			var p = addressProperties[i];
			ret.push(p+": "+util.toJson(info[p]));
		}
		return ret.join(", ");
	}
	
	dohx.add({name:"AddressBookItem - Methods",
		mqcExecutionOrderBaseOffset:10000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.PIM.AddressBookItem"],
		tests:[
			{
				id:100,
				name:"get/setAttributeValue() - Verify it's callable and sets the property correct.",
				test:function(t){
					var item = new pim.AddressBookItem();
					item.setAttributeValue("fullName", "a*");
					t.assertEqual("a*", item.getAttributeValue("fullName"));
				}
			},{
				id:200,
				name:"getAttributeValue() - Verify returns undefined for non-assigned attribute.",
				test:function(t){
					var item = new pim.AddressBookItem();
					var ret = item.getAttributeValue("foobars_brother");
					// Spec 1.2.1 says:
					// This should be undefined if the 
					// addressBookItem has no value assigned for the attribute. Note, however, that 
					// under some implementations a null or empty string ("") value may also be 
					// returned for unassigned attribute values. 
					t.assertTrue(typeof ret=="undefined" || ret===null || ret==="");
				}
			},{
				id:300,
				name:"getAddressGroupNames() - Verify it returns an array.",
				test:function(t){
					var item = pim.getAddressBookItem(config.validAddressBookItemId);
					t.assertTrue(doh.util.isArray(item.getAddressGroupNames()));
				}
			},{
				id:400,
				name:"getAddressGroupNames() - Verify content.",
				instructions:"Click 'GO'.",
				expectedResult:"Are the shown group names correct?",
				test:function(t){
					var item = pim.getAddressBookItem(config.validAddressBookItemId);
					dohx.showInfo("Address group names: ", item.getAddressGroupNames().join(", "));
				}
			},{
				id:500,
				name:"getAvailableAttributes() - Verify it's an array.",
				test:function(t){
					var item = new pim.AddressBookItem();
					t.assertTrue(doh.util.isArray(item.getAvailableAttributes()));
				}
			},{
				id:600,
				name:"getAddressGroupNames() - Verify content.",
				instructions:[
					"Find out all possible attributes a contact can have.",
					"Click 'GO'."
				],
				expectedResult:"Are those all possible attributes?",
				test:function(t){
					var item = new pim.AddressBookItem();
					dohx.showInfo("Reported attributes are: ", item.getAvailableAttributes().join(", "));
				}
			}
		]
	});

	dohx.add({name:"AddressBook methods of 'Widget.PIM'",
		mqcExecutionOrderBaseOffset:20000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.PIM"],
		tests:[
//			{
//				id:500,
//				name:"addAddressBookItem - verify return value",
//				requiredObjects:["Widget.PIM.addAddressBookItem"],
//				test:function(t){
//					var item = new pim.AddressBookItem();
//					item.startTime = new Date ('2008-10-23');;
//					item.eventName = "Meeting";
//					var ret = pim.addCalendarItem(item);
//					t.assertEqual(undefined, ret);
//					
////var myContact = new Widget.PIM.AddressBookItem();
////     myContact.setAttributeValue("mobilePhone", "555555555555");
////     Widget.PIM.addAddressBookItem(myContact); 
//				}

			{
				id:600,
				name:"[1] getAddressBookItem - Get the one with ID "+ config.validAddressBookItemId +".",
				instructions:[
					"Make sure an address book item with the ID " + util.toJson(config.validAddressBookItemId) + " exists.",
					"Press 'GO'."
				],
				requiredObjects:[
					"Widget.PIM.getAddressBookItem",
					"Widget.PIM.AddressBookItem"
				],
				test:function(t){
					var item = pim.getAddressBookItem(config.validAddressBookItemId);
					t.assertTrue(item instanceof pim.AddressBookItem);
					return showAddressInfo(item);
				}
			},{
				id:700,
				name:"[2] getAddressBookItem - Verify returned 'AddressBookItem' object.",
				requiredObjects:["Widget.PIM.getAddressBookItem"],
				test:function(t){
					var item = pim.getAddressBookItem(config.validAddressBookItemId)
					var check = util.checkProperties(item, addressProperties);
					t.assertTrue(check.missing.length==0, "Missing properties: " + check.missing.join(", ") + "!");
					return showAddressInfo(item);
				}
			},

			//
			//	getAddressBookItemsCount
			//
			{
				id:800,
				name:"getAddressBookItemsCount - Verify it returns a number.",
				requiredObjects:["Widget.PIM.getAddressBookItemsCount"],
				test:function(t){
					var v = pim.getAddressBookItemsCount();
					t.assertTrue(util.isNumber(v), "'"+v+"' is not a number.");
					return v;
				}
			},
			{
				id:810,
				name:"getAddressBookItemsCount - Verify it returns a number.",
				requiredObjects:["Widget.PIM.getAddressBookItemsCount"],
				instructions:[
					"Look up the number of contacts you have in your address book!",
					"Click 'GO'."
				],
				expectedResult:'Is the number correct?',
				test:function(t){
					dohx.showInfo("Number of addressbook items found: "+pim.getAddressBookItemsCount()+".");
				}
			},
			//
			//	findAddressBookItems
			//
			{
				id:900,
				name:"findAddressBookItems - Verify it returns an array.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				timeout: 10 * 1000,
				test:function(t){
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "*a*");
					Widget.PIM.onAddressBookItemsFound = function(items){
						t.assertTrue(util.isArray(items), "Return value is not an array.");
						t.result = items.length + " items found. " + util.toJson(items.slice(0, 5));
//t.result = showAddressInfo(items[0]);
					}
					pim.findAddressBookItems(addr, 0, 10);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}

/*buggy :-(
			},{
				id:1000,
				name:"findAddressBookItems - If either startInx/endInx is negative return empty array.",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				timeout:5*1000,
				test:function(t){
					pim.onAddressBookItemsFound = function(items) {
						t.assertTrue(items.length==0, "Number of items returned is not 0 but "+items.length+".");
					}
					pim.findAddressBookItems(new pim.AddressBookItem(), -1, -2);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
			},{
				id:1100,
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
						t.result = items;
					}
					pim.findAddressBookItems(new pim.AddressBookItem(), 0, 0);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
*/
			}
/*
Possible tests (as defined in the spec., text copied form spec)
* If startInx is greater than endInx in PIM_findAddressBookItems function, the returned addressBookItemsFound will be an empty array.
* If startInx is greater than the number of found items in PIM_findAddressBookItems function, the returned addressBookItemsFound will be an empty array.
* If endInx is greater than the number of found items in PIM_findAddressBookItems function, the returned addressBookItemsFound will contain items bwteeen startInx and the last returned item inclusively.

*/
		]
	});

})();