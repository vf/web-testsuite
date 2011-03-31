doh.Deferred = function(canceller){
	this.chain = [];
	this.id = this._nextId();
	this.fired = -1;
	this.paused = 0;
	this.results = [null, null];
	this.canceller = canceller;
	this.silentlyCancelled = false;
};

doh.util.extend(doh.Deferred, {
	getTestErrback: function(cb, scope){
		// summary: Replaces outer getTextCallback's in nested situations to avoid multiple callback(true)'s
		var _this = this;
		return function(){
			try{
				cb.apply(scope||doh.util.global||_this, arguments);
			}catch(e){
				_this.errback(e);
			}
		};
	},

	getTestCallback: function(cb, scope){
		var _this = this;
		return function(){
			try{
				cb.apply(scope||doh.util.global||_this, arguments);
			}catch(e){
				_this.errback(e);
				return;
			}
			_this.callback(true);
		};
	},

	getFunctionFromArgs: function(){
		var a = arguments;
		if((a[0])&&(!a[1])){
			if(typeof a[0] == "function"){
				return a[0];
			}else if(typeof a[0] == "string"){
				return doh.util.global[a[0]];
			}
		}else if((a[0])&&(a[1])){
			return doh.util.hitch(a[0], a[1]);
		}
		return null;
	},

	makeCalled: function() {
		var deferred = new doh.Deferred();
		deferred.callback();
		return deferred;
	},

	_nextId: (function(){
		var n = 1;
		return function(){ return n++; };
	})(),

	cancel: function(){
		if(this.fired == -1){
			if (this.canceller){
				this.canceller(this);
			}else{
				this.silentlyCancelled = true;
			}
			if(this.fired == -1){
				this.errback(new Error("Deferred(unfired)"));
			}
		}else if(this.fired == 0 &&
					(this.results[0] instanceof doh.Deferred)){
			this.results[0].cancel();
		}
	},
			

	_pause: function(){
		this.paused++;
	},

	_unpause: function(){
		this.paused--;
		if ((this.paused == 0) && (this.fired >= 0)) {
			this._fire();
		}
	},

	_continue: function(res){
		this._resback(res);
		this._unpause();
	},

	_resback: function(res){
		this.fired = ((res instanceof Error) ? 1 : 0);
		this.results[this.fired] = res;
		this._fire();
	},

	_check: function(){
		if(this.fired != -1){
			if(!this.silentlyCancelled){
				throw new Error("already called!");
			}
			this.silentlyCancelled = false;
			return;
		}
	},

	callback: function(res){
		this._check();
		this._resback(res);
	},

	errback: function(res){
		this._check();
		var ret;
		if(!(res instanceof Error)){
			ret = new Error(""+res);
			//ret.actualError = res; this fails in FF when it throws a native error, it obviously stops the current tests completely :(
		} else {
			ret = res;
		}
		this._resback(ret);
	},

	addBoth: function(cb, cbfn){
		var enclosed = this.getFunctionFromArgs(cb, cbfn);
		if(arguments.length > 2){
			enclosed = doh.util.hitch(null, enclosed, arguments, 2);
		}
		return this.addCallbacks(enclosed, enclosed);
	},

	addCallback: function(cb, cbfn){
		var enclosed = this.getFunctionFromArgs(cb, cbfn);
		if(arguments.length > 2){
			enclosed = doh.util.hitch(null, enclosed, arguments, 2);
		}
		return this.addCallbacks(enclosed, null);
	},

	addErrback: function(cb, cbfn){
		var enclosed = this.getFunctionFromArgs(cb, cbfn);
		if(arguments.length > 2){
			enclosed = doh.util.hitch(null, enclosed, arguments, 2);
		}
		return this.addCallbacks(null, enclosed);
	},

	addCallbacks: function(cb, eb){
		this.chain.push([cb, eb]);
		if(this.fired >= 0){
			this._fire();
		}
		return this;
	},

	_fire: function(){
		var chain = this.chain;
		var fired = this.fired;
		var res = this.results[fired];
		var self = this;
		var cb = null;
		while(chain.length > 0 && this.paused == 0){
			// Array
			var pair = chain.shift();
			var f = pair[fired];
			if(f == null){
				continue;
			}
			try {
				res = f(res);
				fired = ((res instanceof Error) ? 1 : 0);
				if(res instanceof doh.Deferred){
					cb = function(res){
						self._continue(res);
					};
					this._pause();
				}
			}catch(err){
				fired = 1;
				res = err;
			}
		}
		this.fired = fired;
		this.results[fired] = res;
		if((cb)&&(this.paused)){
			res.addBoth(cb);
		}
	}
});
