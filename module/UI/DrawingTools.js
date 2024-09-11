import Utils from "../Utility/Utils.js";


class DrawingTools {
	static ctx = Utils.ctx;
	static drawPoint = (point) => {
		this.ctx.beginPath();
		this.ctx.fillRect(point.x, point.y, 5, 5);
		//this.ctx.fillRect();
	} 
	static drawLine = (point1, point2) => {
		this.ctx.beginPath();
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}
	static drawCircle = (center, radius) => {
		this.ctx.beginPath();
		this.ctx.arc(Math.round(center.x), Math.round(center.y), radius, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
	static drawFilledCircle(center, radius) {
		this.ctx.beginPath();
		this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
	static drawGraph = (allPoints) => {
		let lastIdx = allPoints.length - 1;
		allPoints.forEach((point, idx) => {
			if(idx != lastIdx)
				this.drawLine(point, allPoints[lastIdx]);
		});
	}
	static drawImage = (point) => {
		console.log(`image added on ${point.x} , ${point.y}`);
		const image = new Image();
		image.src = '../images/ant4.png';
		console.log(image);
		image.onload = () => {
			this.ctx.drawImage(image, Math.round(point.x) - 25, Math.round(point.y) - 25, 50, 50);
		}
		
	} 
}

export default DrawingTools;