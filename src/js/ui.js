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
					//'<pre class="completeInfo displayNone"><code>${testSourceCode}</code><hr/>${error}</pre>'+
					'<div class="completeInfo displayNone">'+
						'<hr/>'+
						'Test function source code:'+
						'<pre>${testSourceCode}</pre>'+
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
					'<div class="completeInfo displayNone">'+
						'<hr/>'+
						'Test function source code:'+
						'<pre>${testSourceCode}</pre>'+
					'</div>'+
				'</div>'
			,
			UNSUPPORTED_API:
				'<div class="row notApplicable ${oddClass}">'+
					'<div class="id">${id}</div>'+
					'${name}'+
					'<div class="details">API(s) not supported (${apis}).</div>'+
					'<div class="completeInfo displayNone">'+
						'<hr/>'+
						'Test function source code:'+
						'<pre>${testSourceCode}</pre>'+
					'</div>'+
				'</div>'
			,
			REPORT:
				'<div class="row report">'+
					'<h1>Test Summary</h1>'+
					'<div class="count">${numTests} tests in ${numGroups} groups<br />'+
						'<button class="showStats" onclick="doh.ui.showStats()">Stats</button>'+
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
					'<div class="sendingResults">Sending test results...</div>'+
				'</div>'
			,
			SUCCESS:
				'<div class="row success ${oddClass}">'+
					'<div class="id">${id}</div>'+
					'${name}'+
					'<div class="result">${result}</div>'+
					'<div class="completeInfo displayNone">'+
						'<hr/>'+
						'Test function source code:'+
						'<pre>${testSourceCode}</pre>'+
					'</div>'+
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
			var data = this._getResultsData(test);
			n.innerHTML += this._render(data, this._templates.NOT_APPLICABLE);
			doh.ui.storeResult({result:"not applicable", test:data});
		},
		
		unsupportedApi:function(test, apis){
			var data = this._getResultsData(test, {apis:apis.join(", ")});
			n.innerHTML += this._render(data, this._templates.UNSUPPORTED_API);
			doh.ui.storeResult({result:"unsupported API", test:data});
		},
		
		success:function(test){
			var resString;
			var name = test.name;
			var result = test.result;
			if (util.isArray(result) && result.length==0){
				resString = "no data (empty array)";
			} else if (result===undefined){
				resString = "";
			} else {
				resString = embed.toJson(result);
			}
			var data = this._getResultsData(test, {result:resString});
			n.innerHTML += this._render(data, this._templates.SUCCESS);
			doh.ui.storeResult({result:"success", test:data});
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
			var data = this._getResultsData(test, {
				messagePreview: msg,
				error:errorParts.join("\n"),
				failureOrError:isError ? "error" : "failure"
			});
			n.innerHTML += this._render(data, this._templates.FAILURE_OR_ERROR);
			doh.ui.storeResult({result:isError ? "error" : "failure", test:data});
		},
		
		_getSourceCode:function(test){
			return (test._actualTestFunction || test.test).toString().replace(/\t/g, " ")
		},
		
		invalidConfig:function(){
			n.innerHTML += this._render({
				userAgent:window.navigator.userAgent
			}, this._templates.INVALID_CONFIG);
		},
		
		report:function(numTests, numGroups, numErrors, numFailures, numNotApplicable){
			var percentFailure = Math.round((numFailures/numTests)*100);
			var percentError = Math.round((numErrors/numTests)*100);
			var percentNotApplicable = Math.round((numNotApplicable/numTests)*100);
			var percentOk = 100 - percentError - percentFailure - percentNotApplicable;
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
		
		toggleCompleteInfo:function(node){
			if (node.className.indexOf("displayNone")==-1){
				node.className += " displayNone";
			} else {
				node.className = node.className.replace("displayNone", "");
			}
		},
		
		onContentClick:function(e){
			var node = e.target;
			// If the user clicks on the bottom bar, which shows the summary, toggle all results of the given type (success, failure, etc.).
			if (util.findNextPredecessorByClassName(node, "percent")){
				this.toggleResultsFor(node.className);
				return;
			}
			
			// Try to find out if a parent node has the class "row", then we toggle the current row.
			while (node.className.indexOf("row")==-1 && node!=document.body){
				node = node.parentNode;
			}
			if (node.className.indexOf("row")!=-1){
				// Find the "completeInfo" node to toggle it.
				node = embed.query(".completeInfo", node);
				if (!node || node.length<1) return;
				node = node[0];
				this.toggleCompleteInfo(node);
			}
		},
		
		_oddCounter:0,
		_render:function(data, tpl){
			var ret = tpl;
			data.oddClass = (this._oddCounter++%2) ? "odd" : "";
			for (var i in data){
				if (ret.indexOf("${" + i + "}")==-1) continue; // If there is no variable to replace continue.
				try{
					var htmlified = (""+data[i]).replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
					ret = ret.replace(new RegExp("\\$\\{" + i + "\\}", "g"), htmlified);
				}catch(e){
					//console.log(e.message);
				}
			}
			return ret;
		},
		
		_getResultsData:function(test, mixin){
			// Returns results data for all possible cases, to provide a unique set of base data we do it in here.
			var data = {
				name: test.name,
				groupName: test.group.name,
				id: util.getTestId(test),
				testSourceCode: this._getSourceCode(test),
				_rawId: test.id
			};
			return embed.mixin(data, mixin);
		}
	};
})();

util.connect(".content", "onclick", embed.hitch(ui, "onContentClick"));







ui.dialog = {
	
	show:function(testName, instructions, expectedResult){
		embed.style(embed.query(".content")[0], {opacity:0.2});
		embed.query(".manualTest .whatToDo .goButton")[0].removeAttribute("disabled");
		embed.style(embed.query(".manualTest .result")[0], {display:"none"});
		embed.style(embed.query(".manualTest")[0], {display:"block"});
		embed.query(".manualTest .testName")[0].innerHTML = testName;
		embed.query(".manualTest .whatToDo .text")[0].innerHTML = instructions;
		if (expectedResult){
			embed.query(".manualTest .result .text")[0].innerHTML = expectedResult;
		}
	},
	
	hide:function(){
		embed.style(embed.query(".content")[0], {opacity:1});
		embed.style(embed.query(".manualTest")[0], {display:"none"});
		// Hide countdown window too.
		if (this._countdownInterval){
			clearInterval(this._countdownInterval);
			this._countdownInterval = null;
		}
		embed.style(embed.query(".manualTest .timeout")[0], {display:"none"});
	},
	
	_countdownInterval:null,
	showCountDown:function(startTime, timeout){
		var countdownNode = embed.query(".manualTest .timeout .countdown .minutes")[0];
		var start = startTime.getTime();
		embed.style(embed.query(".manualTest .timeout")[0], {display:"block"});
		this._countdownInterval = setInterval(embed.hitch(this, function(){
			var delta = (timeout - (new Date().getTime() - start)) / 1000,
				mins = parseInt(delta/60),
				secs = parseInt(delta%60);
			countdownNode.innerHTML = mins + ":" + ( secs>9 ? secs : "0" + secs );
		}), 600);
	}
};
