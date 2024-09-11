import DrawingTools from "./DrawingTools.js";
import Animation from "./Animation.js";

class EventHandler {
	animationPlaying;
	constructor(appState) {
		this.appState = appState;
		this.animationPlaying = false;
		this.animation = new Animation(this.appState);
	}
	handleClick = (e) => {
		const point = { x: e.offsetX, y: e.offsetY };
		this.appState.addNewCity(point);
		this.appState.addNewAnt();
		DrawingTools.drawFilledCircle(point, 30,'black');
		//DrawingTools.drawImage(point);
		DrawingTools.drawFilledCircle(point, 5,'blue')
		if (this.appState.getPointCount() > 1)
			DrawingTools.drawGraph(this.appState.points,'blue');
	};
	handlePlay = async() => {
		await this.animation.play();
	};
	handlePause = () => {
		if (this.animationPlaying) {
			console.log("animation paused");

			this.animationPlaying = false;
		} else {
			console.error("animation not playing");
		}
	};
}
export default EventHandler;
