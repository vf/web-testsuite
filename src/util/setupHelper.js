(function(){
	var pim = util.isObject("Widget.PIM") ? Widget.PIM : {};
	
	dohx.add({name:"AddressBook",
		tests:[
			//
			// Preconditions
			//
			{
				id:1,
				name:"Helper Widget",
				instructions:[
					"This widget will show some relevant information which you might need to configure your test widget(s) properly.",
				],
				test:function(t){
					t.success();
				}
			},
			
			//
			//
			//
			{
				id:100,
				name:"config.validAddressBookItemId",
				test:function(t){
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", "*");
					Widget.PIM.onAddressBookItemsFound = function(items){
						if (items.length==0){
							t.failure("No items found :(");
						} else {
							var ids = [];
							for (var i=0; i<items.length; i++){
								ids.push(items[i].addressBookItemId);
								if (i>10) break; // 10 at most
							}
							t.success("Some valid IDs: "+ ids.join(", "));
						}
					}
					pim.findAddressBookItems(addr, 0, 1);
				},
				tearDown:function(){
					delete pim.onAddressBookItemsFound;
				}
			},
//*/
		]
	});

})();