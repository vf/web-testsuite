(function(){
	// Check the config stuff we need for the tests.
	if (!util.isConfigured(["validCalendarItemId"])){
		return;
	}
	
	var pim = util.isObject("Widget.PIM") ? Widget.PIM : {},
		calendarProperties = ["alarmDate", "alarmed", "calendarItemId", "eventEndTime", "eventName", "eventNotes", "eventRecurrence", "eventStartTime"];
	
	function showCalendarInfo(info){
// TODO just here because iterating over the props doesnt work, using toJson()
		var ret = [];
		for (var i=0, l=calendarProperties.length; i<l; i++){
			var p = calendarProperties[i];
			ret.push(p+": "+util.toJson(info[p]));
		}
		return ret.join(", ");
	}
	
	dohx.add({name:"Calendar",
		mqcExecutionOrderBaseOffset:100000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.PIM"],
		tests:[
			{
				id:100,
				name:"update - Verify the method call works at all.",
				//requiredObjects:[
				//	"Widget.PIM.CalendarItem.prototype.update"
				//],
				test:function(t){
					var cal = new pim.CalendarItem();
					cal.eventName = "Foo";
//do add b4
					cal.update();
					t.success("Execution successful.");
				}
			},
			{
				id:200,
				name:"[1] addCalendarItem - Verify return value 'undefined'.",
				requiredObjects:["Widget.PIM.addCalendarItem"],
				test:function(t){
					var item = new pim.CalendarItem();
					item.startTime = new Date();
					item.eventName = "Meeting";
					var ret = pim.addCalendarItem(item);
					t.assertEqual(undefined, ret);
				}
			},{
				id:300,
				name:"[2] findCalendarItems/onCalendarItemsFound - Find the just added item, at least.",
				requiredObjects:["Widget.PIM.findCalendarItems"],
				test:function(t){
					pim.onCalendarItemsFound = function(found){
						t.assertTrue(found.length>=1, "Only " + found.length + " items found.");
						t.result = found.length+" items found, " + util.toJson(found);
					}
					var item = new pim.CalendarItem();
					item.eventName = "Meeting";
					var ret = pim.findCalendarItems(item, 0, 10);
				},
				tearDown:function(){
					delete pim.onCalendarItemsFound;
				}
			},{
				id:400,
				name:"[3] findCalendarItems/onCalendarItemsFound - Verify returned object's are of type 'Widget.PIM.CalendarItem'.",
				requiredObjects:["Widget.PIM.findCalendarItems"],
				test:function(t){
					pim.onCalendarItemsFound = function(found){
						if (found.length==0){
							t.failure("No items found.");
						} else {
							for (var i=0, l=found.length; i<l; i++){
								if (!(found[i] instanceof Widget.PIM.CalendarItem)){
									t.failure("Item of wrong type found. (i="+i+")");
								}
							}
							t.success("All items' types OK.");
						}
					}
					var item = new pim.CalendarItem();
					item.eventName = "Meeting";
					var ret = pim.findCalendarItems(item, 0, 10);
				},
				tearDown:function(){
					delete pim.onCalendarItemsFound;
				}
			},{
				id:500,
				name:"[4] findCalendarItems/onCalendarItemsFound - Verify the returned object's properties.",
				requiredObjects:["Widget.PIM.findCalendarItems"],
				test:function(t){
					pim.onCalendarItemsFound = function(found){
						if (found.length==0){
							t.failure("No items found.");
						} else {
							var check = util.checkProperties(found[0], calendarProperties);
							t.assertTrue(check.missing.length==0, "Missing properties: " + check.missing.join(", ") + "!");
							t.result = showCalendarInfo(found[0]);
						}
					}
					var item = new pim.CalendarItem();
					item.eventName = "Meeting";
					var ret = pim.findCalendarItems(item, 0, 10);
				},
				tearDown:function(){
					delete pim.onCalendarItemsFound;
				}
			},{
				id:600,
				name:"findCalendarItems/onCalendarItemsFound - Search with wildcard!",
				requiredObjects:["Widget.PIM.findCalendarItems"],
				instructions:[
					'Look up your calendar, make sure you have at least one item in there (add one if necessary).',
					"Press 'GO' to start test."
				],
				test:function(t){
					pim.onCalendarItemsFound = function(found){
						t.assertFalse(found.length==0, found.length + ' items found.');
						t.result = found.length + ' items found. ' + util.toJson(found.slice(0, 3)); // Show max of three results.
					}
					var item = new pim.CalendarItem();
					item.eventName = "*";
					var ret = pim.findCalendarItems(item, 0, 10);
				},
				tearDown:function(){
					delete pim.onCalendarItemsFound;
				}
			},{
				id:700,
				name:"findCalendarItems/onCalendarItemsFound - Verify accessing found object's property directly (e.g. item.eventName).",
				requiredObjects:["Widget.PIM.findCalendarItems"],
				test:function(t){
					pim.onCalendarItemsFound = function(items){
						if (items.length==0){
							throw new Error("No calendar item found, can't execute test.");
						}
						var item = items[0],
							missingProps = [];
						for (var i=0, l=calendarProperties.length, c; i<l; i++){
							c = calendarProperties[i];
							if (typeof item[c]=="undefined"){
								missingProps.push(c);
							}
						}
						if (missingProps.length){
							t.failure("Properties missing: " + missingProps.join(', '));
						} else {
							t.success("All properties found.");
						}
					}
					var item = new pim.CalendarItem();
					item.eventName = "*";
					var ret = pim.findCalendarItems(item, 0, 10);
				},
				tearDown:function(){
					delete pim.onCalendarItemsFound;
				}
			},{
				id:800,
				name:"[1] getCalendarItem - Get the one with ID "+ config.validCalendarItemId +".",
				requiredObjects:["Widget.PIM.getCalendarItem"],
				test:function(t){
					var item = pim.getCalendarItem(config.validCalendarItemId)
					t.assertTrue(item instanceof pim.CalendarItem);
					return showCalendarInfo(item);
				}
			},{
				id:900,
				name:"[2] getCalendarItem - Verify returned 'CalendarItem' object.",
				requiredObjects:["Widget.PIM.getCalendarItem"],
				test:function(t){
					var item = pim.getCalendarItem(config.validCalendarItemId)
					if (!item){
						throw new Error("Error reading calendar item with ID="+config.validCalendarItemId);
					}
					var check = util.checkProperties(item, calendarProperties);
					t.assertTrue(check.missing.length==0, "Missing properties: " + check.missing.join(", ") + "!");
					return showCalendarInfo(item);
				}
			},{
				id:1000,
				name:"getCalendarItems - Does it return an array for all events in " + (new Date().getFullYear()) + "!",
				requiredObjects:["Widget.PIM.getCalendarItems"],
				test:function(t){
					var year = new Date().getFullYear();
					var items = pim.getCalendarItems(new Date(year, 0, 1), new Date(year, 11, 1));
					t.assertTrue(util.isArray(items), "Return value is no array.");
					return items.slice(0, 5);
				}
//			},{
//				id:1100,
//				name:"deleteCalendarItem(<String> calendarId)",
//				test:function(){
//TODO test not yet implemented
//				}
//			},{
//				id:1200,
//				name:"findCalendarItems(<CalendarItem> itemToMatch, <Number> startInx, <Number> endInx)",
//				test:function(){
//TODO test not yet implemented
//				}
//			},{
//				id:1300,
//				name:"onCalendarItemAlert(calendarItem)",
//				test:function(){
//TODO test not yet implemented
//				}
//			},{
//				id:1400,
//				name:"onCalendarItemsFound(<Array> calendarItemsFound)",
//				test:function(){
//TODO test not yet implemented
//				}
			}
		]
	});
	
	//
	//	Add the recurrence tests in a loop, since they are all the same tests
	//	we can just write it once and add the same parametrized test in a loop.
	//
//h2 doesnt support all types, add a config.cal.availreoccurencetypes
	var recurTypes = [
		{name:'DAILY', id:3000},
		{name:'NOT_REPEAT', id:3100},
		{name:'EVERY_WEEKDAY', id:3200},
		{name:'MONTHLY_ON_DAY', id:3300},
		{name:'MONTHLY_ON_DAY_COUNT', id:3400},
		{name:'WEEKLY_ON_DAY', id:3500},
		{name:'YEARLY', id:3600}
	];
	for (var i=0, l=recurTypes.length, rType; i<l; i++){
		(function(rType){
			var rTypeLower = rType.name.toLowerCase();
			// The actual test.
			dohx.add({name:"Calendar",
				mqcExecutionOrderBaseOffset:100000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
				requiredObjects:["Widget.PIM"],
				tests:[
					{
						id:rType.id,
						name:"EventRecurrenceTypes - Verify recurrence type '" + rType.name + "'.",
						requiredObjects:[
							"Widget.PIM.findCalendarItems",
							"Widget.PIM.EventRecurrenceTypes."+rType.name
						],
						instructions:[
							"Create an event with the name 'recurring " + rTypeLower + "'!",
							"Set the event to occur " + rType.name + "!",
							"Click 'GO'!"
						],
						timeout:5*1000,
						test:function(t){
							pim.onCalendarItemsFound = function(items){
								if (items.length==0){
									throw new Error("Calendar item not found, can't execute test.");
								}
								var item = items[0];
								t.assertEqual(pim.EventRecurrenceTypes[rType.name], item.eventRecurrence);
								t.result = showCalendarInfo(item);
							}
							var item = new pim.CalendarItem();
							item.eventName = "recurring "+rTypeLower;
							var ret = pim.findCalendarItems(item, 0, 10);
						},
						tearDown:function(){
							delete pim.onCalendarItemsFound;
						}
					}
				]
			});
		})(recurTypes[i]);
	}

})()