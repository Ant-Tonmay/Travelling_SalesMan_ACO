import EventHandler from "../UI/EventHandler.js";
import State from "../state/State.js";
import TestUtils from './TestUtils.js';
import AntColony from "../Algo/ACO.js";

const canvas = document.querySelector("#simulate");
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 700;
const appState = new State(canvas.height, canvas.width);
const { handleClick, handlePlay, handlePause } = new EventHandler(appState);

function createDistanceMatrix(cities) {
	const numCities = cities.length;
	const distances = Array.from({ length: numCities }, () =>
	  Array(numCities).fill(0)
	);
  
	for (let i = 0; i < numCities; i++) {
	  for (let j = 0; j < numCities; j++) {
		distances[i][j] = Math.sqrt(
		  Math.pow(cities[i][0] - cities[j][0], 2) +
			Math.pow(cities[i][1] - cities[j][1], 2)
		);
	  }
	}
  
	return distances;
  }
  


canvas.addEventListener("click", handleClick);
const playButton = document.querySelector("#play");
playButton.addEventListener("click", async() => {
	
	const cityCoords = appState.points.map(({x,y}) => [x, y]);

	function drawBestPath(path) {
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.lineWidth = 2;
	  
		for (let i = 0; i < path.length; i++) {
		  const [x1, y1] = cityCoords[path[i]];
		  const [x2, y2] = cityCoords[path[(i + 1) % path.length]]; // Connect last city to the first
		  ctx.moveTo(x1, y1);
		  ctx.lineTo(x2, y2);
		}
	  
		ctx.stroke();
	  }


	console.log(cityCoords);
	const distances = createDistanceMatrix(cityCoords);

	// Ant colony optimization parameters
	const n_ants = 10;
	const n_best = 3;
	const n_iterations = 100;
	const decay = 0.95;
	const alpha = 1;
	const beta = 2;
  
	// Create AntColony object
	const antColony = new AntColony(
	  distances,
	  n_ants,
	  n_best,
	  n_iterations,
	  decay,
	  alpha,
	  beta,
	  appState
	);
  
	// Run the ant colony optimization
	const { best_path, best_length, all_paths } = antColony.run();
	
	appState.ants.forEach((ant, index) => {
		ant.sequence = all_paths[index];
		console.log(ant.sequence);
	});
	
	
	//console.log(appState.ants);
	await handlePlay();
	drawBestPath(best_path);
});
const pauseButton = document.querySelector("#pause");
pauseButton.addEventListener("click", handlePause);
