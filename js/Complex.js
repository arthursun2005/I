(function(global){
	function Complex(a,b){this.data = {};this.set(a,b);return this;}
	function nC(a,b){return new Complex(a,b);}
	Object.assign(Complex, {
		polar: function(a,r){if(a == undefined){a = 0;}if(r == undefined){r = 1;}return nC(Math.cos(a)*r, Math.sin(a)*r);}
	});
	Complex.eps = Math.eps || 1e-16;
	if(global.Math.roundTo == undefined){global.Math.roundTo = function(n,t){if(t == undefined){t = 3;}var g = Math.pow(10, t);return Math.round(n*g)/g;};}
	Complex.prototype = {
		set: function(a,b){if(a == undefined){this.re = 0, this.im = 0;return this;}else if(b == undefined){if(a instanceof Complex){this.get(a);}else if(typeof a == 'number'){this.setRect(a);} else if(typeof a == 'string'){this.setString(a);} } else{this.setRect(a,b); }},
		setRect: function(a,b){this.re = a || 0, this.im = b || 0;},
		setString: function(str){if(typeof str == 'number'){return nC(str);} var a = [{s: "", i: 0, m: 0}], on = 0; for(var i=0;i<str.length;i++){if((str[i] == '+' || str[i] == '-') && (i>0 && str[i-1] != '*' && str[i-1] != '/' && str[i-1] != '-' && str[i-1] != '+')){on++; a.push({s: "", i: 0, m: 0}); if(str[i] == '-'){a[on].m++;} }else{if(str[i] == '-'){a[on].m++;} else if(str[i] == 'i' || str[i] == 'I'){a[on].i++;} else a[on].s+=str[i];}}this.re = 0,this.im = 0;for (var i = a.length - 1; i >= 0; i--) {var r = a[i]; if(r.s[0] == '*' || r.s[0] == '/' || r.s.length<1){r.s = '1'+r.s; }var v = eval(r.s); if(r.m%2 == 1){v*=-1;} var f = r.i%4; if(f == 1){this.im+=v;} else if(f == 2){this.re-=v;} else if(f == 3){this.im-=v;}else{this.re+=v;}}return this;},
		setPolar: function(a,r){this.get(Complex.polar(a,r));},
		toString: function(o){var s="";if(this.re!=0){if(Math.abs(this.re)!=1){s+=Math.roundTo(this.re,o);}}if(this.im!=0){var i=Math.abs(this.im);if(this.im<0){s+='-';}else{if(this.re!=0){s+='+'}}if(i!=1){s+=Math.roundTo(i,o);}s+='i';}return s;},
		clone: function(){var c = nC(this);c.data = this.data;return c;},
		get: function(c){this.re = c.re, this.im = c.im;this.data = c.data;},
		sin: function(){},
		asin: function(){},
		cos: function(){},
		acos: function(){},
		tan: function(){},
		atan: function(){},
		hsin: function(){},
		hcos: function(){},
		htan: function(){},
		exp: function(){},
		ln: function(){return nC(Math.log(this.mag()), this.angle());},
		add: function(){},
		sub: function(){},
		inv: function(){},
		scl: function(){},
		mul: function(){},
		div: function(){},
		rotate: function(){},
		rotateAround: function(){},
		mag: function(){return Math.sqrt(this.re*this.re+this.im*this.im);},
		angle: function(){return Math.atan2(this.im, this.re);},
		pow: function(){},
		neg: function(){return nC(-this.re, -this.im);},
		conj: function(){return nC(this.re, -this.im);},
		equals: function(v){return Math.abs(this.re-v.re)<Complex.eps && Math.abs(this.im-v.im)<Complex.eps;}
	};
	Complex.pow = function(){};
	Complex.pow2 = function(){};
	Complex.eval = function(){};
	global.Complex = Complex;global.nC = nC;
	if(global.I){global.I.Complex = Complex;}
})(this);