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
					t.success(true);
				}
			},
			{
				id:2,
				name:"config info",
				test:function(t){
					if (config._meta.isCustomConfiguration){
						t.success(config._meta);
					}else{
						t.failure("Unconfigured, userAgent: " + window.navigator.userAgent);
					}
				}
			},
			
			//
			//
			//
			{
				id:100,
				name:"config.validAddressBookItemId - possible value (fullName=null)",
				test:function(t){
					var addr = new pim.AddressBookItem();
					addr.setAttributeValue("fullName", null);
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
					pim.onAddressBookItemsFound = null;
				}
			},
			{
				id:105,
				name:"config.validAddressBookItemId - possible value (fullName=*)",
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
					pim.onAddressBookItemsFound = null;
				}
			},
			{
				id:110,
				name:"config.validAddressBookItemId - current value",
				test:function(t){
					var val = config.validAddressBookItemId;
					t[val ? "success" : "failure"](val);
				}
			},
			{
				id:120,
				name:"config.validAddressBookItemId - Item is an instance of AddressBookItem?",
				test:function(t){
					var item = Widget.PIM.getAddressBookItem(config.validAddressBookItemId);
					t.assertTrue(item instanceof Widget.PIM.AddressBookItem);
				}
			},
			{
				id:200,
				name:"config.validCalendarItemId - possible value (eventName=null)",
				test:function(t){
					var item = new pim.CalendarItem();
					item.eventName = null;
					Widget.PIM.onCalendarItemsFound = function(items){
						if (items.length==0){
							t.failure("No items found :(");
						} else {
							var ids = [];
							for (var i=0; i<items.length; i++){
								ids.push(items[i].calendarItemId);
								if (i>10) break; // 10 at most
							}
							t.success("Some valid IDs: "+ ids.join(", "));
						}
					}
					pim.findCalendarItems(item, 0, 1);
				},
				tearDown:function(){
					pim.onCalendarItemsFound = null;
				}
			},
			{
				id:205,
				name:"config.validCalendarItemId - possible value (eventName=*)",
				test:function(t){
					var item = new pim.CalendarItem();
					item.eventName = "*";
					Widget.PIM.onCalendarItemsFound = function(items){
						if (items.length==0){
							t.failure("No items found :(");
						} else {
							var ids = [];
							for (var i=0; i<items.length; i++){
								ids.push(items[i].calendarItemId);
								if (i>10) break; // 10 at most
							}
							t.success("Some valid IDs: "+ ids.join(", "));
						}
					}
					pim.findCalendarItems(item, 0, 1);
				},
				tearDown:function(){
					pim.onCalendarItemsFound = null;
				}
			},
			{
				id:210,
				name:"config.validCalendarItemId - current value",
				test:function(t){
					var val = config.validCalendarItemId;
					t[val ? "success" : "failure"](val);
				}
			},
			{
				id:220,
				name:"config.validCalendarItemId - Item is an instance of CalendarItem?",
				test:function(t){
					var item = Widget.PIM.getCalendarItem(config.validCalendarItemId);
					t.assertTrue(item instanceof Widget.PIM.CalendarItem);
				}
			},
//*/
		]
	});

})();