(function(){
	
	dohx.add({name:"update1",
		mqcExecutionOrderBaseOffset:400000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Updatable widget version 1",
				instructions:[
					"Make sure you have version 2 available on the server.",
					"Close this widget",
					"Reopen it, it should get updated"
				],
				test:function(t){
					widget.update();
					t.success("Please reopen this widget!");
				}
			}
		]
	});
})();