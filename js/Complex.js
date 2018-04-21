(function(global){
	function Complex(a,b){this.set(a,b);return this;}
	function cC(a,b){return new Complex(a,b);}
	Complex.prototype = {
		set: function(a,b){
			if(a == undefined){}
			else if(a == undefined){}
			else{}
		}
	};
	Complex.eval = function(){};
	global.Complex = Complex;global.cC = cC;
	if(global.I){global.I.Complex = Complex;}
})(this);