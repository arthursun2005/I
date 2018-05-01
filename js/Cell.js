(function(global){
	function DNA(){
		I.genId.apply(this);
		var t = {
		};
	}
	function Cell(){
		I.Obj.apply(this);
	}
	Cell.prototype = Object.create(I.Obj.prototype);
	function Virus(){
		Cell.call(this);
	}
	Virus.prototype = Object.create(Cell.prototype);
	Virus.prototype.constructor = Virus;
	function Bacteria(){
		Cell.call(this);
	}
	Bacteria.prototype = Object.create(Cell.prototype);
	Bacteria.prototype.constructor = Bacteria;
	function Protein(){
		Cell.call(this);
	}
	Protein.prototype = Object.create(Cell.prototype);
	Protein.prototype.constructor = Protein;
	function AntiBody(){
		Protein.call(this);
	}
	AntiBody.prototype = Object.create(Protein.prototype);
	AntiBody.prototype.constructor = AntiBody;
	var arr = ("Cell Virus Protein Bacteria AntiBody DNA").split(" ");
	for (var i = arr.length - 1; i >= 0; i--) {
		var t = eval(arr[i]);
		if(typeof t == 'object') t.prototype.get = get;
		Object.defineProperty(I, arr[i], {value: t, enumerable: true}); 
	}
})(this);