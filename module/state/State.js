import Ant from "./Ant.js";
class State {
	points;
	finalPath;
	ants;
	constructor(height, width) {
		this.canvasHeight = height;
		this.canvaWidth = width;
		this.points = new Array();
		this.ants = new Array();
		this.animationPlaying = false;
		this.finalPath = new Array();
	}
	addNewCity = (point) => {
		this.points.push(point);
		//console.log('new city added', this.points);
	}
	addNewAnt = () => {
		let {x, y} = this.points[0];
		this.ants.push(new Ant({x, y}, this.points));
		//console.log('new ant added');
	}
	getPointCount = () => {
		return this.points.length;
	}
	

}
export default State;