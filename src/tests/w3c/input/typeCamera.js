(function(){

	dohx.add({name:"Number inputs (type=file, capture=camera)",
		mqcExecutionOrderBaseOffset:900000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Camera input?.",
				definedInSpecs:[""],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Did a camera input open?",
				test:function(t){
					dohx.showInfo('<form><input type="file" accept="image/*" capture="camera" id="capture"></form>');
				}
			},
//*/
		]
	});
})();
