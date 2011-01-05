(function(){
	
	__toggleActive = function(obj){
		if (/active/.test(obj.className)) {
			obj.className = obj.className.replace(/active/,'');
		}else{
			obj.className += ' active';
		}
	}

	
	dohx.add({name:"CSS transitions",
		mqcExecutionOrderBaseOffset:500000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Basics",
				expectedResult:"Touch the test element. Does it change?",
				test:function(t){
					dohx.showInfo(
						'<div class="transition" onclick="__toggleActive(this)" id="test100">This element should move</div>'
					);
				}
			},
//			{
//				id:200,
//				name:"animationstart event",
//				instructions:["Touch the element."],
//				test:function(t){
//					dohx.showInfo(
//						'<div class="transition" onclick="__toggleActive(this)" id="test200">This element should move</div>'
//					);
//window.onanimationstart =
//  window.onanimationiteration =
//  window.onanimationend =
//  window.ontransitionend = function (e) {
//	console.log('Pure ' + e.type);
//}
//				}
//			},
//*/
		]
	});

})();