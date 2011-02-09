(function(){

	/* Thank you, @sil */

	function getRatio(X,Y){
		var T=(function(u,v){
			var U=u,V=v;
			while(1){
				if(!(U%=V)) return V;
				if(!(V%=U)) return U;
			}
		})(X,Y);
		if (!T) T=1;
		return [X/=T,Y/=T];
	}

	function getHtmlChunk(testId){
		return '';
	}

	function aspectRatioTest () {


var aspectRatioTests = [
/*	'1/1',
	'2/3',
	'3/2',
	'4/3',
	'3/4',
	'4/5',
	'5/4',
	'5/3',
	'3/5',
	'16/10',
	'10/16',
	'99/80',
	'80/99' */
];

	var deviceAspectRatio =  getRatio(screen.width,screen.height).join('/');
	
// var aspectRatio =  getRatio(document.documentElement.clientWidth,document.documentElement.clientHeight).join('/');

aspectRatioTests.push(deviceAspectRatio);
// aspectRatioTests.push(aspectRatio);


var writestring = '';
addToString('<style id="test">');

for (var i=0;i<aspectRatioTests.length;i+=1) {
	var writtenAspectRatio = aspectRatioTests[i].replace('/','_');
	addToString('@media all and (device-aspect-ratio: ' + aspectRatioTests[i] + ') {');
	addToString('#dar' + writtenAspectRatio + ' {display: block}');
	addToString('#daspectratio {display: none;} }');
//	addToString('@media all and (aspect-ratio: ' + aspectRatioTests[i] + ') {');
//	addToString('#ar' + i + ' {display: list-item}');
//	addToString('#aspectratio {display: none;} }');
}
addToString('</style>');

for (var i=0;i<aspectRatioTests.length;i+=1) {
	var writtenAspectRatio = aspectRatioTests[i].replace('/','_');
//	addToString('<li class="query" id="ar' + i + '">Aspect ratio is ' + aspectRatioTests[i] +  '.</li>');
	addToString('<li class="query" id="dar' + writtenAspectRatio + '">Device aspect ratio is ' + aspectRatioTests[i] +  '.</li>');
}


return [writestring,deviceAspectRatio];

function addToString(str) {
	writestring += str;
}
	
	}
	
	var expectedDPI; // filled in by test 1
	
	dohx.add({name:"Miscellaneous media queries",
		mqcExecutionOrderBaseOffset:560000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id: 1,
				name:"Precondition",
				instructions: 'Please measure the width of your device with a ruler and enter the value. Press Done when you\'re ready.',
				test:function(t){
					dohx.showInfo(
						'<form>' +
						'<input id="measuredDeviceWidth"><br>' +
						'<input type="radio" name="deviceWidthUnit" value="cm" checked> centimeters' +
						'<input type="radio" name="deviceWidthUnit" id="inch" value="in"> inches<br>' +
						'<button id="measurementDone">Done</button></form>'
					);				
					document.getElementById('measurementDone').onclick = function () {
						var value = document.getElementById('measuredDeviceWidth').value;
						var unit = (document.getElementById('inch').checked) ? 1 : 2.54;
						value /= unit;
						var screenWidth = screen.width;
						expectedDPI = parseInt(screenWidth/value);
						t.success(true);
						return false;
					}
				},
			},
			{
				id:100,
				name:"Touch media query",
				test:function(t){
					dohx.showInfo(
						'<p id="touch1">YES, the device supports touch media query</p>' +
						'<p id="touch2">NO, the device does not support touchscreen media queries or is not a touchscreen device.</p>'
					);
				},
				expectedResult: 'Did it say YES?'
			},
			{
				id:200,
				name:"device-aspect-ratio media query",
				test:function(t){
					var results = aspectRatioTest();
					dohx.showInfo(results[0]);
					var writtenAspectRatio = results[1].replace('/','_');
					var DOMNode = document.getElementById('dar' + writtenAspectRatio);
					var computed = window.getComputedStyle(DOMNode,null).display;
					t.assertEqual('block',computed);
					return results[1];
				},
			},
			{
				id:300,
				name:"dpi media query",
				test:function(t){
					var step = 10;
					var maximumSize = 400;
					var testPars = '<p id="dpi">The value is not part of the range.</p>';
					for (var i=step;i<maximumSize+1;i+=step) {
						testPars += '<p class="query" id="dpi' + i + '">Range: ' + i + ' and ' + (i+step-1) +  '.</p>';
					} 
					dohx.showInfo('<p>Value: ' + expectedDPI + '</p>' + testPars);
				},
				expectedResult: 'Is the value part of the range?'
			},
//*/
		]
	});

})();