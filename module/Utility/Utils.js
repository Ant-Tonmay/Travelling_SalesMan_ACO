class Utils {
	static canvas = document.getElementById("simulate");
	static ctx = this.canvas.getContext("2d");

	static canvasHeight() {
		//console.log(this.canvas.height);
		return this.canvas.height;
	}
	static canvasWidth() {
		//console.log(this.canvas.width);
		return this.canvas.width;
	}
	static matrix(rows, columns, default_value = 0) {
		return new Array(rows).fill(new Array(columns).fill(default_value));
	}
	static DDA(currentPos, destination) {
		let dx = destination.x - currentPos.x;
		let dy = destination.y - currentPos.y;
		let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
		let xInc = dx / steps;
		let yInc = dy / steps;
		return {
			xInc,
			yInc,
			steps,
		};
	}
}

export default Utils;
