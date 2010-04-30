(function(){
	
	//
	// Test AJAX calls on various ports.
	//
	dohx.add({name:"Basics",
		mqcExecutionOrderBaseOffset:90000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:'window.Widget',
				test:function(t){
					t.assertTrue(!!window.Widget);
				}
			},{
				id:200,
				name:"window['Widget']",
				test:function(t){
					t.assertTrue(!!window['Widget']);
				}
			},{
				id:300,
				name:"Widget",
				test:function(t){
					t.assertTrue(!!Widget);
				}
			},{
				id:400,
				name:'typeof window!="undefined"',
				test:function(t){
					t.assertTrue(typeof window!="undefined");
				}
			},{
				id:500,
				name:'typeof Widget!="undefined"',
				test:function(t){
					t.assertTrue(typeof Widget!="undefined");
				}
			},{
				id:600,
				name:'typeof window.Widget!="undefined"',
				test:function(t){
					t.assertTrue(typeof window.Widget!="undefined");
				}
			},{
				id:700,
				name:'typeof window.widget!="undefined"',
				test:function(t){
					t.assertTrue(typeof window.widget!="undefined");
				}
			},{
				id:800,
				name:'Is "Widget" in window?',
				test:function(t){
					var hasWidget = false;
					for (var key in window){
						if (key=="Widget"){
							hasWidget = true;
							break;
						}
					}
					t.assertTrue(hasWidget);
				}
			},{
				id:900,
				name:'!!Widget.Device',
				test:function(t){
					t.assertTrue(!!Widget.Device);
				}
			},{
				id:1000,
				name:'!!window.Widget.Device',
				test:function(t){
					t.assertTrue(!!window.Widget.Device);
				}
			}
		]
	});
})();
