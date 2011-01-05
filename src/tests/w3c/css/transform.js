(function(){
	
	__toggleActive = function(obj){
		if (/active/.test(obj.className)) {
			obj.className = obj.className.replace(/active/,'');
		}else{
			obj.className += ' active';
		}
	}

	
	dohx.add({name:"CSS transforms",
		mqcExecutionOrderBaseOffset:490000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Basics",
				expectedResult:"Touch the test element. Does it change?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test100" onclick="__toggleActive(this)">This is a transform test for rotate</div>'
					);
				}
			},
			{
				id:200,
				name:"Scale",
				expectedResult:"Touch the test element. Does it change?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test200" onclick="__toggleActive(this)">This is a transform test for scale</div>'
					);
				}
			},
			{
				id:300,
				name:"Skew",
				expectedResult:"Touch the test element. Does it change?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test300" onclick="__toggleActive(this)">This is a transform test for skew</div>'
					);
				}
			},
			{
				id:400,
				name:"Translate",
				expectedResult:"Touch the test element. Does it change?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test400" onclick="__toggleActive(this)">This is a transform test for translate</div>'
					);
				}
			},
			{
				id:500,
				name:"Multiple values",
				expectedResult:"Touch the test element. Does it change?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test500" onclick="__toggleActive(this)">This is a transform test for multiple values</div>'
					);
				}
			},
			{
				id:600,
				name:"Transform origin",
				expectedResult:"Touch the test element. Does it rotate around its upper right corner?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test600" onclick="__toggleActive(this)">This is a transform test for transform-origin</div>'
					);
				}
			}
//*/
		]
	});

})();