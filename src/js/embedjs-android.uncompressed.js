


/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/dojo.js
********************/


var embed, dojo;
embed = dojo = {};
embed.config = {};
embed.global = this;
embed.doc = this.document || null;
embed.body = function() {
	var ebd = embed;
	return ebd.doc && ebd.doc.body;
};
embed.version = "0.1";



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/json/json.js
********************/


// NOTE: dojo's JSON impl differs from native!
//	(e.g. revier function)

dojo.toJson = function(/* Mixed */ data){
	return JSON.stringify(data);
};

dojo.fromJson = function(/* String */ json){
	return JSON.parse(json);
}



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/html/id.js
********************/



dojo.byId = function(id, doc){
	//	summary:
	//		Returns DOM node with matching `id` attribute or `null`
	//		if not found, similar to "$" function in another library.
	//		If `id` is a DomNode, this function is a no-op.
	//
	//	id: String|DOMNode
	//	 	A string to match an HTML id attribute or a reference to a DOM Node
	//
	//	doc: Document?
	//		Document to work in. Defaults to the current value of
	//		dojo.doc.  Can be used to retrieve
	//		node references from other documents.
	//
	//	example:
	//	Look up a node by ID:
	//	| var n = dojo.byId("foo");
	//
	//	example:
	//	Check if a node exists.
	//	|	if(dojo.byId("bar")){ ... }
	//
	//	example:
	//	Allow string or DomNode references to be passed to a custom function:
	//	| var foo = function(nodeOrId){
	//	|	nodeOrId = dojo.byId(nodeOrId);
	//	|	// ... more stuff
	//	| }
	return (typeof id == "string") ? (doc || document).getElementById(id) : id; // DomNode
};



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/query/qsa-preprocessor.js
********************/


dojo.query = function(query, scope){
	//	summary:
	//		Returns nodes which match the given CSS3 selector, searching the
	//		entire document by default but optionally taking a node to scope
	//		the search by. Returns an instance of dojo.NodeList.
	//	description:
	//		dojo.query() is the swiss army knife of DOM node manipulation in
	//		Dojo. Much like Prototype's "$$" (bling-bling) function or JQuery's
	//		"$" function, dojo.query provides robust, high-performance
	//		CSS-based node selector support with the option of scoping searches
	//		to a particular sub-tree of a document.
	//
	//		Supported Selectors:
	//		--------------------
	//
	//		dojo.query() supports a rich set of CSS3 selectors, including:
	//
	//			* class selectors (e.g., `.foo`)
	//			* node type selectors like `span`
	//			* ` ` descendant selectors
	//			* `>` child element selectors 
	//			* `#foo` style ID selectors
	//			* `*` universal selector
	//			* `~`, the immediately preceeded-by sibling selector
	//			* `+`, the preceeded-by sibling selector
	//			* attribute queries:
	//			|	* `[foo]` attribute presence selector
	//			|	* `[foo='bar']` attribute value exact match
	//			|	* `[foo~='bar']` attribute value list item match
	//			|	* `[foo^='bar']` attribute start match
	//			|	* `[foo$='bar']` attribute end match
	//			|	* `[foo*='bar']` attribute substring match
	//			* `:first-child`, `:last-child`, and `:only-child` positional selectors
	//			* `:empty` content emtpy selector
	//			* `:checked` pseudo selector
	//			* `:nth-child(n)`, `:nth-child(2n+1)` style positional calculations
	//			* `:nth-child(even)`, `:nth-child(odd)` positional selectors
	//			* `:not(...)` negation pseudo selectors
	//
	//		Any legal combination of these selectors will work with
	//		`dojo.query()`, including compound selectors ("," delimited).
	//		Very complex and useful searches can be constructed with this
	//		palette of selectors and when combined with functions for
	//		manipulation presented by dojo.NodeList, many types of DOM
	//		manipulation operations become very straightforward.
	//		
	//		Unsupported Selectors:
	//		----------------------
	//
	//		While dojo.query handles many CSS3 selectors, some fall outside of
	//		what's resaonable for a programmatic node querying engine to
	//		handle. Currently unsupported selectors include:
	//		
	//			* namespace-differentiated selectors of any form
	//			* all `::` pseduo-element selectors
	//			* certain pseduo-selectors which don't get a lot of day-to-day use:
	//			|	* `:root`, `:lang()`, `:target`, `:focus`
	//			* all visual and state selectors:
	//			|	* `:root`, `:active`, `:hover`, `:visisted`, `:link`,
	//				  `:enabled`, `:disabled`
	//			* `:*-of-type` pseudo selectors
	//		
	//		dojo.query and XML Documents:
	//		-----------------------------
	//		
	//		`dojo.query` (as of dojo 1.2) supports searching XML documents
	//		in a case-sensitive manner. If an HTML document is served with
	//		a doctype that forces case-sensitivity (e.g., XHTML 1.1
	//		Strict), dojo.query() will detect this and "do the right
	//		thing". Case sensitivity is dependent upon the document being
	//		searched and not the query used. It is therefore possible to
	//		use case-sensitive queries on strict sub-documents (iframes,
	//		etc.) or XML documents while still assuming case-insensitivity
	//		for a host/root document.
	//
	//		Non-selector Queries:
	//		---------------------
	//
	//		If something other than a String is passed for the query,
	//		`dojo.query` will return a new `dojo.NodeList` instance
	//		constructed from that parameter alone and all further
	//		processing will stop. This means that if you have a reference
	//		to a node or NodeList, you can quickly construct a new NodeList
	//		from the original by calling `dojo.query(node)` or
	//		`dojo.query(list)`.
	//
	//	query:
	//		The CSS3 expression to match against. For details on the syntax of
	//		CSS3 selectors, see <http://www.w3.org/TR/css3-selectors/#selectors>
	//	root:
	//		A DOMNode (or node id) to scope the search from. Optional.
	//	returns: DOMCollection || Array
	//		The matching nodes. DOMCollection is enumerable, so you can use
	//		it with dojo.forEach.
	//	example:
	//		search the entire document for elements with the class "foo":
	//	|	dojo.query(".foo");
	//		these elements will match:
	//	|	<span class="foo"></span>
	//	|	<span class="foo bar"></span>
	//	|	<p class="thud foo"></p>
	//	example:
	//		search the entire document for elements with the classes "foo" *and* "bar":
	//	|	dojo.query(".foo.bar");
	//		these elements will match:
	//	|	<span class="foo bar"></span>
	//		while these will not:
	//	|	<span class="foo"></span>
	//	|	<p class="thud foo"></p>
	//	example:
	//		find `<span>` elements which are descendants of paragraphs and
	//		which have a "highlighted" class:
	//	|	dojo.query("p span.highlighted");
	//		the innermost span in this fragment matches:
	//	|	<p class="foo">
	//	|		<span>...
	//	|			<span class="highlighted foo bar">...</span>
	//	|		</span>
	//	|	</p>
	//	example:
	//		set an "odd" class on all odd table rows inside of the table
	//		`#tabular_data`, using the `>` (direct child) selector to avoid
	//		affecting any nested tables:
	//	|	dojo.query("#tabular_data > tbody > tr:nth-child(odd)").addClass("odd");
	//	example:
	//		remove all elements with the class "error" from the document
	//		and store them in a list:
	//	|	var errors = dojo.query(".error").orphan();
	//	example:
	//		add an onclick handler to every submit button in the document
	//		which causes the form to be sent via Ajax instead:
	//	|	dojo.query("input[type='submit']").onclick(function(e){
	//	|		dojo.stopEvent(e); // prevent sending the form
	//	|		var btn = e.target;
	//	|		dojo.xhrPost({
	//	|			form: btn.form,
	//	|			load: function(data){
	//	|				// replace the form with the response
	//	|				var div = dojo.doc.createElement("div");
	//	|				dojo.place(div, btn.form, "after");
	//	|				div.innerHTML = data;
	//	|				dojo.style(btn.form, "display", "none");
	//	|			}
	//	|		});
	//	|	});
	//	issues:
	//		On webkit, the following queries will not work as expected:
	//		(Note that these are bugs webkit's querySelector engine.)
	//	|	dojo.query('[foo|="bar"]') // will also return elements with foo="bar"
	//	|	dojo.query('option:checked') // will return an empty list
	//	dojo-incompatibilities:
	//		dojo.query will not return a dojo.NodeList Instance! On webkit it will
	//		return a DOMCollection or an empty Array.
	//	TODO: 
	//		Update the inline doc when we know if dojo.query "does" support
	//		chaining.
	
	
	// scope normalization
	if(typeof scope == "string"){
		scope = dojo.byId(scope);
		if(!scope){
			return [];
		}
	}

	scope = scope || dojo.doc;
	
	/*
	QUERY NORMALIZATION:

	`dojo.query` accepts selectors that start with combinators like "> *"
	or "+ a". It accepts even queries that consist only of a combinator.
	These queries throw errors with querySelectorAll.

	Markup like
			<div><p id="myP"><strong>foo</strong></p></div>
	returns the "strong" element with
			document.getElementById("myP").querySelectorAll("div strong");
	Which is incompatible with dojo.query

	For these reasons, the query is normalized before execution:
	- When the query ends with a combinator (">", "+", "~"), append a universal selector ("*").
	- When the root is document, and the query starts with a child combinator, return the appropriate element.
	- When the root is document, and the query starts with an other combinator than ">", return an empty result.
	- When the root element does not have an id, add a synthetic id.
	- Prefix the query with the id of the root element.
	- Execute the query with QSA.
	- Remove the synthetic id, if added.
	- Return the results.

	*/

	// Normalize selectors ending with a combinator
	if (/[>+~]\s*$/.test(query)){
		query += "*";
	}

	var queryRoot = scope; // `querySelectorAll` will be called on this node.

	// check if scope is a document node
	if(scope.nodeType == 9){
		// if the query starts with a child combinator, try scope.querySelector()
		// with the first segment _without_ leading child operator and check
		// if it is scope.documentElement.
		if(/^\s*>/.test(query)){
			// split the query up into the selector that the documentElement must match
			// and the rest of the query.
			var queryParts = query.replace(/^\s*>/, "").match(/([^\s>+~]+)(.*)/);
			if (!queryParts) {
				return [];
			}

			var docElmQuery = queryParts[1];
			query = queryParts[2];

			// Check if the documentElement matches the first segment of the selector
			if(scope.querySelector(docElmQuery) !== scope.documentElement){
				return [];
			}

			// If documentElement matches the first segment of the selector,
			// and the rest of the query is empty return documentElement.
			if(!query){
				return [scope.documentElement];
			}

			// execute the rest of the selector against scope.documentElement
			scope = scope.documentElement;
		}

		// if the query starts with a ajdacent combinator or a general sibling combinator,
		// return an empty array
		else if(/^\s*[+~]/.test(query)){
			return [];
		}
	}

	// check if the root is an element node.
	// We can't use an "else" branch here, because the scope might have changed
	if(scope.nodeType == 1){
		// we need to prefix the query with an id to make QSA work like
		// expected. For details check http://ejohn.org/blog/thoughts-on-queryselectorall/
		var originalId = scope.id;
		var rootId = originalId;
		if(!originalId){
			rootId = scope.id =  "d---dojo-query-synthetic-id-" + new Date().getTime(); // is this "secure" enough?
			var syntheticIdSet = true;
		}

		query = "#" + rootId + " " + query;

		// we need to start the query one element up the chain to make sibling
		// and adjacent combinators work.
		// If there is no parent node run the query against the scope.
		queryRoot = scope.parentNode || scope;
	}

	// invalid queries:
	// [">", "body >", "#t >", ".foo >", "> *", "> h3", ">", "> *", "> [qux]", "> [qux]", "> [qux]", ">", "> *", ">*", "+", "~", "#foo ~", "#foo~", "#t span.foo:not(span:first-child)"]

	var n = queryRoot.querySelectorAll(query);

	// Remove synthetic id from element if set before
	if(syntheticIdSet){
		scope.id = "";
	}
	
	return n || [];
};



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/lang/mixin.js
********************/


;(function(d){
	
	// TODO: extraNems will be [] in non-IE browsers; remove the whole extraName thing in non-IE implemenatations?
	var empty = {}, extraNames;
	for(var i in {toString: 1}){ extraNames = []; break; }
	dojo._extraNames = extraNames = extraNames || ["hasOwnProperty", "valueOf", "isPrototypeOf",
		"propertyIsEnumerable", "toLocaleString", "toString"];

	d._mixin = function(/*Object*/ target, /*Object*/ source){
		// summary:
		//		Adds all properties and methods of source to target. This addition
		//		is "prototype extension safe", so that instances of objects
		//		will not pass along prototype defaults.
		var name, s, i = 0, l = extraNames.length;
		for(name in source){
			// the "tobj" condition avoid copying properties in "source"
			// inherited from Object.prototype.  For example, if target has a custom
			// toString() method, don't overwrite it with the toString() method
			// that source inherited from Object.prototype
			s = source[name];
			if(s !== empty[name] && s !== target[name]){
				target[name] = s;
			}
		}
		//>>excludeStart("webkitMobile", kwArgs.webkitMobile);
		// IE doesn't recognize some custom functions in for..in
		if(l && source){
			for(; i < l; ++i){
				name = extraNames[i];
				s = source[name];
				if(s !== empty[name] && s !== target[name]){
					target[name] = s;
				}
			}
		}
		//>>excludeEnd("webkitMobile");
		return target; // Object
	}

	dojo.mixin = function(/*Object*/obj, /*Object...*/props){
		// summary:
		//		Adds all properties and methods of props to obj and returns the
		//		(now modified) obj.
		//	description:
		//		`dojo.mixin` can mix multiple source objects into a
		//		destionation object which is then returned. Unlike regular
		//		`for...in` iteration, `dojo.mixin` is also smart about avoiding
		//		extensions which other toolkits may unwisely add to the root
		//		object prototype
		//	obj:
		//		The object to mix properties into. Also the return value.
		//	props:
		//		One or more objects whose values are successively copied into
		//		obj. If more than one of these objects contain the same value,
		//		the one specified last in the function call will "win".
		//	example:
		//		make a shallow copy of an object
		//	|	var copy = dojo.mixin({}, source);
		//	example:
		//		many class constructors often take an object which specifies
		//		values to be configured on the object. In this case, it is
		//		often simplest to call `dojo.mixin` on the `this` object:
		//	|	dojo.declare("acme.Base", null, {
		//	|		constructor: function(properties){
		//	|			// property configuration:
		//	|			dojo.mixin(this, properties);
		//	|
		//	|			console.log(this.quip);
		//	|			//  ...
		//	|		},
		//	|		quip: "I wasn't born yesterday, you know - I've seen movies.",
		//	|		// ...
		//	|	});
		//	|
		//	|	// create an instance of the class and configure it
		//	|	var b = new acme.Base({quip: "That's what it does!" });
		//	example:
		//		copy in properties from multiple objects
		//	|	var flattened = dojo.mixin(
		//	|		{
		//	|			name: "Frylock",
		//	|			braces: true
		//	|		},
		//	|		{
		//	|			name: "Carl Brutanananadilewski"
		//	|		}
		//	|	);
		//	|
		//	|	// will print "Carl Brutanananadilewski"
		//	|	console.log(flattened.name);
		//	|	// will print "true"
		//	|	console.log(flattened.braces);
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			d._mixin(obj, arguments[i]);
		}
		return obj; // Object
	}
	
	// implementation of safe mixin function
	dojo.safeMixin = function(target, source){
		//	summary:
		//		Mix in properties skipping a constructor and decorating functions
		//		like it is done by dojo.declare.
		//	target: Object
		//		Target object to accept new properties.
		//	source: Object
		//		Source object for new properties.
		//	description:
		//		This function is used to mix in properties like dojo._mixin does,
		//		but it skips a constructor property and decorates functions like
		//		dojo.declare does.
		//
		//		It is meant to be used with classes and objects produced with
		//		dojo.declare. Functions mixed in with dojo.safeMixin can use
		//		this.inherited() like normal methods.
		//
		//		This function is used to implement extend() method of a constructor
		//		produced with dojo.declare().
		//
		//	example:
		//	|	var A = dojo.declare(null, {
		//	|		m1: function(){
		//	|			console.log("A.m1");
		//	|		},
		//	|		m2: function(){
		//	|			console.log("A.m2");
		//	|		}
		//	|	});
		//	|	var B = dojo.declare(A, {
		//	|		m1: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("B.m1");
		//	|		}
		//	|	});
		//	|	B.extend({
		//	|		m2: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("B.m2");
		//	|		}
		//	|	});
		//	|	var x = new B();
		//	|	dojo.safeMixin(x, {
		//	|		m1: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("X.m1");
		//	|		},
		//	|		m2: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("X.m2");
		//	|		}
		//	|	});
		//	|	x.m2();
		//	|	// prints:
		//	|	// A.m1
		//	|	// B.m1
		//	|	// X.m1
		var name, t, i = 0, l = d._extraNames.length;
		var op = Object.prototype, opts = op.toString, cname = "constructor";
		
		// add props adding metadata for incoming functions skipping a constructor
		for(name in source){
			t = source[name];
			if((t !== op[name] || !(name in op)) && name != cname){
				if(opts.call(t) == "[object Function]"){
					// non-trivial function method => attach its name
					t.nom = name;
				}
				target[name] = t;
			}
		}
		// process unenumerable methods on IE
		//TODO: move unneeded iteration to ie branch?
		for(; i < l; ++i){
			name = d._extraNames[i];
			t = source[name];
			if((t !== op[name] || !(name in op)) && name != cname){
				if(opts.call(t) == "[object Function]"){
					// non-trivial function method => attach its name
					t.nom = name;
				}
				target[name] = t;
			}
		}
		return target;
	}

}(dojo));



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/html/style.js
********************/


;(function(d){

	// =============================
	// Style Functions
	// =============================

	// getComputedStyle drives most of the style code.
	// Wherever possible, reuse the returned object.
	//
	// API functions below that need to access computed styles accept an
	// optional computedStyle parameter.
	// If this parameter is omitted, the functions will call getComputedStyle themselves.
	// This way, calling code can access computedStyle once, and then pass the reference to
	// multiple API functions.

	// Although we normally eschew argument validation at this
	// level, here we test argument 'node' for (duck)type,
	// by testing nodeType, ecause 'document' is the 'parentNode' of 'body'
	// it is frequently sent to this function even
	// though it is not Element.
	d._getComputedStyle = function(node){
		//	summary:
		//		Returns a "computed style" object.
		//
		//	description:
		//		Gets a "computed style" object which can be used to gather
		//		information about the current state of the rendered node.
		//
		//		Note that this may behave differently on different browsers.
		//		Values may have different formats and value encodings across
		//		browsers.
		//
		//		Note also that this method is expensive.  Wherever possible,
		//		reuse the returned object.
		//
		//		Use the dojo.style() method for more consistent (pixelized)
		//		return values.
		//
		//	node: DOMNode
		//		A reference to a DOM node. Does NOT support taking an
		//		ID string for speed reasons.
		//	example:
		//	|	dojo.getComputedStyle(dojo.byId('foo')).borderWidth;
		//
		//	example:
		//	Reusing the returned object, avoiding multiple lookups:
		//	|	var cs = dojo.getComputedStyle(dojo.byId("someNode"));
		//	|	var w = cs.width, h = cs.height;
		//	returns: CSS2Properties
		
		/* We once had the following impl. Why?
			var s;
			if(node.nodeType == 1){
				var dv = node.ownerDocument.defaultView;
				s = dv.getComputedStyle(node, null);
				if(!s && node.style){
					node.style.display = "";
					s = dv.getComputedStyle(node, null);
				}
			}
			return s || {};
		*/
		
		return node.nodeType == 1 ?
			node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
	};



	var _floatStyle = "cssFloat",
		_floatAliases = { "cssFloat": _floatStyle, "styleFloat": _floatStyle, "float": _floatStyle }
	;

	// public API

	d._style = function(	/*DomNode|String*/ node,
							/*String?|Object?*/ style,
							/*String?*/ value){
		//	summary:
		//		Accesses styles on a node. If 2 arguments are
		//		passed, acts as a getter. If 3 arguments are passed, acts
		//		as a setter.
		//	description:
		//		Getting the style value uses the computed style for the node, so the value
		//		will be a calculated value, not just the immediate node.style value.
		//		Also when getting values, use specific style names,
		//		like "borderBottomWidth" instead of "border" since compound values like
		//		"border" are not necessarily reflected as expected.
		//		If you want to get node dimensions, use dojo.marginBox() or
		//		dojo.contentBox().
		//	node:
		//		id or reference to node to get/set style for
		//	style:
		//		the style property to set in DOM-accessor format
		//		("borderWidth", not "border-width") or an object with key/value
		//		pairs suitable for setting each property.
		//	value:
		//		If passed, sets value on the node for style, handling
		//		cross-browser concerns.  When setting a pixel value,
		//		be sure to include "px" in the value. For instance, top: "200px".
		//		Otherwise, in some cases, some browsers will not apply the style.
		//	example:
		//		Passing only an ID or node returns the computed style object of
		//		the node:
		//	|	dojo.style("thinger");
		//	example:
		//		Passing a node and a style property returns the current
		//		normalized, computed value for that property:
		//	|	dojo.style("thinger", "opacity"); // 1 by default
		//
		//	example:
		//		Passing a node, a style property, and a value changes the
		//		current display of the node and returns the new computed value
		//	|	dojo.style("thinger", "opacity", 0.5); // == 0.5
		//
		//	example:
		//		Passing a node, an object-style style property sets each of the values in turn and returns the computed style object of the node:
		//	|	dojo.style("thinger", {
		//	|		"opacity": 0.5,
		//	|		"border": "3px solid black",
		//	|		"height": "300px"
		//	|	});
		//
		// 	example:
		//		When the CSS style property is hyphenated, the JavaScript property is camelCased.
		//		font-size becomes fontSize, and so on.
		//	|	dojo.style("thinger",{
		//	|		fontSize:"14pt",
		//	|		letterSpacing:"1.2em"
		//	|	});
		//
		//	example:
		//		dojo.NodeList implements .style() using the same syntax, omitting the "node" parameter, calling
		//		dojo.style() on every element of the list. See: dojo.query and dojo.NodeList
		//	|	dojo.query(".someClassName").style("visibility","hidden");
		//	|	// or
		//	|	dojo.query("#baz > div").style({
		//	|		opacity:0.75,
		//	|		fontSize:"13pt"
		//	|	});
		//
		//	returns: Number
		//	returns: CSS2Properties||String||Number

		var n = dojo.byId(node), l = arguments.length;
		style = _floatAliases[style] || style;
		if(l == 3){
			return n.style[style] = value; /*Number*/
		}
		var s = d._getComputedStyle(n);
		if(l == 2 && typeof style != "string"){ // inline'd type check
			for(var x in style){
				d._style(node, x, style[x]);
			}
			return s;
		}
		return (l == 1) ? s : parseFloat(s[style] || n.style[style]) || s[style]; /* CSS2Properties||String||Number */
	}
	
})(dojo);

dojo.getComputedStyle = dojo._getComputedStyle;
dojo.style = dojo._style;



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/lang/is.js
********************/


// Crockford (ish) functions

dojo.isString = function(/*anything*/ it){
	//	summary:
	//		Return true if it is a String
	return (typeof it == "string" || it instanceof String); // Boolean
}

dojo.isArray = function(/*anything*/ it){
	//	summary:
	//		Return true if it is an Array
	return it && (it instanceof Array || typeof it == "array"); // Boolean
}

/*=====
dojo.isFunction = function(it){
	// summary: Return true if it is a Function
	// it: anything
	return; // Boolean
}
=====*/

dojo.isFunction = (function(){
	var _isFunction = function(/*anything*/ it){
		var t = typeof it; // must evaluate separately due to bizarre Opera bug. See #8937
		//Firefox thinks object HTML element is a function, so test for nodeType.
		return it && (t == "function" || it instanceof Function) && !it.nodeType; // Boolean
	};

	return dojo.isSafari ?
		// only slow this down w/ gratuitious casting in Safari (not WebKit)
		function(/*anything*/ it){
			if(typeof it == "function" && it == "[object NodeList]"){ return false; }
			return _isFunction(it); // Boolean
		} : _isFunction;
})();

dojo.isObject = function(/*anything*/ it){
	// summary:
	//		Returns true if it is a JavaScript object (or an Array, a Function
	//		or null)
	return it !== undefined &&
		(it === null || typeof it == "object" || dojo.isArray(it) || dojo.isFunction(it)); // Boolean
}

dojo.isArrayLike = function(/*anything*/ it){
	//	summary:
	//		similar to dojo.isArray() but more permissive
	//	description:
	//		Doesn't strongly test for "arrayness".  Instead, settles for "isn't
	//		a string or number and has a length property". Arguments objects
	//		and DOM collections will return true when passed to
	//		dojo.isArrayLike(), but will return false when passed to
	//		dojo.isArray().
	//	returns:
	//		If it walks like a duck and quacks like a duck, return `true`
	var d = dojo;
	return it && it !== undefined && // Boolean
		// keep out built-in constructors (Number, String, ...) which have length
		// properties
		!d.isString(it) && !d.isFunction(it) &&
		!(it.tagName && it.tagName.toLowerCase() == 'form') &&
		(d.isArray(it) || isFinite(it.length));
}

dojo.isAlien = function(/*anything*/ it){
	// summary:
	//		Returns true if it is a built-in function or some other kind of
	//		oddball that *should* report as a function but doesn't
	return it && !dojo.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it)); // Boolean
}

dojo.isNumeric = function(n){
	return n==parseFloat(n);
}

dojo.isNumber = function(n){
	return typeof n == "number" || n instanceof Number;
}



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/lang/hitch.js
********************/


dojo._hitchArgs = function(scope, method /*,...*/){
	var pre = dojo.toArray(arguments, 2);
	var named = dojo.isString(method);
	return function(){
		// arrayify arguments
		var args = dojo.toArray(arguments);
		// locate our method
		var f = named ? (scope||dojo.global)[method] : method;
		// invoke with collected args
		return f && f.apply(scope || this, pre.concat(args)); // mixed
 	} // Function
}

dojo.hitch = function(/*Object*/scope, /*Function|String*/method /*,...*/){
	//	summary:
	//		Returns a function that will only ever execute in the a given scope.
	//		This allows for easy use of object member functions
	//		in callbacks and other places in which the "this" keyword may
	//		otherwise not reference the expected scope.
	//		Any number of default positional arguments may be passed as parameters
	//		beyond "method".
	//		Each of these values will be used to "placehold" (similar to curry)
	//		for the hitched function.
	//	scope:
	//		The scope to use when method executes. If method is a string,
	//		scope is also the object containing method.
	//	method:
	//		A function to be hitched to scope, or the name of the method in
	//		scope to be hitched.
	//	example:
	//	|	dojo.hitch(foo, "bar")();
	//		runs foo.bar() in the scope of foo
	//	example:
	//	|	dojo.hitch(foo, myFunction);
	//		returns a function that runs myFunction in the scope of foo
	if(arguments.length > 2){
		return dojo._hitchArgs.apply(dojo, arguments); // Function
	}
	if(!method){
		method = scope;
		scope = null;
	}
	if(dojo.isString(method)){
		scope = scope || dojo.global;
		if(!scope[method]){ throw(['dojo.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
		return function(){ return scope[method].apply(scope, arguments || []); }; // Function
	}
	return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
}



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/connect/connect.js
********************/


// this file courtesy of the TurboAjax Group, licensed under a Dojo CLA

// low-level delegation machinery
dojo._listener = {
	// create a dispatcher function
	getDispatcher: function(){
		// following comments pulled out-of-line to prevent cloning them 
		// in the returned function.
		// - indices (i) that are really in the array of listeners (ls) will 
		//   not be in Array.prototype. This is the 'sparse array' trick
		//   that keeps us safe from libs that take liberties with built-in 
		//   objects
		// - listener is invoked with current scope (this)
		return function(){
			var ap=Array.prototype, c=arguments.callee, ls=c._listeners, t=c.target;
			// return value comes from original target function
			var r = t && t.apply(this, arguments);
			// make local copy of listener array so it is immutable during processing
			var i, lls;
			lls = [].concat(ls);

			// invoke listeners after target function
			for(i in lls){
				if(!(i in ap)){
					lls[i].apply(this, arguments);
				}
			}
			// return value comes from original target function
			return r;
		};
	},
	// add a listener to an object
	add: function(/*Object*/ source, /*String*/ method, /*Function*/ listener){
		// Whenever 'method' is invoked, 'listener' will have the same scope.
		// Trying to supporting a context object for the listener led to 
		// complexity. 
		// Non trivial to provide 'once' functionality here
		// because listener could be the result of a dojo.hitch call,
		// in which case two references to the same hitch target would not
		// be equivalent. 
		source = source || dojo.global;
		// The source method is either null, a dispatcher, or some other function
		var f = source[method];
		// Ensure a dispatcher
		if(!f || !f._listeners){
			var d = dojo._listener.getDispatcher();
			// original target function is special
			d.target = f;
			// dispatcher holds a list of listeners
			d._listeners = []; 
			// redirect source to dispatcher
			f = source[method] = d;
		}
		// The contract is that a handle is returned that can 
		// identify this listener for disconnect. 
		//
		// The type of the handle is private. Here is it implemented as Integer. 
		// DOM event code has this same contract but handle is Function 
		// in non-IE browsers.
		//
		// We could have separate lists of before and after listeners.
		return f._listeners.push(listener); /*Handle*/
	},
	// remove a listener from an object
	remove: function(/*Object*/ source, /*String*/ method, /*Handle*/ handle){
		var f = (source || dojo.global)[method];
		// remember that handle is the index+1 (0 is not a valid handle)
		if(f && f._listeners && handle--){
			delete f._listeners[handle];
		}
	}
};

// Multiple delegation for arbitrary methods.

// This unit knows nothing about DOM, but we include DOM aware documentation
// and dontFix argument here to help the autodocs. Actual DOM aware code is in
// event.js.

dojo.connect = dojo.on = function(/*Object|null*/ obj, 
						/*String*/ event, 
						/*Object|null*/ context, 
						/*String|Function*/ method,
						/*Boolean?*/ dontFix){
	// summary:
	//		`dojo.connect` is the core event handling and delegation method in
	//		Dojo. It allows one function to "listen in" on the execution of
	//		any other, triggering the second whenever the first is called. Many
	//		listeners may be attached to a function, and source functions may
	//		be either regular function calls or DOM events.
	//
	// description:
	//		Connects listeners to actions, so that after event fires, a
	//		listener is called with the same arguments passed to the original
	//		function.
	//
	//		Since `dojo.connect` allows the source of events to be either a
	//		"regular" JavaScript function or a DOM event, it provides a uniform
	//		interface for listening to all the types of events that an
	//		application is likely to deal with though a single, unified
	//		interface. DOM programmers may want to think of it as
	//		"addEventListener for everything and anything".
	//
	//		When setting up a connection, the `event` parameter must be a
	//		string that is the name of the method/event to be listened for. If
	//		`obj` is null, `dojo.global` is assumed, meaning that connections
	//		to global methods are supported but also that you may inadvertently
	//		connect to a global by passing an incorrect object name or invalid
	//		reference.
	//
	//		`dojo.connect` generally is forgiving. If you pass the name of a
	//		function or method that does not yet exist on `obj`, connect will
	//		not fail, but will instead set up a stub method. Similarly, null
	//		arguments may simply be omitted such that fewer than 4 arguments
	//		may be required to set up a connection See the examples for details.
	//
	//		The return value is a handle that is needed to 
	//		remove this connection with `dojo.disconnect`.
	//
	// obj: 
	//		The source object for the event function. 
	//		Defaults to `dojo.global` if null.
	//		If obj is a DOM node, the connection is delegated 
	//		to the DOM event manager (unless dontFix is true).
	//
	// event:
	//		String name of the event function in obj. 
	//		I.e. identifies a property `obj[event]`.
	//
	// context: 
	//		The object that method will receive as "this".
	//
	//		If context is null and method is a function, then method
	//		inherits the context of event.
	//	
	//		If method is a string then context must be the source 
	//		object object for method (context[method]). If context is null,
	//		dojo.global is used.
	//
	// method:
	//		A function reference, or name of a function in context. 
	//		The function identified by method fires after event does. 
	//		method receives the same arguments as the event.
	//		See context argument comments for information on method's scope.
	//
	// dontFix:
	//		If obj is a DOM node, set dontFix to true to prevent delegation 
	//		of this connection to the DOM event manager.
	//
	// example:
	//		When obj.onchange(), do ui.update():
	//	|	dojo.connect(obj, "onchange", ui, "update");
	//	|	dojo.connect(obj, "onchange", ui, ui.update); // same
	//
	// example:
	//		Using return value for disconnect:
	//	|	var link = dojo.connect(obj, "onchange", ui, "update");
	//	|	...
	//	|	dojo.disconnect(link);
	//
	// example:
	//		When onglobalevent executes, watcher.handler is invoked:
	//	|	dojo.connect(null, "onglobalevent", watcher, "handler");
	//
	// example:
	//		When ob.onCustomEvent executes, customEventHandler is invoked:
	//	|	dojo.connect(ob, "onCustomEvent", null, "customEventHandler");
	//	|	dojo.connect(ob, "onCustomEvent", "customEventHandler"); // same
	//
	// example:
	//		When ob.onCustomEvent executes, customEventHandler is invoked
	//		with the same scope (this):
	//	|	dojo.connect(ob, "onCustomEvent", null, customEventHandler);
	//	|	dojo.connect(ob, "onCustomEvent", customEventHandler); // same
	//
	// example:
	//		When globalEvent executes, globalHandler is invoked
	//		with the same scope (this):
	//	|	dojo.connect(null, "globalEvent", null, globalHandler);
	//	|	dojo.connect("globalEvent", globalHandler); // same

	// normalize arguments
	var a=arguments, args=[], i=0;
	// if a[0] is a String, obj was omitted
	args.push(dojo.isString(a[0]) ? null : a[i++], a[i++]);
	// if the arg-after-next is a String or Function, context was NOT omitted
	var a1 = a[i+1];
	args.push(dojo.isString(a1)||dojo.isFunction(a1) ? a[i++] : null, a[i++]);
	// absorb any additional arguments
	for(var l=a.length; i<l; i++){	args.push(a[i]); }
	// do the actual work
	return dojo._connect.apply(this, args); /*Handle*/
}

// used by non-browser hostenvs. always overriden by event.js
dojo._connect = function(obj, event, context, method){
	var l=dojo._listener, h=l.add(obj, event, dojo.hitch(context, method)); 
	return [obj, event, h, l]; // Handle
}

dojo.disconnect = function(/*Handle*/ handle){
	// summary:
	//		Remove a link created by dojo.connect.
	// description:
	//		Removes the connection between event and the method referenced by handle.
	// handle:
	//		the return value of the dojo.connect call that created the connection.
	if(handle && handle[0] !== undefined){
		dojo._disconnect.apply(this, handle);
		// let's not keep this reference
		delete handle[0];
	}
}

dojo._disconnect = function(obj, event, handle, listener){
	listener.remove(obj, event, handle);
}



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/connect/event.js
********************/


;(function(){

var del = (dojo._event_listener = {
		add: function(/*DOMNode*/ node, /*String*/ name, /*Function*/ fp){
			if(!node){return;} 
			name = del._normalizeEventName(name);
			node.addEventListener(name, fp, false);
			return fp; /*Handle*/
		},
		remove: function(/*DOMNode*/ node, /*String*/ event, /*Handle*/ handle){
			// summary:
			//		clobbers the listener from the node
			// node:
			//		DOM node to attach the event to
			// event:
			//		the name of the handler to remove the function from
			// handle:
			//		the handle returned from add
			if(node){
				event = del._normalizeEventName(event);
				node.removeEventListener(event, handle, false);
			}
		},
		_normalizeEventName: function(/*String*/ name){
			// Generally, name should be lower case, unless it is special
			// somehow (e.g. a Mozilla DOM event).
			// Remove 'on'.
			return name.slice(0,2) =="on" ? name.slice(2) : name;
		}
	});

	// DOM events
	
	dojo.fixEvent = function(/*Event*/ evt, /*DOMNode*/ sender){
		// summary:
		//		normalizes properties on the event object including event
		//		bubbling methods, keystroke normalization, and x/y positions
		// evt: Event
		//		native event object
		// sender: DOMNode
		//		node to treat as "currentTarget"
		return del._fixEvent(evt, sender);
	};

	dojo.stopEvent = function(/*Event*/ evt){
		// summary:
		//		prevents propagation and clobbers the default action of the
		//		passed event
		// evt: Event
		//		The event object. If omitted, window.event is used on IE.
		evt.preventDefault();
		evt.stopPropagation();
		// NOTE: below, this method is overridden for IE
	};
	
	// Unify connect and event listeners
	dojo._connect = function(obj, event, context, method, dontFix){
		// FIXME: need a more strict test
		var isNode = obj && (obj.nodeType||obj.attachEvent||obj.addEventListener);
		// choose one of three listener options: raw (connect.js), DOM event on a Node, custom event on a Node
		// we need the third option to provide leak prevention on broken browsers (IE)
		var lid = isNode ? 1 : 0, l = [dojo._listener, del][lid];
		// create a listener
		var h = l.add(obj, event, dojo.hitch(context, method));
		// formerly, the disconnect package contained "l" directly, but if client code
		// leaks the disconnect package (by connecting it to a node), referencing "l" 
		// compounds the problem.
		// instead we return a listener id, which requires custom _disconnect below.
		// return disconnect package
		return [ obj, event, h, lid ];
	};

	dojo._disconnect = function(obj, event, handle, listener){
		([dojo._listener, del][listener]).remove(obj, event, handle);
	};

	
})();



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/connect/pubsub.js
********************/



// topic publish/subscribe

dojo._topics = {};

dojo.subscribe = function(/*String*/ topic, /*Object|null*/ context, /*String|Function*/ method){
	//	summary:
	//		Attach a listener to a named topic. The listener function is invoked whenever the
	//		named topic is published (see: dojo.publish).
	//		Returns a handle which is needed to unsubscribe this listener.
	//	context:
	//		Scope in which method will be invoked, or null for default scope.
	//	method:
	//		The name of a function in context, or a function reference. This is the function that
	//		is invoked when topic is published.
	//	example:
	//	|	dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); });
	//	|	dojo.publish("alerts", [ "read this", "hello world" ]);																	

	// support for 2 argument invocation (omitting context) depends on hitch
	return [topic, dojo._listener.add(dojo._topics, topic, dojo.hitch(context, method))]; /*Handle*/
}

dojo.unsubscribe = function(/*Handle*/ handle){
	//	summary:
	//	 	Remove a topic listener. 
	//	handle:
	//	 	The handle returned from a call to subscribe.
	//	example:
	//	|	var alerter = dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
	//	|	...
	//	|	dojo.unsubscribe(alerter);
	if(handle){
		dojo._listener.remove(dojo._topics, handle[0], handle[1]);
	}
}

dojo.publish = function(/*String*/ topic, /*Array*/ args){
	//	summary:
	//	 	Invoke all listener method subscribed to topic.
	//	topic:
	//	 	The name of the topic to publish.
	//	args:
	//	 	An array of arguments. The arguments will be applied 
	//	 	to each topic subscriber (as first class parameters, via apply).
	//	example:
	//	|	dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
	//	|	dojo.publish("alerts", [ "read this", "hello world" ]);	

	// Note that args is an array, which is more efficient vs variable length
	// argument list.  Ideally, var args would be implemented via Array
	// throughout the APIs.
	var f = dojo._topics[topic];
	if(f){
		f.apply(this, args||[]);
	}
}

dojo.connectPublisher = function(	/*String*/ topic, 
									/*Object|null*/ obj, 
									/*String*/ event){
	//	summary:
	//	 	Ensure that every time obj.event() is called, a message is published
	//	 	on the topic. Returns a handle which can be passed to
	//	 	dojo.disconnect() to disable subsequent automatic publication on
	//	 	the topic.
	//	topic:
	//	 	The name of the topic to publish.
	//	obj: 
	//	 	The source object for the event function. Defaults to dojo.global
	//	 	if null.
	//	event:
	//	 	The name of the event function in obj. 
	//	 	I.e. identifies a property obj[event].
	//	example:
	//	|	dojo.connectPublisher("/ajax/start", dojo, "xhrGet");
	var pf = function(){ dojo.publish(topic, arguments); }
	return event ? dojo.connect(obj, event, pf) : dojo.connect(obj, pf); //Handle
};



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/html/attr.js
********************/


(function(d){
	// =============================
	// Element attribute Functions
	// =============================

	// dojo.attr() should conform to http://www.w3.org/TR/DOM-Level-2-Core/

	var _propNames = {
			// properties renamed to avoid clashes with reserved words
			"class":   "className",
			"for":     "htmlFor",
			// properties written as camelCase
			tabindex:  "tabIndex",
			readonly:  "readOnly",
			colspan:   "colSpan",
			frameborder: "frameBorder",
			rowspan:   "rowSpan",
			valuetype: "valueType"
		},
		_attrNames = {
			// original attribute names
			classname: "class",
			htmlfor:   "for",
			// for IE
			tabindex:  "tabIndex",
			readonly:  "readOnly"
		},
		_forcePropNames = {
			innerHTML: 1,
			className: 1,
			htmlFor:   0,
			value:     1
		};

	var _fixAttrName = function(/*String*/ name){
		return _attrNames[name.toLowerCase()] || name;
	};

	var _hasAttr = function(node, name){
		var attr = node.getAttributeNode && node.getAttributeNode(name);
		return attr && attr.specified; // Boolean
	};

	// There is a difference in the presence of certain properties and their default values
	// between browsers. For example, on IE "disabled" is present on all elements,
	// but it is value is "false"; "tabIndex" of <div> returns 0 by default on IE, yet other browsers
	// can return -1.

	d.hasAttr = function(/*DomNode|String*/node, /*String*/name){
		//	summary:
		//		Returns true if the requested attribute is specified on the
		//		given element, and false otherwise.
		//	node:
		//		id or reference to the element to check
		//	name:
		//		the name of the attribute
		//	returns:
		//		true if the requested attribute is specified on the
		//		given element, and false otherwise
		var lc = name.toLowerCase();
		return _forcePropNames[_propNames[lc] || name] || _hasAttr(d.byId(node), _attrNames[lc] || name);	// Boolean
	};

	var _evtHdlrMap = {}, _ctr = 0,
		_attrId = "_attrid",
		// the next dictionary lists elements with read-only innerHTML on IE
		_roInnerHtml = {col: 1, colgroup: 1,
			// frameset: 1, head: 1, html: 1, style: 1,
			table: 1, tbody: 1, tfoot: 1, thead: 1, tr: 1, title: 1};

	d.attr = function(/*DomNode|String*/node, /*String|Object*/name, /*String?*/value){
		//	summary:
		//		Gets or sets an attribute on an HTML element.
		//	description:
		//		Handles normalized getting and setting of attributes on DOM
		//		Nodes. If 2 arguments are passed, and a the second argumnt is a
		//		string, acts as a getter.
		//
		//		If a third argument is passed, or if the second argument is a
		//		map of attributes, acts as a setter.
		//
		//		When passing functions as values, note that they will not be
		//		directly assigned to slots on the node, but rather the default
		//		behavior will be removed and the new behavior will be added
		//		using `dojo.connect()`, meaning that event handler properties
		//		will be normalized and that some caveats with regards to
		//		non-standard behaviors for onsubmit apply. Namely that you
		//		should cancel form submission using `dojo.stopEvent()` on the
		//		passed event object instead of returning a boolean value from
		//		the handler itself.
		//	node:
		//		id or reference to the element to get or set the attribute on
		//	name:
		//		the name of the attribute to get or set.
		//	value:
		//		The value to set for the attribute
		//	returns:
		//		when used as a getter, the value of the requested attribute
		//		or null if that attribute does not have a specified or
		//		default value;
		//
		//		when used as a setter, the DOM node
		//
		//	example:
		//	|	// get the current value of the "foo" attribute on a node
		//	|	dojo.attr(dojo.byId("nodeId"), "foo");
		//	|	// or we can just pass the id:
		//	|	dojo.attr("nodeId", "foo");
		//
		//	example:
		//	|	// use attr() to set the tab index
		//	|	dojo.attr("nodeId", "tabIndex", 3);
		//	|
		//
		//	example:
		//	Set multiple values at once, including event handlers:
		//	|	dojo.attr("formId", {
		//	|		"foo": "bar",
		//	|		"tabIndex": -1,
		//	|		"method": "POST",
		//	|		"onsubmit": function(e){
		//	|			// stop submitting the form. Note that the IE behavior
		//	|			// of returning true or false will have no effect here
		//	|			// since our handler is connect()ed to the built-in
		//	|			// onsubmit behavior and so we need to use
		//	|			// dojo.stopEvent() to ensure that the submission
		//	|			// doesn't proceed.
		//	|			dojo.stopEvent(e);
		//	|
		//	|			// submit the form with Ajax
		//	|			dojo.xhrPost({ form: "formId" });
		//	|		}
		//	|	});
		//
		//	example:
		//	Style is s special case: Only set with an object hash of styles
		//	|	dojo.attr("someNode",{
		//	|		id:"bar",
		//	|		style:{
		//	|			width:"200px", height:"100px", color:"#000"
		//	|		}
		//	|	});
		//
		//	example:
		//	Again, only set style as an object hash of styles:
		//	|	var obj = { color:"#fff", backgroundColor:"#000" };
		//	|	dojo.attr("someNode", "style", obj);
		//	|
		//	|	// though shorter to use `dojo.style()` in this case:
		//	|	dojo.style("someNode", obj);

		node = d.byId(node);
		var args = arguments.length, prop;
		if(args == 2 && typeof name != "string"){ // inline'd type check
			// the object form of setter: the 2nd argument is a dictionary
			for(var x in name){
				d.attr(node, x, name[x]);
			}
			return node; // DomNode
		}
		var lc = name.toLowerCase(),
			propName = _propNames[lc] || name,
			forceProp = _forcePropNames[propName],
			attrName = _attrNames[lc] || name;
		if(args == 3){
			// setter
			do{
				if(propName == "style" && typeof value != "string"){ // inline'd type check
					// special case: setting a style
					d.style(node, value);
					break;
				}
				if(propName == "innerHTML"){
					node[propName] = value;
					break;
				}
				if(d.isFunction(value)){
					// special case: assigning an event handler
					// clobber if we can
					var attrId = d.attr(node, _attrId);
					if(!attrId){
						attrId = _ctr++;
						d.attr(node, _attrId, attrId);
					}
					if(!_evtHdlrMap[attrId]){
						_evtHdlrMap[attrId] = {};
					}
					var h = _evtHdlrMap[attrId][propName];
					if(h){
						d.disconnect(h);
					}else{
						try{
							delete node[propName];
						}catch(e){}
					}
					// ensure that event objects are normalized, etc.
					_evtHdlrMap[attrId][propName] = d.connect(node, propName, value);
					break;
				}
				if(forceProp || typeof value == "boolean"){
					// special case: forcing assignment to the property
					// special case: setting boolean to a property instead of attribute
					node[propName] = value;
					break;
				}
				// node's attribute
				node.setAttribute(attrName, value);
			}while(false);
			return node; // DomNode
		}
		// getter
		// should we access this attribute via a property or
		// via getAttribute()?
		value = node[propName];
		if(forceProp && typeof value != "undefined"){
			// node's property
			return value;	// Anything
		}
		if(propName != "href" && (typeof value == "boolean" || d.isFunction(value))){
			// node's property
			return value;	// Anything
		}
		// node's attribute
		// we need _hasAttr() here to guard against IE returning a default value
		return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
	};

	d.removeAttr = function(/*DomNode|String*/ node, /*String*/ name){
		//	summary:
		//		Removes an attribute from an HTML element.
		//	node:
		//		id or reference to the element to remove the attribute from
		//	name:
		//		the name of the attribute to remove
		d.byId(node).removeAttribute(_fixAttrName(name));
	};
})(dojo);



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/html/element.js
********************/


;(function(d){

	var byId = d.byId;
	
	// support stuff for dojo._toDom
	var tagWrap = {
			option: ["select"],
			tbody: ["table"],
			thead: ["table"],
			tfoot: ["table"],
			tr: ["table", "tbody"],
			td: ["table", "tbody", "tr"],
			th: ["table", "thead", "tr"],
			legend: ["fieldset"],
			caption: ["table"],
			colgroup: ["table"],
			col: ["table", "colgroup"],
			li: ["ul"]
		},
		reTag = /<\s*([\w\:]+)/,
		masterNode = {}, masterNum = 0,
		masterName = "__" + d._scopeName + "ToDomId";

	// generate start/end tag strings to use
	// for the injection for each special tag wrap case.
	for(var param in tagWrap){
		var tw = tagWrap[param];
		tw.pre  = param == "option" ? '<select multiple="multiple">' : "<" + tw.join("><") + ">";
		tw.post = "</" + tw.reverse().join("></") + ">";
		// the last line is destructive: it reverses the array,
		// but we don't care at this point
	}

	d._toDom = function(frag, doc){
		//	summary:
		// 		converts HTML string into DOM nodes.

		doc = doc || d.doc;
		var masterId = doc[masterName];
		if(!masterId){
			doc[masterName] = masterId = ++masterNum + "";
			masterNode[masterId] = doc.createElement("div");
		}

		// make sure the frag is a string.
		frag += "";

		// find the starting tag, and get node wrapper
		var match = frag.match(reTag),
			tag = match ? match[1].toLowerCase() : "",
			master = masterNode[masterId],
			wrap, i, fc, df;
		if(match && tagWrap[tag]){
			wrap = tagWrap[tag];
			master.innerHTML = wrap.pre + frag + wrap.post;
			for(i = wrap.length; i; --i){
				master = master.firstChild;
			}
		}else{
			master.innerHTML = frag;
		}

		// one node shortcut => return the node itself
		if(master.childNodes.length == 1){
			return master.removeChild(master.firstChild); // DOMNode
		}

		// return multiple nodes as a document fragment
		df = doc.createDocumentFragment();
		while(fc = master.firstChild){ // intentional assignment
			df.appendChild(fc);
		}
		return df; // DOMNode
	}

	d._docScroll = function(){
		var n = d.global;
		return "pageXOffset" in n? { x:n.pageXOffset, y:n.pageYOffset } :
			(n=d.doc.documentElement, n.clientHeight? { x:n.scrollLeft, y:n.scrollTop } :
			(n=d.body(), { x:n.scrollLeft||0, y:n.scrollTop||0 }));
	};

	var _insertBefore = function(/*DomNode*/node, /*DomNode*/ref){
		var parent = ref.parentNode;
		if(parent){
			parent.insertBefore(node, ref);
		}
	};

	var _insertAfter = function(/*DomNode*/node, /*DomNode*/ref){
		//	summary:
		//		Try to insert node after ref
		var parent = ref.parentNode;
		if(parent){
			if(parent.lastChild == ref){
				parent.appendChild(node);
			}else{
				parent.insertBefore(node, ref.nextSibling);
			}
		}
	};

	d.place = function(node, refNode, position){
		//	summary:
		//		Attempt to insert node into the DOM, choosing from various positioning options.
		//		Returns the first argument resolved to a DOM node.
		//
		//	node: String|DomNode
		//		id or node reference, or HTML fragment starting with "<" to place relative to refNode
		//
		//	refNode: String|DomNode
		//		id or node reference to use as basis for placement
		//
		//	position: String|Number?
		//		string noting the position of node relative to refNode or a
		//		number indicating the location in the childNodes collection of refNode.
		//		Accepted string values are:
		//	|	* before
		//	|	* after
		//	|	* replace
		//	|	* only
		//	|	* first
		//	|	* last
		//		"first" and "last" indicate positions as children of refNode, "replace" replaces refNode,
		//		"only" replaces all children.  position defaults to "last" if not specified
		//
		//	returns: DomNode
		//		Returned values is the first argument resolved to a DOM node.
		//
		//		.place() is also a method of `dojo.NodeList`, allowing `dojo.query` node lookups.
		//
		// example:
		//		Place a node by string id as the last child of another node by string id:
		//	|	dojo.place("someNode", "anotherNode");
		//
		// example:
		//		Place a node by string id before another node by string id
		//	|	dojo.place("someNode", "anotherNode", "before");
		//
		// example:
		//		Create a Node, and place it in the body element (last child):
		//	|	dojo.place("<div></div>", dojo.body());
		//
		// example:
		//		Put a new LI as the first child of a list by id:
		//	|	dojo.place("<li></li>", "someUl", "first");

		refNode = byId(refNode);
		if(typeof node == "string"){ // inline'd type check
			node = node.charAt(0) == "<" ? d._toDom(node, refNode.ownerDocument) : byId(node);
		}
		if(typeof position == "number"){ // inline'd type check
			var cn = refNode.childNodes;
			if(!cn.length || cn.length <= position){
				refNode.appendChild(node);
			}else{
				_insertBefore(node, cn[position < 0 ? 0 : position]);
			}
		}else{
			switch(position){
				case "before":
					_insertBefore(node, refNode);
					break;
				case "after":
					_insertAfter(node, refNode);
					break;
				case "replace":
					refNode.parentNode.replaceChild(node, refNode);
					break;
				case "only":
					d.empty(refNode);
					refNode.appendChild(node);
					break;
				case "first":
					if(refNode.firstChild){
						_insertBefore(node, refNode.firstChild);
						break;
					}
					// else fallthrough...
				default: // aka: last
					refNode.appendChild(node);
			}
		}
		return node; // DomNode
	};
	
	d.create = function(tag, attrs, refNode, pos){
		//	summary:
		//		Create an element, allowing for optional attribute decoration
		//		and placement.
		//
		// description:
		//		A DOM Element creation function. A shorthand method for creating a node or
		//		a fragment, and allowing for a convenient optional attribute setting step,
		//		as well as an optional DOM placement reference.
		//|
		//		Attributes are set by passing the optional object through `dojo.attr`.
		//		See `dojo.attr` for noted caveats and nuances, and API if applicable.
		//|
		//		Placement is done via `dojo.place`, assuming the new node to be the action 
		//		node, passing along the optional reference node and position.
		//
		// tag: String|DomNode
		//		A string of the element to create (eg: "div", "a", "p", "li", "script", "br"),
		//		or an existing DOM node to process.
		//
		// attrs: Object
		//		An object-hash of attributes to set on the newly created node.
		//		Can be null, if you don't want to set any attributes/styles.
		//		See: `dojo.attr` for a description of available attributes.
		//		TODO: Clarify what attrs are allowed.
		//
		// refNode: String?|DomNode?
		//		Optional reference node. Used by `dojo.place` to place the newly created
		//		node somewhere in the dom relative to refNode. Can be a DomNode reference
		//		or String ID of a node.
		//
		// pos: String?
		//		Optional positional reference. Defaults to "last" by way of `dojo.place`,
		//		though can be set to "first","after","before","last", "replace" or "only"
		//		to further control the placement of the new node relative to the refNode.
		//		'refNode' is required if a 'pos' is specified.
		//
		// returns: DomNode
		//
		// example:
		//	Create a DIV:
		//	|	var n = dojo.create("div");
		//
		// example:
		//	Create a DIV with content:
		//	|	var n = dojo.create("div", { innerHTML:"<p>hi</p>" });
		//
		// example:
		//	Place a new DIV in the BODY, with no attributes set
		//	|	var n = dojo.create("div", null, dojo.body());
		//
		// example:
		//	Create an UL, and populate it with LI's. Place the list as the first-child of a 
		//	node with id="someId":
		//	|	var ul = dojo.create("ul", null, "someId", "first");
		//	|	var items = ["one", "two", "three", "four"];
		//	|	dojo.forEach(items, function(data){
		//	|		dojo.create("li", { innerHTML: data }, ul);
		//	|	});
		//
		// example:
		//	Create an anchor, with an href. Place in BODY:
		//	|	dojo.create("a", { href:"foo.html", title:"Goto FOO!" }, dojo.body());
		//
		// example:
		//	Create a `dojo.NodeList()` from a new element (for syntatic sugar):
		//	|	dojo.query(dojo.create('div'))
		//	|		.addClass("newDiv")
		//	|		.onclick(function(e){ console.log('clicked', e.target) })
		//	|		.place("#someNode"); // redundant, but cleaner.

		var doc = d.doc;
		if(refNode){
			refNode = byId(refNode);
			doc = refNode.ownerDocument;
		}
		if(typeof tag == "string"){ // inline'd type check
			tag = doc.createElement(tag);
		}
		if(attrs){
			//d.attr(tag, attrs);
			for(var prop in attrs){
				switch(prop){
					case 'class':
						tag.className = attrs[prop];
						break;
					default:
						tag[prop] = attrs[prop];
				}
			}
		}
		if(refNode){ d.place(tag, refNode, pos); }
		return tag; // DomNode
	};
	
	d.empty = function(node){
		byId(node).innerHTML = "";
	};

})(dojo);



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/lang/object.js
********************/



dojo._getProp = function(/*Array*/parts, /*Boolean*/create, /*Object?*/context){
	var obj=context || dojo.global;
	for(var i=0, p; obj && (p=parts[i]); i++){
		//if(i == 0 && d._scopeMap[p]){
		//	p = d._scopeMap[p];
		//}
		obj = (p in obj ? obj[p] : (create ? obj[p]={} : undefined));
	}
	return obj; // mixed
};

dojo.setObject = function(/*String*/name, /*Object*/value, /*Object?*/context){
	// summary:
	//		Set a property from a dot-separated string, such as "A.B.C"
	//	description:
	//		Useful for longer api chains where you have to test each object in
	//		the chain, or when you have an object reference in string format.
	//		Objects are created as needed along `path`. Returns the passed
	//		value if setting is successful or `undefined` if not.
	//	name:
	//		Path to a property, in the form "A.B.C".
	//	context:
	//		Optional. Object to use as root of path. Defaults to
	//		`dojo.global`.
	//	example:
	//		set the value of `foo.bar.baz`, regardless of whether
	//		intermediate objects already exist:
	//	|	dojo.setObject("foo.bar.baz", value);
	//	example:
	//		without `dojo.setObject`, we often see code like this:
	//	|	// ensure that intermediate objects are available
	//	|	if(!obj["parent"]){ obj.parent = {}; }
	//	|	if(!obj.parent["child"]){ obj.parent.child= {}; }
	//	|	// now we can safely set the property
	//	|	obj.parent.child.prop = "some value";
	//		wheras with `dojo.setObject`, we can shorten that to:
	//	|	dojo.setObject("parent.child.prop", "some value", obj);
	var parts=name.split("."), p=parts.pop(), obj=dojo._getProp(parts, true, context);
	return obj && p ? (obj[p]=value) : undefined; // Object
};

dojo.getObject = function(/*String*/name, /*Boolean?*/create, /*Object?*/context){
	// summary:
	//		Get a property from a dot-separated string, such as "A.B.C"
	//	description:
	//		Useful for longer api chains where you have to test each object in
	//		the chain, or when you have an object reference in string format.
	//	name:
	//		Path to an property, in the form "A.B.C".
	//	create:
	//		Optional. Defaults to `false`. If `true`, Objects will be
	//		created at any point along the 'path' that is undefined.
	//	context:
	//		Optional. Object to use as root of path. Defaults to
	//		'dojo.global'. Null may be passed.
	return dojo._getProp(name.split("."), create, context); // Object
};



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/lang/string.js
********************/


/*=====
dojo.trim = function(str){
	//	summary:
	//		Trims whitespace from both sides of the string
	//	str: String
	//		String to be trimmed
	//	returns: String
	//		Returns the trimmed string
	//	description:
	//		This version of trim() was selected for inclusion into the base due
	//		to its compact size and relatively good performance
	//		(see [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript)
	//		Uses String.prototype.trim instead, if available.
	//		The fastest but longest version of this function is located at
	//		dojo.string.trim()
	return "";	// String
}
=====*/

dojo.trim = String.prototype.trim ?
	function(str){ return str.trim(); } :
	function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

/*=====
dojo.replace = function(tmpl, map, pattern){
	//	summary:
	//		Performs parameterized substitutions on a string. Throws an
	//		exception if any parameter is unmatched. 
	//	tmpl: String
	//		String to be used as a template.
	//	map: Object|Function
	//		If an object, it is used as a dictionary to look up substitutions.
	//		If a function, it is called for every substitution with following
	//		parameters: a whole match, a name, an offset, and the whole template
	//		string (see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/replace
	//		for more details).
	//	pattern: RegEx?
	//		Optional regular expression objects that overrides the default pattern.
	//		Must be global and match one item. The default is: /\{([^\}]+)\}/g,
	//		which matches patterns like that: "{xxx}", where "xxx" is any sequence
	//		of characters, which doesn't include "}".
	//	returns: String
	//		Returns the substituted string.
	//	example:
	//	|	// uses a dictionary for substitutions:
	//	|	dojo.replace("Hello, {name.first} {name.last} AKA {nick}!",
	//	|	  {
	//	|	    nick: "Bob",
	//	|	    name: {
	//	|	      first:  "Robert",
	//	|	      middle: "X",
	//	|	      last:   "Cringely"
	//	|	    }
	//	|	  });
	//	|	// returns: Hello, Robert Cringely AKA Bob!
	//	example:
	//	|	// uses an array for substitutions:
	//	|	dojo.replace("Hello, {0} {2}!",
	//	|	  ["Robert", "X", "Cringely"]);
	//	|	// returns: Hello, Robert Cringely!
	//	example:
	//	|	// uses a function for substitutions:
	//	|	function sum(a){
	//	|	  var t = 0;
	//	|	  dojo.forEach(a, function(x){ t += x; });
	//	|	  return t;
	//	|	}
	//	|	dojo.replace(
	//	|	  "{count} payments averaging {avg} USD per payment.",
	//	|	  dojo.hitch(
	//	|	    { payments: [11, 16, 12] },
	//	|	    function(_, key){
	//	|	      switch(key){
	//	|	        case "count": return this.payments.length;
	//	|	        case "min":   return Math.min.apply(Math, this.payments);
	//	|	        case "max":   return Math.max.apply(Math, this.payments);
	//	|	        case "sum":   return sum(this.payments);
	//	|	        case "avg":   return sum(this.payments) / this.payments.length;
	//	|	      }
	//	|	    }
	//	|	  )
	//	|	);
	//	|	// prints: 3 payments averaging 13 USD per payment.
	//	example:
	//	|	// uses an alternative PHP-like pattern for substitutions:
	//	|	dojo.replace("Hello, ${0} ${2}!",
	//	|	  ["Robert", "X", "Cringely"], /\$\{([^\}]+)\}/g);
	//	|	// returns: Hello, Robert Cringely!
	return "";	// String
}
=====*/

var _pattern = /\{([^\}]+)\}/g;
dojo.replace = function(tmpl, map, pattern){
	return tmpl.replace(pattern || _pattern, dojo.isFunction(map) ?
		map : function(_, k){ return dojo.getObject(k, false, map); });
};



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/html/class.js
********************/


dojo.hasClass = function(/*DomNode|String*/node, /*String*/classStr){
	//	summary:
	//		Returns whether or not the specified classes are a portion of the
	//		class list currently applied to the node.
	//
	//	node:
	//		String ID or DomNode reference to check the class for.
	//
	//	classStr:
	//		A string class name to look for.
	//
	//	example:
	//	| if(dojo.hasClass("someNode","aSillyClassName")){ ... }
	return ((" "+ dojo.byId(node).className +" ").indexOf(" " + classStr + " ") >= 0);  // Boolean
};

dojo.toggleClass = function(/*DomNode|String*/node, /*String*/classStr, /*Boolean?*/condition){
	//	summary:
	//		Adds a class to node if not present, or removes if present.
	//		Pass a boolean condition if you want to explicitly add or remove.
	//	condition:
	//		If passed, true means to add the class, false means to remove.
	//
	// example:
	//	| dojo.toggleClass("someNode", "hovered");
	//
	// example:
	// 	Forcefully add a class
	//	| dojo.toggleClass("someNode", "hovered", true);
	//
	// example:
	//	Available in `dojo.NodeList` for multiple toggles
	//	| dojo.query(".toggleMe").toggleClass("toggleMe");

	if(condition === undefined){
		condition = !dojo.hasClass(node, classStr);
	}
	dojo[condition ? "addClass" : "removeClass"](node, classStr);
};

(function(){
	var spaces = /\s+/;
	var str2array = function(s){
		if(typeof s == "string" || s instanceof String){
			if(s.indexOf(" ") < 0){
				return [s];
			}else{
				return dojo.trim(s).split(spaces);
			}
		}
		// assumed to be an array
		return s;
	};

	dojo.addClass = function(node, classStr){
		//	summary:
		//		Adds the specified classes to the end of the class list on the
		//		passed node. Will not re-apply duplicate classes.
		//
		//	node: DomNode|String
		//		String ID or DomNode reference to add a class string too
		//
		//	classStr: String|Array
		//		A String class name to add, or several space-separated class names,
		//		or an array of class names.
		//
		// example:
		//	Add a class to some node:
		//	|	dojo.addClass("someNode", "anewClass");
		//
		// example:
		//	Add two classes at once:
		//	| 	dojo.addClass("someNode", "firstClass secondClass");
		//
		// example:
		//	Add two classes at once (using array):
		//	| 	dojo.addClass("someNode", ["firstClass", "secondClass"]);
		//
		// example:
		//	Available in `dojo.NodeList` for multiple additions
		//	| dojo.query("ul > li").addClass("firstLevel");
	
		node = dojo.byId(node);
		classStr = str2array(classStr);
		var cls = " " + node.className + " ";
		for(var i = 0, len = classStr.length, c; i < len; ++i){
			c = classStr[i];
			if(c && cls.indexOf(" " + c + " ") < 0){
				cls += c + " ";
			}
		}
		node.className = dojo.trim(cls);
	};
	
	dojo.removeClass = function(/*DomNode|String*/node, /*String|Array?*/classStr){
		// summary:
		//		Removes the specified classes from node. No `dojo.hasClass`
		//		check is required.
		//
		// node:
		// 		String ID or DomNode reference to remove the class from.
		//
		// classStr:
		//		An optional String class name to remove, or several space-separated
		//		class names, or an array of class names. If omitted, all class names
		//		will be deleted.
		//
		// example:
		//	Remove a class from some node:
		// 	| dojo.removeClass("someNode", "firstClass");
		//
		// example:
		//	Remove two classes from some node:
		// 	| dojo.removeClass("someNode", "firstClass secondClass");
		//
		// example:
		//	Remove two classes from some node (using array):
		// 	| dojo.removeClass("someNode", ["firstClass", "secondClass"]);
		//
		// example:
		//	Remove all classes from some node:
		// 	| dojo.removeClass("someNode");
		//
		// example:
		//	Available in `dojo.NodeList` for multiple removal
		//	| dojo.query(".foo").removeClass("foo");
	
		node = dojo.byId(node);
		var cls;
		if(classStr !== undefined){
			classStr = str2array(classStr);
			cls = " " + node.className + " ";
			for(var i = 0, len = classStr.length; i < len; ++i){
				cls = cls.replace(" " + classStr[i] + " ", " ");
			}
			cls = dojo.trim(cls);
		}else{
			cls = "";
		}
		if(node.className != cls){ node.className = cls; }
	};
})();



/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/html/ready.js
********************/


;(function(d){
	
	d._loaders = [];
	d._loadNotifying = false;

	d._onto = function(arr, obj, fn){
		if(!fn){
			arr.push(obj);
		}else if(fn){
			var func = (typeof fn == "string") ? obj[fn] : fn;
			arr.push(function(){ func.call(obj); });
		}
	}

	dojo.ready = dojo.addOnLoad = function(/*Object?*/obj, /*String|Function*/functionName){
		// summary:
		//		Registers a function to be triggered after the DOM has finished
		//		loading and widgets declared in markup have been instantiated.
		//		Images and CSS files may or may not have finished downloading when
		//		the specified function is called.  (Note that widgets' CSS and HTML
		//		code is guaranteed to be downloaded before said widgets are
		//		instantiated.)
		// example:
		//	|	dojo.addOnLoad(functionPointer);
		//	|	dojo.addOnLoad(object, "functionName");
		//	|	dojo.addOnLoad(object, function(){ /* ... */});
		
		d._onto(d._loaders, obj, functionName);

		//Added for xdomain loading. dojo.addOnLoad is used to
		//indicate callbacks after doing some dojo.require() statements.
		//In the xdomain case, if all the requires are loaded (after initial
		//page load), then immediately call any listeners.
		if(document.readyState === "complete" || ( d._postLoad && !d._loadNotifying )){
			d._callLoaded();
		}
	}
	
	dojo._callLoaded = function(){

		// The "object" check is for IE, and the other opera check fixes an
		// issue in Opera where it could not find the body element in some
		// widget test cases.  For 0.9, maybe route all browsers through the
		// setTimeout (need protection still for non-browser environments
		// though). This might also help the issue with FF 2.0 and freezing
		// issues where we try to do sync xhr while background css images are
		// being loaded (trac #2572)? Consider for 0.9.
		
		setTimeout("dojo.loaded();", 0);
	}
	
	dojo.loaded = function(){
		// summary:
		//		signal fired when initial environment and package loading is
		//		complete. You should use dojo.addOnLoad() instead of doing a 
		//		direct dojo.connect() to this method in order to handle
		//		initialization tasks that require the environment to be
		//		initialized. In a browser host,	declarative widgets will 
		//		be constructed when this function finishes runing.
		d._loadNotifying = true;
		d._postLoad = true;
		var mll = d._loaders;

		//Clear listeners so new ones can be added
		//For other xdomain package loads after the initial load.
		d._loaders = [];

		for(var x = 0; x < mll.length; x++){
			mll[x]();
		}

		d._loadNotifying = false;
		
		//Make sure nothing else got added to the onload queue
		//after this first run. If something did, and we are not waiting for any
		//more inflight resources, run again.
		if(d._postLoad && mll.length){
			d._callLoaded();
		}
	}
	
	dojo._initFired = false;
	dojo._loadInit = function(){

		if(!dojo._initFired){
			dojo._initFired = true;
			
			document.removeEventListener("DOMContentLoaded", dojo._loadInit, false);
			
			dojo._callLoaded();
		}
	}
	

	document.addEventListener("DOMContentLoaded", dojo._loadInit, false);
	window.addEventListener("load", dojo._loadInit, false);
	
})(dojo);
