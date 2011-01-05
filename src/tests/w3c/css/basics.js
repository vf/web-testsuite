(function(){
	
	dohx.add({name:"CSS basics",
		mqcExecutionOrderBaseOffset:480000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
// TODO rename DIVs in here and in css.css using the test ID
			{
				id:100,
				name:"Selectors: nth-child",
				expectedResult:"Does the inner element have a white background color, and the outer element a red background color?",
				test:function(t){
					dohx.showInfo(	'<div id="test10">'+
										'<div id="test11">Outer element'+
										'<div id="test12">Inner element</div>'+
									'</div></div>');
				}
			},
			{
				id:200,
				name:"Selectors: + selector",
				expectedResult:"Does the element have a red background color?",
				test:function(t){
					dohx.showInfo('<div id="test20"></div><div id="test21">The element</div>');
				}
			},
			{
				id:300,
				name:"Selectors: + selector (2)",
				expectedResult:"Does 'The element' have a black background color?",
				test:function(t){
					dohx.showInfo('<div id="test20"></div><div id="test21">The element</div>');
					var insertPoint = document.getElementById('test20');
					var copy = insertPoint.cloneNode(true);
					copy.id = '';
					insertPoint.parentNode.insertBefore(copy,insertPoint.nextSibling);
				}
			},
			{
				id:400,
				name:"Selectors: ':last-child' selector",
				expectedResult:"Does the third item have a red background color?",
				test:function(t){
					dohx.showInfo(
								'<ul id="test400">'+
									'<li>First item</li><li>Second item</li><li>Third item</li>'+
								'</ul>'
					);
				}
			},
			{
				id:500,
				name:"Selectors: ':last-child' selector (2)",
				expectedResult:"Does the third item have a BLACK background color?",
				test:function(t){
					dohx.showInfo(
								'<ul id="test500">'+
									'<li>First item</li><li>Second item</li><li id="test500_1">Third item</li>'+
								'</ul>'
					);
					var root = document.getElementById('test500');
					var newLI = document.getElementById('test500_1').cloneNode(true);
					newLI.id = '';
					newLI.innerHTML = 'Fourth item';
					root.appendChild(newLI);
				}
			},
			{
				id:600,
				name:"Selectors: :disabled",
				expectedResult:"Is the text input red and is it NOT possible to write text into it?",
				test:function(t){
					dohx.showInfo('<input type="text" id="test40" disabled style="font-size:2em;">');
				}
			},
			{
				id:700,
				name:"Selectors: :checked",
				expectedResult:"Check the checkbox. Does it move to the right?",
				test:function(t){
					dohx.showInfo('<input type="checkbox" id="test41">');
				}
			},
			{
				id:800,
				name:"Selectors: attributes",
				expectedResult:"Does the first element have a red background color, and the second a black?",
				test:function(t){
					dohx.showInfo(
								'<div class="test50" align="right">The first element</div>'+
								'<div class="test50">The second element</div>'
					);
				}
			},
			{
				id:900,
				name:"Selectors: attributes",
				expectedResult:"Does this element have a red background and underlined text?",
				test:function(t){
					dohx.showInfo('<div class="test51 first">The element</div>');
				}
			},
			{
				id:1000,
				name:"Selectors: :nth-child",
				expectedResult:"Does this element have a red background and underlined text?",
				test:function(t){
					dohx.showInfo('<div class="test51 first">The element</div>');
				}
			},
			{
				id:1100,
				name:"Selectors: :nth-child(2n)",
				expectedResult:"Do the second and fourth items have a red background?",
				test:function(t){
					dohx.showInfo(
								'<ul id="test60">'+
									'<li>First item</li><li>Second item</li>'+
									'<li>Third item</li><li>Fourth item</li>'+
								'</ul>'
					);
				}
			},
			{
				id:1200,
				name:"Selectors: :nth-child(2n)",
				expectedResult:"Do the first and third items now have a black background color?",
				test:function(t){
					dohx.showInfo(
								'<ul id="test60">'+
									'<li>First item</li><li>Second item</li>'+
									'<li>Third item</li><li>Fourth item</li>'+
								'</ul>'
					);
					var wr = document.getElementById('test60');
					var newLI = document.createElement('li');
					newLI.innerHTML = 'The zeroth item';
					wr.insertBefore(newLI,wr.firstChild);
					return false;
				}
			},
			
			{
				id:2000,
				name:"Selectors: overflow:auto",
				expectedResult:"Can you scroll the element?",
				test:function(t){
					dohx.showInfo('<div id="test2000">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2100,
				name:"background-position: local (ONLY to be done if overflow: auto is supported)",
				expectedResult:"Scroll the element. Does the image scroll with the element?",
				test:function(t){
					dohx.showInfo('<div id="test2100">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2200,
				name:"multiple background images",
				expectedResult:"Do you see two images in the element?",
				test:function(t){
					dohx.showInfo('<div id="test112">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2300,
				name:"border-radius",
				expectedResult:"Does the element have rounded corners?",
				test:function(t){
					dohx.showInfo('<div id="test2300">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2400,
				name:"rgba colors",
				expectedResult:"Is the text red?",
				test:function(t){
					dohx.showInfo('<div id="test114">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2500,
				name:"hsla colors",
				expectedResult:"Is the text red?",
				test:function(t){
					dohx.showInfo('<div id="test115">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2600,
				name:"outline",
				expectedResult:"Does the element have a red border?",
				test:function(t){
					dohx.showInfo('<div id="test2600">'+
						'This is the element<br>This is the element<br>This is the element<br>'+
						'This is the element<br>This is the element<br>This is the element<br>'+
					'</div>');
				}
			},
			{
				id:2700,
				name:"letter-spacing",
				expectedResult:"Are the letters in the second line farther apart than in the first?",
				test:function(t){
					dohx.showInfo('<div id="test2700">'+
						'This is the element<p>This is the element</p>'+
					'</div>');
				}
			},
			{
				id:2800,
				name:"word-spacing",
				expectedResult:"Are the words in the second line farther apart than in the first?",
				test:function(t){
					dohx.showInfo('<div id="test2800">'+
						'This is the element<p>This is the element</p>'+
					'</div>');
				}
			}
//*/
		]
	});

})();