class Ant {
	constructor(currentPos, points) {
		this.currentPos = currentPos,
		this.points = points;
		this.sequence = new Array(),
		this.curSeqInd = 0
	}
	
	destination = () => {
		if(this.curSeqInd >= this.sequence.length)
			return null;
		let pointIndex = this.sequence[this.curSeqInd];
		this.curSeqInd++;
		return this.points[pointIndex];
		
	}
}
export default Ant;