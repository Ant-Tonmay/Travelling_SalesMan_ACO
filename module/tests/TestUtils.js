class TestUtils {
	static addPointsInappState = (appState, points) => {
		points.forEach(point => {
			appState.addNewCity(point);
			appState.addNewAnt();
		});
	}
	static fakeAlgo(appState) {
		appState.ants.forEach((ant, ind) => {

			let totalPoints = appState.points.length;
			//console.log(totalPoints);
			let i = ind;
			let count = 0;
			do {
				//console.log('ant', ind);
				//console.log(i);
				i = (i + 1) % totalPoints;
				ant.sequence.push(i);
				count++;
			}while(count < totalPoints);
			
		});
	}
}
export default TestUtils;