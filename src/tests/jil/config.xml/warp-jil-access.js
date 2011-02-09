/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){
	
	var externalImageUrl = "http://philstar.de/vf/test.png";
	
	dohx.add({name:"access-tag first and jil:access-tag below it.",
		mqcExecutionOrderBaseOffset:460000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Use &lt;img src&gt; to load an external resource.",
				expectedResult:"Did you see an image loading?",
				test:function(t){
					dohx.showInfo('Loading...<br /><img src="' + externalImageUrl + '" alt="external image" width="100">');
				}
			},
			{
				id:200,
				name:"Use 'new Image()' to load an external resource.",
				expectedResult:"Did you see an image loading?",
				test:function(t){
					dohx.showInfo('Loading ...<div id="_imgSrc_"></div>');
					var img = new Image();
					img.src = externalImageUrl;
					img.width = "100";
					setTimeout(function(){ // Let the showInfo() generate the DIV.
						var el = util.byId("_imgSrc_");
						el.appendChild(img);
					}, 100);
				}
			},
			{
				id:300,
				name:"Use XHR to load an external resource.",
				test:function(t){
					try{
						var xhr = new XMLHttpRequest();
						// Nokia definitely needs the following header, wont send otherwise!!!
						xhr.setRequestHeader('User-Agent','XMLHTTP/1.0');
						xhr.open("GET", "http://philstar.de/vf/test.png?nocache="+ (+new Date()), true);
						xhr.onreadystatechange = function (){
							if(xhr.readyState == 4){
								if (xhr.status == 200){
									t.success("finished with status " + xhr.status);
								} else {
									t.failure("xhr.status=" + xhr.status);
								}
							}
						};
						xhr.onerror = function(e){
							t.failure(e.message || e);
						};
						xhr.send(null);
					}catch(e){
						t.failure(e.message || e);
					}
				}
			}
		]
	});
})();
