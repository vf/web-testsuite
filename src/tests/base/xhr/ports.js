(function(){
	
	// The XmlHttpRequest is done here.
	// This is just a tiny wrapper, so we dont have to rewrite it.
	function requestWrapper(data){
		var r = new XMLHttpRequest();
		r.onreadystatechange = function(){
			if(this.readyState == 4){
				switch (this.status) {
					case 200:
						data.onSuccess(this);
						break;
					default:
						data.onError(this);
						break;
				}
			}
		}
		if (data.openParams){
			r.open.apply(r, data.openParams);
		} else {
			r.open(data.method=="post" ? "POST" : "GET", data.url, true);
		}
		r.send(null);
	}
	
	//
	// Test AJAX calls on various ports.
	//
	dohx.add({name:"AJAX calls",
		tests:[
			{
				id:100,
				timeout:10*1000,
				name:"Call to HTTP site",
				test:function(t){
					setTimeout(function(){requestWrapper({
						url:"http://www.heise.de",
						onSuccess:function(req){
							t.result = req;
							t.success(true);
						},
						onError:function(req){
							t.result = req;
							t.failure();
						}
					})}, 100);
				}
			},{
				id:200,
				timeout:10*1000,
				name:"Call to HTTPS site",
				test:function(t){
					setTimeout(function(){requestWrapper({
						url:"https://www.google.com/accounts/login",
						onSuccess:function(req){
							t.result = req;
							t.success(true);
						},
						onError:function(req){
							t.result = req;
							t.failure();
						}
					})}, 100);
				}
			},{
				id:300,
				timeout:10*1000,
				name:"Call to HTTPS site with credentials",
				test:function(t){
					requestWrapper({
						openParams:["https://api.del.icio.us/v1/posts/all?results=175&meta=no", true, "demo__user","iwinan96"],
						onSuccess:function(){
							t.success(true);
						},
						onError:function(req){
							t.failure();
						}
					});
				}
			},{
				id:400,
				timeout:10*1000,
				name:"Page which runs on port 8000.",
				test:function(t){
					requestWrapper({
						url:"http://stream.live-inselradio.com:8000/",
						onSuccess:function(){
							t.success(true);
						},
						onError:function(req){
							t.failure();
						}
					});
				}
			}
		]
	});
})();
