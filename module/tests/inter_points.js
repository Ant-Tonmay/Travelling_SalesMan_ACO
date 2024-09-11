import Utils from "../Utility/Utils.js";
import DrawingTools from "../UI/DrawingTools.js";

const canvas = Utils.canvas;
const ctx = Utils.ctx;
console.log("Im inter_points");

let counter = 0;
let positions = new Array();


canvas.addEventListener("click", (e)=>{
	positions[counter] = {x: e.offsetX, y: e.offsetY};
	console.log(positions[counter]);
	DrawingTools.drawPoint(positions[counter]);
	if(counter >= 1) {
		counter = 0;
		takeStep(positions[0], positions[1]);

	}
	else counter++;

});





const takeStep = (currentPos, destination) => {
	let dy = (destination.y - currentPos.y);
	let dx = (destination.x - currentPos.x);
	let m = dy / dx;
	let initialY = currentPos.y
	while(currentPos.x != destination.x && currentPos.y != destination.y) {
		currentPos.x++;
		let y = (m * currentPos.x) + initialY;
		currentPos.y = y;
		DrawingTools.drawPoint(currentPos);

	}

};