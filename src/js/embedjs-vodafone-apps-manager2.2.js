var embed=dojo={};
embed.config={};
embed.global=window;
embed.doc=document;
embed.body=function(){
return document.body;
};
dojo.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _1=function(it){
var t=typeof it;
return it&&(t=="function"||it instanceof Function)&&!it.nodeType;
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _1(it);
}:_1;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.isNumeric=function(n){
return n==parseFloat(n);
};
dojo.isNumber=function(n){
return typeof n=="number"||n instanceof Number;
};
["indexOf","lastIndexOf","forEach","map","some","every","filter"].forEach(function(_1,_2){
dojo[_1]=function(_3,_4,_5){
if((_2>1)&&(typeof _4=="string")){
_4=new Function("item","index","array",_4);
}
return Array.prototype[_1].call(_3,_4,_5);
};
});
dojo.fromJson=function(_1){
return eval("("+_1+")");
};
dojo._escapeString=function(_2){
return ("\""+_2.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_3,_4){
if(it===undefined){
return "undefined";
}
var _5=typeof it;
if(_5=="number"||_5=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _6=arguments.callee;
var _7;
_4=_4||"";
var _8=_3?_4+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_7=tf.call(it);
if(it!==_7){
return _6(_7,_3,_8);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var _9=_3?" ":"";
var _a=_3?"\n":"";
if(dojo.isArray(it)){
var _b=dojo.map(it,function(_c){
var _d=_6(_c,_3,_8);
if(typeof _d!="string"){
_d="undefined";
}
return _a+_8+_d;
});
return "["+_b.join(","+_9)+_a+_4+"]";
}
if(_5=="function"){
return null;
}
var _e=[],_f;
for(_f in it){
var _10,val;
if(typeof _f=="number"){
_10="\""+_f+"\"";
}else{
if(typeof _f=="string"){
_10=dojo._escapeString(_f);
}else{
continue;
}
}
val=_6(it[_f],_3,_8);
if(typeof val!="string"){
continue;
}
_e.push(_a+_8+_10+":"+_9+val);
}
return "{"+_e.join(","+_9)+_a+_4+"}";
};

