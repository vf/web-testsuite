var embed=dojo={};
embed.config={};
embed.global=window;
embed.doc=document;
embed.body=function(){
return document.body;
};
dojo.toJson=function(_1){
return JSON.stringify(_1);
};
dojo.fromJson=function(_2){
return JSON.parse(_2);
};

