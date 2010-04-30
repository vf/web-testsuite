(function(){
	
	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmm = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	
	function valuesToString(){
	}
  
	dohx.add({name:"Messaging",
		mqcExecutionOrderBaseOffset:200000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Messaging"],
		tests:[
			//
			//	createMessage
			//
			{
				id: 100,
				name: "Create SMS.",
				test: function(t) {
					var msg = wm.createMessage(wmm.SMSMessage);
				}
			},
			{
				id: 200,
				name: "Create EMail.",
				test: function(t) {
					var msg = wm.createMessage(wmm.EmailMessage);
				}
			},
			{
				id: 300,
				name: "Create MMS.",
				test: function(t) {
					var msg = wm.createMessage(wmm.MMSMessage);
				}
			},
			{
				id: 400,
				name: "Throws UNSUPPORTED Exception?",
				test: function(t) {
				}
			},
			{
				id: 500,
				name: "Throws SECURITY Exception?",
				test: function(t) {
				}
			},
			{
				id: 600,
				name: "Throws INVALID_PARAMETER Exception?",
				test: function(t) {
				}
			}
		]
	});
})();
