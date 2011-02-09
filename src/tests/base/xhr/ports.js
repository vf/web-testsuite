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
	
	// The XmlHttpRequest is done here.
	// This is just a tiny wrapper, so we dont have to rewrite it.
	function requestWrapper(data){
		var req = new XMLHttpRequest();
		if (!req) return;
		if (data.openParams){
			req.open.apply(req, data.openParams);
		} else {
			req.open(data.method=="post" ? "POST" : "GET", data.url, true);
		}
		req.setRequestHeader('User-Agent','XMLHTTP/1.0');
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		var lastReadState = null;
		req.onreadystatechange = function () {
			if (lastReadState != req.readyState && data.onReadyStateChange){
				data.onReadyStateChange(req);
			}
			lastReadState = req.readyState;
			if (req.readyState != 4) return; // We only care about 4.
			if (req.status != 200 && req.status != 304) {
				if (data.onError){
					data.onError(req);
				}
			} else {
				// Always do callback, also on errors.
				if (data.onSuccess){
					data.onSuccess(req);
				}
			}
		}
		if (req.readyState == 4) return;
		req.send(data.data || null);
	}
	
	//
	// Test AJAX calls on various ports.
	//
	dohx.add({
		mqcExecutionOrderBaseOffset:410000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		name:"xhr/ports",
		tests:[
			{
				id:100,
				timeout:60*1000, // Give user time to choose connection.
				name:"xhr - Call to HTTP site",
				test:function(t){
					setTimeout(function(){requestWrapper({
						url:"http://www.heise.de",
						onSuccess:function(req){
							t.result = req.status + ": " + req.statusText;
							t.success(true);
						},
						onError:function(req){
							t.failure(req.status);
						}
					})}, 100);
				}
			},
			{
				id:200,
				timeout:60*1000,
				name:"xhr - Call to HTTPS site",
				test:function(t){
					setTimeout(function(){requestWrapper({
						url:"https://www.google.com/accounts/login",
						onSuccess:function(req){
							t.result = req.status + ": " + req.statusText;
							t.success(true);
						},
						onError:function(req){
							t.failure(req.status);
						}
					})}, 100);
				}
			},
			{
				id:300,
				name:"xhr - Call to HTTPS site with credentials",
				timeout:60*1000,
				test:function(t){
					requestWrapper({
						openParams:["POST", "https://api.del.icio.us/v1/posts/all?results=175&meta=no", true, "demo__user","iwinan96"],
						onSuccess:function(req){
							t.result = req.status + ": " + req.statusText;
							t.success(true);
						},
						onError:function(req){
							t.failure(req.status);
						}
					});
				}
			},
			{
				id:400,
				timeout:60*1000,
				name:"xhr - Page which runs on port 8000.",
				test:function(t){
					requestWrapper({
						url:"http://stream.live-inselradio.com:8000/",
						onReadyStateChange:function(req){
							// check status, it is streaming, so it will never get done
							if (req.readyState == 3 || req.readyState == 4){ // readyState==3 means LOADING, 4 is DONE (somehow the Nokia E5-00 doenst send readyState=3, just 4)
								t.result = req.status + ": " + req.statusText;
								t.success(true);
							}
						},
						onError:function(req){
							t.failure(req.status);
						}
					});
				}
			}
		]
	});
})();
