var ui = {};
(function(){
	var n = util.query(".content")[0];
	
	ui = {
		
		_templates:{
			FAILURE_OR_ERROR:
				'<div class="row ${failureOrError} ${oddClass}">'+
					'<div class="id">${id}</div>'+
					'${name}'+
					'<div class="message">${messagePreview}</div>'+
					//'<pre class="fullError displayNone"><code>${testSourceCode}</code><hr/>${error}</pre>'+
					'<div class="fullError displayNone">'+
						'<hr/>'+
						'Test function source code:'+
						'<pre>${testSourceCode}</pre>'+
						'<hr/>'+
						'Error message:'+
						'<pre>${error}</pre>'+
					'</div>'+
				'</div>'
			,
			GROUP_HEADER:
				'<div class="row groupHeader">${name} (${numTests})</div>'
			,
			INVALID_CONFIG:
				'<div class="invalidConfig">'+
					'No valid configuration for user agent<br />'+
					'<pre>${userAgent}</pre>'+
					'found, please check \'config.js\'!'+
				'</div>'
			,
			NOT_APPLICABLE:
				'<div class="row notApplicable ${oddClass}">'+
					'<div class="id">${id}</div>'+
					'${name}'+
					'<div class="details">Test not applicable.</div>'+
				'</div>'
			,
			UNSUPPORTED_API:
				'<div class="row notApplicable ${oddClass}">'+
					'<div class="id">${id}</div>'+
					'${name}'+
					'<div class="details">API(s) not supported (${apis}).</div>'+
				'</div>'
			,
			REPORT:
				'<div class="row report">'+
					'<h1>Test Summary</h1>'+
					'<div class="count">${numTests} tests in ${numGroups} groups<br />'+
						'<span class="error">${numErrors} errors (${percentError}%)</span><br />'+
						'<span class="failure">${numFailures} failures (${percentFailure}%)</span><br />'+
						'<span class="success">${numOks} ok (${percentOk}%)</span><br />'+
						'<span class="notApplicable">${numNotApplicable} not applicable (${percentNotApplicable}%)</span><br />'+
					'</div>'+
					'<div class="percent">'+
						'<div class="error" style="width: ${percentError}%"><span>${percentError}%</span></div>'+
						'<div class="failure" style="width: ${percentFailure}%"><span>${percentFailure}%</span></div>'+
						'<div class="success" style="width: ${percentOk}%"><span>${percentOk}%</span></div>'+
						'<div class="notApplicable" style="width: ${percentNotApplicable}%"><span>${percentNotApplicable}%</span></div>'+
					'</div>'+
				'</div>'
			,
			SUCCESS:
				'<div class="row success ${oddClass}">'+
					'<div class="id">${id}</div>'+
					'${name}'+
					'<div class="result">${result}</div>'+
				'</div>'
			
		},
		
		error:function(test, error){
			this._failureOrError(test, error, true);
		},
		
		failure:function(test, error){
			this._failureOrError(test, error, false);
		},
		
		groupHeader:function(name, numTests){
			n.innerHTML += this._render({name:name, numTests:numTests}, this._templates.GROUP_HEADER);
			this.resetOddCounter();
		},
		
		notApplicable:function(test){
			n.innerHTML += this._render({name:test.name, id:util.getTestId(test)}, this._templates.NOT_APPLICABLE);
		},
		
		unsupportedApi:function(test, apis){
			n.innerHTML += this._render({name:test.name, id:util.getTestId(test), apis:apis.join(", ")},
										this._templates.UNSUPPORTED_API);
		},
		
		success:function(test){
			var resString,
				name = test.name,
				result = test.result;
			if (util.isArray(result) && result.length==0){
				resString = "no data (empty array)";
			} else if (result===undefined){
				resString = "";
			} else {
				resString = util.toJson(result);
			}
			n.innerHTML += this._render({name:name, id:util.getTestId(test), result:resString}, this._templates.SUCCESS);
		},
		
		showInfo:function(txt){
			var n = util.query(".manualTest .testInfo")[0];
			n.style.display = "block";
			n.innerHTML = txt;
		},
		
		resetInfo:function(){
			var n = util.query(".manualTest .testInfo")[0];
			n.style.display = "none";
			n.innerHTML = "";
		},
		
		_failureOrError:function(test, error, isError){
			var msg = (error.actualError && error.actualError.type) || error.message;
			var errorParts = [];
			var name = test.name;
			// In actualError the error that was really thrown, most probably not an instance/child of Error, like a JIL Widget.Exception.
			if (error.actualError){
				for (var i in error.actualError){
					errorParts.push("<strong>"+i+"</strong>: "+error.actualError[i]);
				}
				// Seems the for-in doesnt return type and message, at least on H2.
				errorParts.push("<strong>type</strong>: "+error.actualError.type);
				errorParts.push("<strong>message</strong>: "+error.actualError.message);
				errorParts.push("<br /><br />")
			}
			for (var i in error){
				errorParts.push("<strong>"+i+"</strong>: "+error[i]);
			}
			n.innerHTML += this._render({
				name: name,
				id: util.getTestId(test),
				messagePreview: msg.length>60 ? msg.substr(0,58)+"..." : msg,
				error:errorParts.join("\n"),
				failureOrError:isError ? "error" : "failure",
				testSourceCode:(test._actualTestFunction || test.test).toString().replace(/\t/g, " ")
			}, this._templates.FAILURE_OR_ERROR);
		},
		
		invalidConfig:function(){
			n.innerHTML += this._render({
				userAgent:window.navigator.userAgent
			}, this._templates.INVALID_CONFIG);
		},
		
		report:function(numTests, numGroups, numErrors, numFailures, numNotApplicable){
			var percentFailure = Math.round((numFailures/numTests)*100),
				percentError = Math.round((numErrors/numTests)*100),
				percentNotApplicable = Math.round((numNotApplicable/numTests)*100),
				percentOk = 100 - percentError - percentFailure - percentNotApplicable;
			n.innerHTML += this._render({
				numTests: numTests,
				numGroups: numGroups,
				numOks: numTests - numErrors - numFailures - numNotApplicable,
				numErrors: numErrors,
				numFailures: numFailures,
				numNotApplicable: numNotApplicable,
				percentOk: percentOk,
				percentError: percentError,
				percentFailure: percentFailure,
				percentNotApplicable: percentNotApplicable
			}, this._templates.REPORT);
			window.scrollTo(0, window.innerHeight*2); // window.innerHeight seems not enough :)
		},
		
		resetOddCounter:function(){
			this._oddCounter = 0;
		},
		
		toggleResultsFor:function(resultType){
			var nodes = util.query(".content ."+resultType);
			var show = nodes[0].style.display=="none";
			for (var i=0, n; n=nodes[i]; i++){
				if (n.className.indexOf("row")==-1) continue; // TODO actually this could be done by using ".content .row."+resultType up there, but our util.query is not that smart yet.
				n.style.display = show ? "" : "none";
			}
		},
		
		toggleFullError:function(node){
			if (node.className.indexOf("displayNone")==-1){
				node.className += " displayNone";
			} else {
				node.className = node.className.replace("displayNone", "");
			}
		},
		
		onContentClick:function(e){
			var node = e.target;
			if (util.findNextPredecessorByClassName(node, "percent")){
				this.toggleResultsFor(node.className);
				return;
			}
			
			if (node.className.indexOf("fullError")==-1){ // Was the "fullError" node clicked?
				// Find the "fullError" node to toggle it.
				node = util.query(".fullError", e.target);
				if (!node || node.length<1) return;
				node = node[0];
			}
			this.toggleFullError(node);
		},
		
		_oddCounter:0,
		_render:function(data, tpl){
			var ret = tpl;
			data.oddClass = (this._oddCounter++%2) ? "odd" : "";
			for (var i in data){
				if (ret.indexOf("${" + i + "}")==-1) continue; // If there is no variable to replace continue.
				try{
					ret = ret.replace(new RegExp("\\$\\{" + i + "\\}", "g"), data[i]);
				}catch(e){
					console.log(e.message);
				}
			}
			return ret;
		}
	};
})();

util.connect(".content", "onclick", doh.util.hitch(ui, "onContentClick"));







ui.dialog = {
	show:function(testName, instructions, expectedResult){
		util.style(".content", {opacity:0.2});
		util.query(".manualTest .whatToDo .goButton")[0].removeAttribute("disabled");
		util.style(".manualTest .result", {display:"none"});
		util.style(".manualTest", {display:"block"});
		util.query(".manualTest .testName")[0].innerHTML = testName;
		util.query(".manualTest .whatToDo .text")[0].innerHTML = instructions;
		if (expectedResult){
			util.query(".manualTest .result .text")[0].innerHTML = expectedResult;
		}
	},
	
	hide:function(){
		util.style(".content", {opacity:1});
		util.style(".manualTest", {display:"none"});
		// Hide countdown window too.
		if (this._countdownInterval){
			clearInterval(this._countdownInterval);
			this._countdownInterval = null;
		}
		util.style(".manualTest .timeout", {display:"none"});
	},
	
	_countdownInterval:null,
	showCountDown:function(startTime, timeout){
		var countdownNode = util.query(".manualTest .timeout .countdown .minutes")[0];
		var start = startTime.getTime();
		util.style(".manualTest .timeout", {display:"block"});
		this._countdownInterval = setInterval(doh.util.hitch(this, function(){
			var delta = (timeout - (new Date().getTime() - start)) / 1000,
				mins = parseInt(delta/60),
				secs = parseInt(delta%60);
			countdownNode.innerHTML = mins + ":" + ( secs>9 ? secs : "0" + secs );
		}), 600);
	}
};
