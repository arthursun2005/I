(function(global){
	function Complex(a,b){this.data = {};this.set(a,b);return this;}
	function nC(a,b){return new Complex(a,b);}
	Object.assign(Complex, {
		polar: function(a,r){if(a == undefined){a = 0;}if(r == undefined){r = 1;}return nC(Math.cos(a)*r, Math.sin(a)*r);},
		pow: function(){
			var a = arguments, r = a[0];
			for(var i=1;i<a.length;i++){
				r = r.pow(a[i]);
			}
			return r;
		},
		pow2: function(){var a = arguments, r = a[a.length-2];
			for(var i=1;i<a.length;i++){
				r = r.pow(a[i]);
			}
			return r;}
	});
	if(!Array.prototype.clone) Array.prototype.clone = function(){var a = []; for (var i = this.length - 1; i >= 0; i--) {if(this[i].clone != undefined){a[i] = this[i].clone();} else a[i] = this[i]; }return a;};
	Complex.eps = Math.eps || 1e-16;
	if(global.Math.roundTo == undefined){global.Math.roundTo = function(n,t){if(t == undefined){t = 3;}var g = Math.pow(10, t);return Math.round(n*g)/g;};}
	Complex.prototype = {
		set: function(a,b){if(a == undefined){this.re = 0, this.im = 0;return this;}else if(b == undefined){if(a instanceof Complex){this.get(a);}else if(typeof a == 'number'){this.setRect(a);} else if(typeof a == 'string'){this.setString(a);} } else{this.setRect(a,b); }},
		setRect: function(a,b){this.re = a || 0, this.im = b || 0;},
		setString: function(str){
		},
		setPolar: function(a,r){this.get(Complex.polar(a,r));},
		toString: function(o){var s="";if(this.re!=0){if(Math.abs(this.re)!=1){s+=Math.roundTo(this.re,o);}}if(this.im!=0){var i=Math.abs(this.im);if(this.im<0){s+='-';}else{if(this.re!=0){s+='+'}}if(i!=1){s+=Math.roundTo(i,o);}s+='i';}return s;},
		clone: function(){var c = nC(this);c.data = this.data;return c;},
		get: function(c){this.re = c.re, this.im = c.im;this.data = c.data;return this;},
		sin: function(){return (this.mul('i').exp().sub(this.mul('-i'))).div('2i');},
		asin: function(){return this.sin().inv();},
		cos: function(){return (this.mul('i').exp().add(this.mul('-i'))).div('2');},
		acos: function(){return this.cos().inv();},
		tan: function(){return this.sin().div(this.cos());},
		atan: function(){return this.tan().inv();},
		sinh: function(){return (this.mul('i').exp().sub(this.mul('-i'))).div('2');},
		cosh: function(){return (this.mul('i').exp().add(this.mul('-i'))).div('2');},
		tanh: function(){return this.sinh().div(this.cosh());},
		exp: function(){var v1 = nC(Math.exp(this.re));var v2 = nC();v2.setPolar(this.im);return v1.mul(v2);},
		ln: function(){return nC(Math.log(this.mag()), this.angle());},
		add: function(a,b){a = nC(a,b);this.re+=a.re, this.im+=a.im;return this;},
		sub: function(a,b){a = nC(a,b);this.re-=a.re, this.im-=a.im;return this;},
		inv: function(){var r = this.conj().mul(this).mag();return this.conj().scl(1/r);},
		scl: function(s){return nC(this.re*s, this.im*s);},
		mul: function(a,b){a = nC(a,b);return nC(this.re*a.re-this.im*a.im, this.re*a.im+this.im*a.re); },
		div: function(a,b){a = nC(a,b);return this.mul(a.inv());},
		rotate: function(a){var m = this.mag(), b = this.angle();this.get(Complex.polar(b+a, m));},
		mag: function(){return Math.sqrt(this.re*this.re+this.im*this.im);},
		angle: function(){return Math.atan2(this.im, this.re);},
		pow: function(a,b){a = nC(a,b);return a.mul(this.ln()).exp();},
		neg: function(){return nC(-this.re, -this.im);},
		conj: function(){return nC(this.re, -this.im);},
		equals: function(v){return Math.abs(this.re-v.re)<Complex.eps && Math.abs(this.im-v.im)<Complex.eps;}
	};
	global.Complex = Complex;global.nC = nC;
	if(global.I){global.I.Complex = Complex;}
})(this);