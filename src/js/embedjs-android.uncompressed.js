


/*********FILE**********
/Users/cain/programming/uxebu/repositories/embedjs/src/dojo.js
********************/


var embed = dojo = {};
embed.config = {};
embed.global = window;
embed.doc = document;
embed.body = function() {
	return document.body;
};



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
