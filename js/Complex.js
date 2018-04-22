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
		setString: function(str){function ch(st, i, sr){var sl = sr.length;for(var j=i;j<i+sl;j++){if(st[j] != sr[j-i]){return false;}}return true;}function chobj(st, i, obj){for(var k in obj){if(ch(st, i, k)){return k;}}return false;}var conts = {e: Math.E, pi: Math.PI, phi: (Math.sqrt(5)+1)/2};var a = [{s: "", i: 0, m: 0}], on = 0; for(var i=0;i<str.length;i++){if((str[i] == '+' || str[i] == '-') && (i>0 && str[i-1] != '*' && str[i-1] != '/' && str[i-1] != '-' && str[i-1] != '+')){on++; a.push({s: "", i: 0, m: 0}); if(str[i] == '-'){a[on].m++;} }else{if(str[i] == '-'){a[on].m++;} else if(str[i] == 'i' || str[i] == 'I'){a[on].i++;} else a[on].s+=str[i];}}this.re = 0,this.im = 0;for (var i = a.length - 1; i >= 0; i--) {var r = a[i]; if(r.s[0] == '*' || r.s[0] == '/' || r.s.length<1){r.s = '1'+r.s; }var v = eval(r.s); if(r.m%2 == 1){v*=-1;} var f = r.i%4; if(f == 1){this.im+=v;} else if(f == 2){this.re-=v;} else if(f == 3){this.im-=v;}else{this.re+=v;}}return this;},
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
	Complex.eval = function(str){
		if(typeof str == 'number'){return str;}
		str = str.toLowerCase();
		var cp = Complex.prototype;
		var opers = {'^': cp.pow, '*': cp.mul, '/': cp.div, '+': cp.add, '-': cp.sub};
		function ch(st, i, sr){var sl = sr.length;for(var j=i;j<i+sl;j++){if(st[j] != sr[j-i]){return false;}}return true;}
		function chobj(st, i, obj){for(var k in obj){if(ch(st, i, k)){return k;}}return false;}
		function er(s){if(s == undefined){s = "Syntax Error";}throw new Error(s);}
		var a = [""], on = 0;
		for(var i=0;i<str.length;i++){
			var a1 = chobj(str, i, cp), a2 = chobj(str, i, opers);
			if(str[i] == '(' || str[i] == ')' || a1 || a2){
				if(str[i] == ')' && !isNaN(str[i+1])){er();return;}
				if(str[i] == '(' || str[i] == ')'){on++;a.push("");a[on]+=str[i];on++;a.push("");}
				else if(a1){on++;a.push("");a[on]+=a1;i+=a1.length-1;on++;a.push("");}
				else if(a2){on++;a.push("");a[on]+=a2;i+=a2.length-1;on++;a.push("");}
			}else{a[on]+=str[i];}
		}
		var or = ['^','*','/','+','-'];
		function s(a,i,j){
			var _a = a.clone();
			var a0 = _a.splice(i,j-i);
			for (var i = a0.length - 1; i >= 0; i--) {
				if(a0[i] == or[0]){
					a0[i-1] = opers[or[0]].apply(nC(a0[i-1]), [nC(a0[i+1])]);
					a0.splice(i, 2);
				}
			}
			for (var i = a0.length - 1; i >= 0; i--) {
				if(a0[i] in cp){
					a0[i] = cp[a0[i]].apply(nC(a0[i+1]));
					a0.splice(i+1, 1);
				}
			}
			console.log(a0);
			for (var i = a0.length - 1; i >= 0; i--) {
				if(a0[i] instanceof Complex && typeof a0[i-1] == 'number'){
					a0[i-1] = a0[i].scl(a0[i-1]);
					console.log(0);
					a0.splice(i, 1);
				}
			}
			for(var j=1;j<or.length;j++){
				for (var i = a0.length - 1; i >= 0; i--) {
					if(a0[i] == or[j]){
						a0[i-1] = opers[or[j]].apply(nC(a0[i-1]), [nC(a0[i+1])]);
						a0.splice(i, 2);
					}
				}
			}
			return a0[0];
		}
		function getC(){
			var _a = 0, _b = 0;
			for(var i=0;i<a.length;i++){
				if(a[i] == '('){_a++;}
				if(a[i] == ')'){_b++;}
			}
			return [_a,_b];
		};
		var t = getC();
		if(t[1]>t[0]){er();return;}
		for(var i=0;i<a.length;i++){
			if(a[i] == ''){a.splice(i,1);}
		}
		while(getC()[0]>0){
			for(var i=0;i<a.length;i++){
				if(a[i] == '('){
					for(var j=i+1;j<a.length;j++){
						if(a[j] == '(') break;
						else if(a[j] == ')' || j == a.length-1){
							a[i] = s(a,i+1,j);
							a.splice(i+1,j-i);
						}
					}
				}
			}
		}
		return s(a,0,a.length);
	};
	global.Complex = Complex;global.nC = nC;
	if(global.I){global.I.Complex = Complex;}
})(this);