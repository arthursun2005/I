(function(global){
	function Complex(a,b){this.set(a,b);return this;}
	function nC(a,b){return new Complex(a,b);}
	if(!global.Object.prototype.clone) global.Object.prototype.clone = function(){var o = new this.constructor(); for(var k in this){if(this.hasOwnProperty(k)){if(typeof k == 'object') o[k] = this[k].clone(); else o[k] = this[k]; } } return o; };
	if(!global.Array.prototype.clone) global.Array.prototype.clone = function(){var a = []; for (var i = this.length - 1; i >= 0; i--) {if(typeof this[i] == 'object') a[i] = this[i].clone(); else a[i] = this[i]; } return a; };
	Complex.eps = Math.eps || 1e-16;
	if(global.Math.roundTo == undefined){global.Math.roundTo = function(n,t){if(t == undefined){t = 3;}var g = Math.pow(10, t);return Math.round(n*g)/g;};}
	Complex.prototype.get = function(o){for(var k in o){if(o.hasOwnProperty(k) && k != "_id"){if(typeof k == 'object') this[k] = o[k].clone(); else this[k] = o[k]; } } return this; };
	Object.assign(Complex.prototype, {
		set: function(a,b){if(a == undefined){this.re = 0, this.im = 0;return this;}else if(b == undefined){if(a instanceof Complex){this.get(a);}else if(typeof a == 'number'){this.setRect(a);} else if(typeof a == 'string'){this.setString(a);} } else{this.setRect(a,b); }},
		setRect: function(a,b){this.re = a || 0, this.im = b || 0;},
		setString: function(str){this.get(Complex.eval(str));},
		setPolar: function(a,r){this.get(Complex.polar(a,r));},
		sqrt: function(){return this.pow(1/2);},
		sq: function(){return this.pow(2);},
		cbrt: function(){return this.pow(1/3);},
		toString: function(o){var s="";if(this.re!=0){if(Math.abs(this.re)!=1){s+=Math.roundTo(this.re,o);}}if(this.im!=0){var i=Math.abs(this.im);if(this.im<0){s+='-';}else{if(this.re!=0){s+='+'}}if(i!=1){s+=Math.roundTo(i,o);}s+='i';}return s;},
		sin: function(){return (this.mul('i').exp().sub(this.mul('-i').exp())).div('2i');},
		asin: function(){var c = this.sq().neg().add(1);var t = this.mul(0,1).add(Math.sqrt(c.mag())).mul(nC(c.angle()/2).mul('i').exp());return t.ln().div('i');},
		cos: function(){return (this.mul('i').exp().add(this.mul('-i').exp())).div('2');},
		acos: function(){var c = this.sq().neg().add(1);var t = this.clone().add(nC('i').mul(Math.sqrt(c.mag())).mul(nC(c.angle()/2).mul('i').exp()));return t.ln().div('i');},
		tan: function(){return this.sin().div(this.cos());},
		atan: function(){var t = this.clone().neg().add('i').div(this.clone().add('i'));return t.ln().div('2i');},
		sinh: function(){return (this.mul('i').exp().sub(this.mul('-i').exp())).div('2');},
		cosh: function(){return (this.mul('i').exp().add(this.mul('-i').exp())).div('2');},
		tanh: function(){return this.sinh().div(this.cosh());},
		exp: function(){var v1 = nC(Math.exp(this.re));var v2 = Complex.polar(this.im);return v1.mul(v2);},
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
		pow: function(a,b){a = nC(a,b);return (a.mul(this.ln())).exp();},
		neg: function(){return nC(-this.re, -this.im);},
		conj: function(){return nC(this.re, -this.im);},
		round: function(t){this.re = Math.roundTo(this.re, t); this.im = Math.roundTo(this.im, t); },
		equals: function(v){return Math.abs(this.re-v.re)<Complex.eps && Math.abs(this.im-v.im)<Complex.eps;}
	});
	Object.assign(Complex, {
		sub: function(v,a){var y = v.sub(a);return y;},
		sin: function(v,a){v = nC(v,a);return v.sin();},
		cos: function(v,a){v = nC(v,a);return v.cos();},
		tan: function(v,a){v = nC(v,a);return v.tan();},
		asin: function(v,a){v = nC(v,a);return v.asin();},
		acos: function(v,a){v = nC(v,a);return v.acos();},
		atan: function(v,a){v = nC(v,a);return v.atan();},
		sinh: function(v,a){v = nC(v,a);return v.sinh();},
		cosh: function(v,a){v = nC(v,a);return v.cosh();},
		tanh: function(v,a){v = nC(v,a);return v.tanh();},
		sqrt: function(v,a){v = nC(v,a);return v.sqrt();},
		cbrt: function(v,a){v = nC(v,a);return v.cbrt();},
		string: function(v,a){v = nC(v,a);return v.toString();},
		exp: function(v,a){v = nC(v,a);return v.exp();},
		ln: function(v,a){v = nC(v,a);return v.ln();},
		abs: function(v,a){v = nC(v,a);return v.mag();},
		conj: function(v,a){v = nC(v,a);return v.conj();},
		rotate: function(v,a){_v = v.clone();return _v.rotate(a);},
		polar: function(a,r){if(a == undefined){a = 0;}if(r == undefined){r = 1;}return nC(Math.cos(a)*r, Math.sin(a)*r);},
		pow: function(){var a = arguments, r = a[a.length-1];for(var i=a.length-2;i>=0;i--){r = a[i].pow(r); } return r;},
	});
	Complex.prototype.abs = Complex.prototype.mag;
	Complex.operators = {'^': Complex.prototype.pow, '*': Complex.prototype.mul, '/': Complex.prototype.div, '-': Complex.prototype.sub, '+': Complex.prototype.add};
	Complex.consts = {e: nC(Math.E), pi: nC(Math.PI), phi: nC((Math.sqrt(5)+1)/2), i: nC(0,1)};
	Complex.eval = function(str){
		if(str == undefined){return nC();}
		if(typeof str == 'number'){return nC(str);}
		str = str.toLowerCase();
		var order = ['^','*','/','+','-'];
		function check(s,_i){var a = arguments; for(var i=2;i<a.length;i++){for(var k in a[i]){var t = true; for(var j=0;j<k.length;j++){if(k[j] != s[_i+j]){t=false;break;} } if(t) return k; } } return false; }
		function decompose(str){var a = [""], on = 0; function newa(){if(!isSpaces(a[on])){on++;a.push("");}else{a[on] = "";}}for(var i=0;i<str.length;i++){var _a = check(str, i, Complex.operators, Complex.prototype); if(str[i] == ',' || str[i] == '(' || str[i] == ')' || _a){newa(); if(str[i] == ',' || str[i] == '(' || str[i] == ')'){a[on]+=(str[i]);}else{a[on]+=_a; i+=_a.length-1; } newa(); }else{a[on]+=(str[i]); } } return a;}
		var a = decompose(str);
		function isSpaces(str){for(var i=0;i<str.length;i++){if(str[i] != ' '){return false;} } return true; }
		function error(m){if(m == undefined){m = "Syntax Error";}throw new Error(m);}
		function single(sr){if(sr instanceof Complex){return sr;}var m = nC(1), _t = "";for(var i=0;i<sr.length;i++){var a01 = check(sr,i,Complex.consts);if(a01){m = m.mul(Complex.consts[a01]); i+=a01.length-1; }else{_t+=sr[i]; } }if(isSpaces(_t)){_t = '1';}else if(_t[0] == '.'){_t+='0';}return m.scl(eval(_t)); }
		function pSolve(arr){
			var ar = arr.clone();
			function rh(r){return !(r in Complex) && !(r in Complex.operators) && r != ','}
			function lar(f){for (var _j = ar.length - 1; _j >= 0; _j--) {if(f){f(_j);}}}
			lar(
				function(i){
					if(rh(ar[i]) && !Array.isArray(ar[i])){
						ar[i] = single(ar[i]);
					}
				}
			);
			function tt(ind){lar(function(i){
				if(ar[i] == order[ind] && rh(ar[i-1]) && rh(ar[i+1]) && ar[i+1]) {
					if(i == 0){
						ar[i] = Complex.operators[ar[i]].apply(nC(), [(ar[i+1])]); ar.splice(i+1, 1);
					}
					else{
						ar[i-1] = Complex.operators[ar[i]].apply((ar[i-1]), [(ar[i+1])]); ar.splice(i, 2);
					}
				}});
			}
			tt(0);
			lar(function(i){
				if(ar[i] && ar[i+1] && rh(ar[i]) && rh(ar[i+1])){
					ar[i] = (ar[i]).mul((ar[i+1]));
					ar.splice(i+1, 1);
				}
			});
			tt(1);tt(2);tt(3);tt(4);
			lar(
				function(i){
					if(ar[i] == ','){
						var aa = Array.isArray(ar[i-1]), bb = Array.isArray(ar[i+1]);
						if(!aa && !bb) ar[i-1] = [ar[i-1], ar[i+1]];
						else if(aa && !bb) ar[i-1].push(ar[i+1]);
						else if(!aa && bb){ar[i+1].splice(0,0,ar[i-1]);ar[i-1] = ar[i+1];}
						else if(aa && bb){for(var j=0;j<ar[i-1].length;j++){ar[i+1].splice(0,0,ar[i-1][j]);}ar[i-1] = ar[i+1];}
						ar.splice(i, 2);
					}
				}
			);
			lar(function(i){
				if(ar[i] in Complex){
					if(ar[i+1] in Complex.operators){
						var t = Complex[ar[i]].apply(null, [ar[i+3]]);
						t = Complex.operators[ar[i+1]].apply(t, [(ar[i+2])]);
						ar[i] = t;
						ar.splice(i+1, 3);
					}
					else{
						if(Array.isArray(ar[i+1])) ar[i] = Complex[ar[i]].apply(null, ar[i+1]);
						else ar[i] = Complex[ar[i]].apply(null, [ar[i+1]]);
						ar.splice(i+1, 1);
					}
				}
			});
			return ar[0];
		}
		function getCount(){var ca = 0, cb = 0; for (var i = a.length - 1; i >= 0; i--) {if(a[i] == '('){ca++;} if(a[i] == ')'){cb++;} } return [ca, cb]; }
		var t = getCount();
		if(t[1]>t[0]){error();return;}
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i] != '('){continue;}
			for(var j=i+1;j<a.length;j++){
				if(a[j] == '('){break;}
				if(a[j] == ')' || j == a.length-1){
					if(j == a.length-1){a.push(')');j++;}
					var acl = a.clone();
					var t = acl.splice(i+1, j-i-1);
					var ans = pSolve(t);
					a.splice(i+1, j-i);
					a[i] = ans;
					break;
				}
			}
		}
		return pSolve(a);
	};
	var arr = ('Complex nC').split(" ");
	for (var i = arr.length - 1; i >= 0; i--) {
		var t = eval(arr[i]);
		if(typeof t == 'object') t.prototype.get = get;
		Object.defineProperty(I, arr[i], {value: t, enumerable: true }); 
	}
})(this);