import DrawingTools from "./DrawingTools.js";
import Utils from "../Utility/Utils.js";

class Animation {
	constructor(appState) {
		this.appState = appState;
		this.playing = false;
		
	}
	trackObj = () => {
		return { status: true, id: 0 };
	};
	play = () => {
		return new Promise((resolve, reject) => {
			if (this.playing) {
				console.error("Already playing");
				return;
			}
			this.traversalComplete = false;
			this.trackerArr = new Array(this.appState.ants.length)
				.fill()
				.map(() => this.trackObj());
	
			//console.log("tracker array", this.trackerArr);
			this.playing = true;
			this.controllerId = setInterval(() => {
				if (this.traversalComplete) {
					clearInterval(this.controllerId);
					console.log("traversalComplete");
					resolve();
					return;
				}
				//console.log("controller running");
				this.controller();
			}, 10);
		})
		
	};

	controller = () => {
		let count = 0;
		this.trackerArr.forEach((tracker, index) => {
			//console.log("tracker array", this.trackerArr);
			//console.log("tracker status", tracker.status);
			//console.log("index", index);
			if (tracker.status) {
				clearInterval(tracker.id);
				let ant = this.appState.ants[index];
				let currentPos = ant.currentPos;
				let destination = ant.destination();
				if (destination == null) {
					//console.log("null");
					count++;
				} else {
					this.move(currentPos, destination, index);
					tracker.status = false;
					//console.log(this.trackerArr);
					//console.log("Turned into false", index);
				}
			}
		});

		if (count >= this.appState.ants.length) this.traversalComplete = true;
		//else console.log("count", count);
	};
	move = (currentPos, destination, index) => {
		//console.log("move invoked", index);
		let dDAUtils = Utils.DDA(currentPos, destination);
		this.trackerArr[index].id = setInterval(() => {
			//console.log("index", index);
			//console.log("tracker id", this.trackerArr[index].id);
			this.takeStep(
				currentPos,
				destination,
				dDAUtils,
				this.trackerArr[index]
			);
		}, 20);
	};
	takeStep = (currentPos, destination, dDAUtils, tracker) => {
		if (dDAUtils.steps > 0) {
			currentPos.x += 5 * dDAUtils.xInc;
			currentPos.y += 5 * dDAUtils.yInc;
			dDAUtils.steps -= 5;
			this.render();
			return;
		}
		//console.log('status true');
		tracker.status = true;
	};

	render = () => {
		let ctx = Utils.ctx;
		let fullHeight = Utils.canvasHeight();
		let fullWidth = Utils.canvasWidth();
		ctx.clearRect(0, 0, fullWidth, fullHeight);
		let allPoints = Array();
		this.appState.points.forEach((point, index) => {
			DrawingTools.drawCircle(point, 30);
			DrawingTools.drawFilledCircle(
				this.appState.ants[index].currentPos,
				10
			);
			//allPoints.push(point);
			//if (allPoints.length > 1) DrawingTools.drawGraph(allPoints);
		});
	};
}
export default Animation;
