(function(){
	// Check the config stuff we need for the tests.
	if (!util.isConfigured(["validAddressBookItemId"])){
		return;
	}
	
	var pim = util.isObject("Widget.PIM") ? Widget.PIM : {};
	
	dohx.add({name:"AddressBook",
		mqcExecutionOrderBaseOffset:380000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
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
					"Make sure at least 100 address book items exist!"
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			},
			
			//
			//
			//
			{
				id:100,
				name:"findAddressBookItems - Fast enough? (Find 100 items in less than 500ms)",
				requiredObjects:["Widget.PIM.findAddressBookItems"],
				timeout: 10 * 1000,
				test:function(t){
					var numAddresses = pim.getAddressBookItemsCount();
					if (pim.getAddressBookItemsCount()<100){
						t.failure("Not enough items for performance testing. At least 100 items expected (" + numAddresses + " found).");
						return;
					}
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "*");
					var started = new Date().getTime();
					Widget.PIM.onAddressBookItemsFound = function(items){
						var duration = new Date().getTime() - started;
						var result = items.length + " items found in " + duration/1000 +"s";
						var maxMs = 500; // The max number of ms 
						if (duration < maxMs){
							t.success(result);
						} else {
							t.failure(result + " - " + (duration-maxMs)/1000 + "ms to slow");
						}
					}
					pim.findAddressBookItems(addr, 0, 100);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
			},
//*/
		]
	});

})();