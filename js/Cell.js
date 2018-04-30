(function(global){
	function DNA(){
		var t = {
		};
	}
	function Cell(){}
	Object.assign(Cell.prototype, {
	});
	function Virus(){
		Cell.call(this);
	}
	Virus.prototype = Object.create(Cell.prototype);
	Virus.prototype.constructor = Virus;
})(this);