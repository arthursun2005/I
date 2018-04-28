(function(global){
	global.I = global.I || {};
	function change(n,a,b){var n1 = parseFloat(n,a);return n1.toString(b);}
	function randFloat(a,b){return Math.random() * (b-a) + a;}
	function constrain(a,b,c){if(a>c){return c}if(a<b){return b}return c};
	function dist(a,b,c,d){
		if(a instanceof Vec2 && b instanceof Vec2) return Math.sqrt(Math.pow(b.x-a.x, 2)+Math.pow(b.y-a.y, 2));
		else return Math.sqrt(Math.pow(c-a, 2)+Math.pow(d-b, 2));
	}
	function Parent(){
		this.children = [];
		this.canvas = null;
	}
	Object.assign(Parent.prototype, {
		add: function(){},
		delete: function(){},
		draw: function(){},
		solve: function(){}
	});
	Math.eps = 1e-16;
	Math.TAU = Math.PI*2;
	if(Math.roundTo == undefined) Math.roundTo = function(n,t){if(t == undefined){t = 3;}var g = Math.pow(10, t);return Math.round(n*g)/g;};
	function Color(a,b,c,d){this.set(a,b,c,d);return this;}
	Object.assign(Color.prototype, {
		get: function(p){for(var k in p){if(p.hasOwnProperty(k)){if(p[k].clone) this[k] = p[k].clone();else this[k] = p[k];}}return this;}, 
		set: function(a,b,c,d){if(a == undefined){return this._set(0,0,0,255);}else if(b == undefined){if(a instanceof Color){return this.get(a); }else if(typeof a == 'number'){return this._set(a,a,a,255); }else if(typeof a == 'string'){return this.setFromString(a); }else if(typeof a == 'object'){return this.setFromObj(a); } }else if(c == undefined){return this._set(a,a,a,b); }else if(d == undefined){return this._set(a,b,c,255); }else if(d != undefined){return this._set(a,b,c,d); } },
		_set: function(a,b,c,d){this.r = a, this.g = b, this.b = c, this.a = d;return this;}, 
		setFromString: function(str){if(str[0] == '#'){str = str.substring(1,str.length);} this.r = Number('0x'+str.substring(0,2)); this.g = Number('0x'+str.substring(2,4)); this.b = Number('0x'+str.substring(4,6)); if(str.length>6){this.a = Number('0x'+str.substring(0,2));} else{this.a = 255;} this._c(); return this; }, 
		setFromObj: function(obj){this.r = obj.r; this.g = obj.g; this.b = obj.b; this.a = obj.a; this._c(); return this; }, 
		getCssString: function(){function t0(n){n = Math.round(Math.abs(n)); var a0 = Math.change(n,10,16); if(n<16){a0 = "0"+a0;} return a0; } return "#"+t0(this.r)+t0(this.g)+t0(this.b)+t0(this.a); }, 
		getValue: function(){function t0(n){n = Math.round(Math.abs(n)); var a0 = Math.change(n,10,16); if(n<16){a0 = "0"+a0;} return a0; } return Number('0x'+t0(this.r)+t0(this.g)+t0(this.b)+t0(this.a)); }, 
		getObj: function(){return {r: this.r, g: this.g, b: this.b, a: this.a };}, 
		clone: function(){var t = new Color();for(var k in this){if(this.hasOwnProperty(k)){if(this[k].clone) t[k] = this[k].clone();else t[k] = this[k];}}return t;}, 
		equals: function(c){return Math.abs(this.r-c.r)<Math.eps && Math.abs(this.g-c.g)<Math.eps && Math.abs(this.b-c.b)<Math.eps && Math.abs(this.a-c.a)<Math.eps;},
		lerp: function(c,u){this.r+=(c.r-this.r)*u;this.g+=(c.g-this.g)*u; this.b+=(c.b-this.b)*u; this.a+=(c.a-this.a)*u; this._c(); return this; }, 
		_c: function(){this.r = constrain(this.r, 0, 255); this.g = constrain(this.g, 0, 255); this.b = constrain(this.b, 0, 255); this.a = constrain(this.a, 0, 255); }, 
		add: function(a,b,c,d){var _c = new Color(a,b,c,d); this.r+=_c.r; this.g+=_c.g; this.b+=_c.b; this.a+=_c.a; this._c(); return this; }, 
		sub: function(a,b,c,d){var _c = new Color(a,b,c,d); this.r-=_c.r; this.g-=_c.g; this.b-=_c.b; this.a-=_c.a; this._c(); return this; }, 
		scale: function(scl){this.r*=scl; this.g*=scl; this.b*=scl; this.a*=scl; this._c(); return this; }, mix: function(b, u){var _this = this.clone(); this.lerp(b, u); b.lerp(_this, u);}
	});
	function Vec2(x,y){return this.set(x,y);}
	function nV(x,y){return new Vec2(x,y);}
	Object.assign(Vec2, {
		polar: function(a,r){return nV(Math.cos(a)*r, Math.sin(a)*r);},
		mix: function(a,b,u){var c = a.clone();a.lerp(b,u);b.lerp(c,u);}
	});
	Object.assign(Vec2.prototype, {
		set: function(x,y){this.x = 0, this.y = 0;if(y == undefined){if(x instanceof Vec2){this.get(x);}else if(typeof x == 'number'){this.x = x;}}else{this.x = x, this.y = y;}return this;},
		get: function(p){for(var k in p){if(p.hasOwnProperty(k)){if(p[k].clone) this[k] = p[k].clone();else this[k] = p[k];}}return this;},
		mul: function(a,b){a = nV(a,b);return nV(this.dot(a), this.x*a.y + this.y*a.x);},
		scl: function(scl){return nV(this.x*scl, this.y*scl);},
		clone: function(){var t = nV();for(var k in this){if(this.hasOwnProperty(k)){if(this[k].clone) t[k] = this[k].clone();else t[k] = this[k];}}return t;},
		add: function(a,b){a = nV(a,b);this.x += a.x, this.y += a.y;return this;},
		sub: function(a,b){a = nV(a,b);this.x -= a.x, this.y -= a.y;return this;},
		dot: function(a,b){if(a == undefined){a = this.clone();}else if(!(a instanceof Vec2)){a = nV(a, b);}return this.x*a.x + this.y*a.y;},
		cross: function(a,b){if(a == undefined){a = this.clone();}else if(!(a instanceof Vec2)){a = nV(a, b);}return this.x*a.y - this.y*a.x;},
		mag: function(){return Math.sqrt(this.x*this.x + this.y*this.y)},
		round: function(t){this.x = Math.roundTo(this.x, t); this.y = Math.roundTo(this.y, t);return this;},
		angle: function(){var a = Math.atan2(this.y, this.x);return a<0 ? a+Math.TAU : a;},
		onAxis: function(a){return Vec2.polar(angle-this.angle(), this.mag());},
		rotate: function(a){this.get(Vec2.polar(this.angle()+a, this.mag())); return this;},
		rotateAround(a,p){if(p == undefined){p = new Vec2();}this.sub(p);this.rotate(a);this.add(p);return this;},
		norm: function(){var m = this.mag();return new Vec2(this.x/m, this.y/m);},
		equals: function(v){return Math.abs(this.x-v.x)<Math.eps &&  Math.abs(this.y-v.y)<Math.eps},
		neg: function(){return new Vec2(-this.x, -this.y);},
		mid: function(a,b){a = nV(a,b);return nV(this.x/2+a.x/2, this.y/2+a.y/2);},
		lerp: function(a,u){this.x+=(a.x-this.x)*u;this.y+=(a.y-this.y)*u;return this;},
		toString: function(t){var v = this.clone();v.round(t);return "("+v.x+", "+v.y+")";}
	});
	function Clock(auto){if(auto == undefined){auto = true;}this.waits = [];this.laps=[];this.time=Date.now();this.delta=0;this.last=this.time;this.start=this.time;this.running=auto;return this;}
	Object.assign(Clock.prototype, {
		update: function(){this.delta = Date.now()-this.last; if(this.running){this.time+=this.delta;} this.last = Date.now(); return this.delta/1000; },
		getTime: function(){this.update();return (this.time-this.start)/1000;},
		stop: function(){this.running = false;},
		record: function(){this.laps.push(this.getTime());},
		start: function(){this.running = true;},
		reset: function(){this.laps = [];this.time = Date.now();this.start = this.time;this.running = false;},
		create: function(name, time){var t = this.getTime();if(time == undefined){time = 1;}this.waits[name] = {time: time, made: t, last: t};},
		is: function(name){var t = this.getTime();if(t-this.waits[name].last>=this.waits[name].time){this.waits[name].last = t;return true;}else return false;},
		delete: function(name){this.waits[name] = undefined;},
		get: function(c){for(var k in c){if(c.hasOwnProperty(k)){if(c[k].clone) this[k] = c[k].clone();else this[k] = c[k];}}return this;},
		clone: function(){var t = new Clock();for(var k in this){if(this.hasOwnProperty(k)){if(this[k].clone) t[k] = this[k].clone();else t[k] = this[k];}}return t;}
	});
	function Arc(x,y,r,a1,a2){this.visible = false;this.set(x,y,r,a1,a2);return this;}
	Object.assign(Arc, {
		circle: function(p,r){return new Arc(p.x,p.y,r);}
	});
	Object.assign(Arc.prototype, {
		set: function(x,y,r,a1,a2){if(x instanceof Arc){return this.get(x);}if(r == undefined){r = 1;}if(a1 == undefined){a1 = 0;}if(a2 == undefined){a2 = Math.TAU;}this.p = new Vec2(x,y); this.r = r; this.a1 = a1; this.a2 = a2; return this;},
		clone: function(){var t = new Arc(); for(var k in this){if(this.hasOwnProperty(k)){if(this[k].clone) t[k] = this[k].clone(); else t[k] = this[k]; } } return t; },
		get: function(arc){for(var k in arc){if(arc.hasOwnProperty(k)){if(arc[k].clone) this[k] = arc[k].clone();else this[k] = arc[k];}}return this;},
		getSectorArea: function(){return (this.a2-this.a1)*Math.pow(this.r, 2)/2;},
		getSegmentArea: function(){var a = (this.a2-this.a1);var tri = Math.sin(a)*Math.pow(this.r, 2)/2;return this.getSectorArea()-tri;},
		getArcLength: function(){return this.r*(this.a2-this.a1);},
		getSegmentCenter: function(){var a = (this.a2-this.a1)/2, ma = (this.a2+this.a1)/2; var p = new Vec2( (4*this.r*Math.pow(Math.sin(a), 2))/(6*a-3*Math.sin(2*a)) , 0);return p.rotate(ma).add(this.p); }, 
		getSectorCenter: function(){var a = (this.a2-this.a1)/2, ma = (this.a2+this.a1)/2;var p = new Vec2((2*this.r*Math.sin(a))/(3*a), 0);return p.rotate(ma).add(this.p);},
		getArcCenter: function(){var a = (this.a2-this.a1)/2, ma = (this.a2+this.a1)/2;var p = new Vec2(this.r*Math.sin(a)/a, 0);return p.rotate(ma).add(this.p);},
		add: function(a,b){a = nV(a,b);this.p.add(a);},
		sub: function(a,b){a = nV(a,b);this.p.sub(a);},
		equals: function(a){return this.p.equals(a.p) && Math.abs(this.a1%Math.TAU-a.a1%Math.TAU)<Math.eps && Math.abs(this.a2%Math.TAU-a.a2%Math.TAU)<Math.eps && Math.abs(this.r-a.r)<Math.eps;}
	});
	function Shape2(){this.visible = true;var a = arguments;this.ps = [];for(var i=0;i<a.length;i++){if(typeof a[i] == 'number' && typeof a[i+1] == 'number'){this.ps.push(new Vec2(a[i], a[i+1]));i++;} else if(a[i] instanceof Vec2){this.ps.push(a[i].clone());} else if(a[i] instanceof Shape2){this.get(a[i]);break;} } return this;}
	Object.assign(Shape2, {
		rect: function(x,y,w,h){return new Shape2(x-w/2, y-h/2, x+w/2, y-h/2, x+w/2, y+h/2, x-w/2, y+h/2, x-w/2, y-h/2);},
		polygon: function(nside, radius){var s = new Shape2(); for(var o=0;o<nside;o++){s.ps.push(Vec2.polar(Math.TAU*o/nside, radius)); } s.ps.push(Vec2.polar(0, radius)); return s; }
	});
	Object.assign(Shape2.prototype, {
		get: function(shape2){for(var k in shape2){if(shape2.hasOwnProperty(k)){if(shape2[k].clone) this[k] = shape2[k].clone(); else this[k] = shape2[k];}}return this;},
		clone: function(){var t = new Shape2(); for(var k in this){if(this.hasOwnProperty(k)){if(this[k].clone) t[k] = this[k].clone(); else t[k] = this[k];}}return t;},
		getArea: function(){if(!this.closed()){console.warn("An open shape has been asked to compute for area, use getParameter() instead");return this.getParameter();}var a = 0;for(var i=0;i<this.ps.length-1;i++){a+=this.ps[i].x*this.ps[i+1].y-this.ps[i].y*this.ps[i+1].x; }return a/2;},
		getParameter: function(){var a = 0;for(var i=0;i<this.ps.length-1;i++){a+=dist(this.ps[i], this.ps[i+1]);}return a;},
		getAreaCenter: function(){var c = new Vec2(), a = this.getArea(); for(var i=0;i<this.ps.length-1;i++){c.x+=(this.ps[i].x+this.ps[i+1].x)*(this.ps[i].x*this.ps[i+1].y-this.ps[i].y*this.ps[i+1].x); c.y+=(this.ps[i].y+this.ps[i+1].y)*(this.ps[i].x*this.ps[i+1].y-this.ps[i].y*this.ps[i+1].x); } return c.scl(1/a/6); },
		getParameterCenter: function(){var c = new Vec2(); for(var i=0;i<this.ps.length-1;i++){c.add((this.ps[i].mid(this.ps[i+1])).scl(dist(this.ps[i], this.ps[i+1]))); } return c.scl(1/this.getParameter()); },
		close: function(){if(!this.closed()){this.ps.push(this.ps[0].clone());}return this;},
		closed: function(){return this.ps[this.ps.length-1].equals(this.ps[0]);},
		rotate: function(a){for (var i = this.ps.length - 1; i >= 0; i--) {this.ps[i].rotate(a);}return this;},
		rotateAround: function(a,p){if(a == undefined){a = 0;}if(p == undefined){p = this.closed() ? this.getCenter() : this.getCenter2();}this.sub(p);this.rotate(a);this.add(p);return this;},
		add: function(a,b){a = nV(a,b);for (var i = this.ps.length - 1; i >= 0; i--) {this.ps[i].add(a);}return this;},
		sub: function(a,b){a = nV(a,b);for (var i = this.ps.length - 1; i >= 0; i--) {this.ps[i].sub(a);}return this;},
		getBoundingBox: function(){if(this.ps.length<1){return Shape2.rect(0,0,0,0);} var most = [this.ps[0].x,this.ps[0].y,this.ps[0].x,this.ps[0].y]; for (var i = this.ps.length - 1; i >= 1; i--) {if(this.ps[i].x<most[0]){most[0] = this.ps[i].x}if(this.ps[i].x>most[2]){most[2] = this.ps[i].x}if(this.ps[i].y<most[1]){most[1] = this.ps[i].y}if(this.ps[i].y>most[3]){most[3] = this.ps[i].y} }return Shape2.rect(most[0]/2+most[2]/2, most[1]/2+most[3]/2, most[2]-most[0], most[3]-most[1]);},
		getInertia: function(){var c = this.getAreaCenter(); this.sub(c); var a = 0, b = 0; for (var i = this.ps.length - 2; i >= 0; i--) {a+=this.ps[i].cross(this.ps[i+1], this.ps[i])*this.ps[i].dot()*this.ps[i].dot(this.ps[i+1])*this.ps[i+1].dot(); b+=this.ps[i].cross(this.ps[i+1], this.ps[i]); } this.add(c); return this.getArea()*a/b/6; },
		equals: function(s){if(this.ps.length != s.ps.length || !this.ps[0].equals(s.ps[0])){return false;}for (var i = this.ps.length - 1; i >= 0; i--) {if(!this.ps[i].equals(s.ps[i])){return false;}}return true;}
	});
	function Mesh2(shape){
		this.visible = true;this.rot = 0;this.scl = 0;this.p = 0;this.shape = shape;this.color = new Color();return this;
	}
	Object.assign(Mesh2.prototype, {
		get: function(mesh){for(var k in mesh){if(mesh.hasOwnProperty(k)){if(mesh[k].clone) this[k] = mesh[k].clone();else this[k] = mesh[k];}}return this;},
		add: function(a,b){},
		sub: function(){},
		rotate: function(){},
		rotateAround: function(){},
		clone: function(){var t = new Mesh2();t.get(this);return t;},
	});
	function Joint(obj1, obj2){this.type = "";this.obj1 = obj1;this.obj2 = obj2;}
	Object.assign(Joint.prototype, {
	});
	function Obj(mesh){this.visible = true;this.mesh = mesh;this.surfaceFriction = 0.3;this.C = 1;}
	Obj.prototype = {};
	function Contact(obj1, obj2, soft){
		this.soft = soft || true;
		this.depth = null;
		this.obj1 = obj1;
		this.obj2 = obj2;
	}
	Object.assign(Contact.prototype, {
		clone: function(){},
		solve: function(){}
	});
	function Particle(x,y,r,d,c){this.p = nV(x,y);this.v = nV();this.color = c || new Color(0,255,0); this.r = r || 3; this.density =  d || 1; this.w = 0;this.s = new Vec2();this.visible = true;return this;}
	Object.assign(Particle.prototype, {
		clone: function(){var t = new Particle();for(var k in this){if(this.hasOwnProperty(k)){if(this[k].clone)t[k] = this[k].clone();else t[k] = this[k];}}return t;},
		getMass: function(){return Math.PI*this.density*this.r*this.r;},
		update: function(){this.p.add(this.v);}
	});
	function ParticleGroup(){}
	function ParticleSystem(){this.ps = [];this.visible = true;return this;}
	Object.assign(ParticleSystem.prototype, {
		getParticle: function(index){return this.ps[index];},
		getMass: function(){var m = 0;for (var i = this.ps.length - 1; i >= 0; i--) {m+=this.ps[i].getMass();}return m;}, 
		getCenter: function(){var c = this.getMass(), cc = new Vec2();for (var i = this.ps.length - 1; i >= 0; i--) {cc.add(this.ps[i].p.scl(this.ps[i].getMass()));}return cc.scl(1/c);},
		addParticle: function(a,b,c,d,e){if(!(a instanceof Particle)){a = new Particle(a,b,c,d,e);}this.ps.push(a);},
		update: function(){for (var i = this.ps.length - 1; i >= 0; i--) {this.ps[i].update();}},
		getContacts: function(){},
	});
	if(!Array.prototype.clone) Array.prototype.clone = function(){var a = []; for (var i = this.length - 1; i >= 0; i--) {if(this[i].clone != undefined){a[i] = this[i].clone();}else a[i] = this[i];}return a;};
	var globals = ("ParticleGroup Particle nV Array Clock Parent Obj Joint Mesh2 ParticleSystem dist Math change constrain Vec2 Shape2 Contact Color randFloat Arc").split(" ");
	for (var i = globals.length - 1; i >= 0; i--) {global.I[globals[i]] = eval(globals[i]);}
})(this);