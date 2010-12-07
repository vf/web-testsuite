(function(){
	
	dohx.add({name:"update0",
		mqcExecutionOrderBaseOffset:390000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Updatable widget version 0",
				instructions:[
					"Make sure you have version 1 available on the server.",
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