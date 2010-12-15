(function(){
	
	var externalImageUrl = "http://philstar.de/vf/test.png";
	
	dohx.add({name:"Missing &lt;access /&gt; tags completely.",
		mqcExecutionOrderBaseOffset:450000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Use &lt;img src&gt; to load an external resource.",
				expectedResult:"The image should NOT have loaded, was that the case?",
				test:function(t){
					dohx.showInfo('<img src="' + externalImageUrl + '" alt="external image" width="100">');
				}
			},
			{
				id:200,
				name:"Use 'new Image()' to load an external resource.",
				expectedResult:"The image should NOT have loaded, was that the case?",
				test:function(t){
					dohx.showInfo('Loading ...<div id="_imgSrc_"></div>');
					var img = new Image();
					img.src = externalImageUrl;
					img.width = "100";
					setTimeout(function(){ // Let the showInfo() generate the DIV.
						var el = util.byId("_imgSrc_");
						el.appendChild(img);
					}, 1000);
				}
			},
			{
				id:300,
				name:"Use XHR to load an external resource.",
				test:function(t){
					try{
						var xhr = new XMLHttpRequest();
						xhr.open("GET", "http://philstar.de/vf/test.png?nocache="+ (+new Date()), true);
						xhr.onreadystatechange = function (){
							if(xhr.readyState == 4){
								if (xhr.status == 200){
									t.failure("This should have failed.");
								} else {
									t.success("HTTP Code 200 didnt return.");
								}
							}
						};
						xhr.onerror = function(e){
							t.success(e.message || e);
						};
						xhr.send(null);
					}catch(e){
						t.success(e.message || e);
					}
				}
			}
		]
	});
})();
