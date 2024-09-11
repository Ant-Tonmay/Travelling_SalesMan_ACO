import EventHandler from "./module/UI/EventHandler.js";
import State from "./module/state/State.js";
import ACO from "./module/Algo/ACO.js";
const canvas = document.querySelector("#simulate");
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 700;
const appState = new State();
const { handleClick, handlePlay, handlePause } = new EventHandler(appState);
const aco = new ACO(appState);
canvas.addEventListener("click", handleClick);
const playButton = document.querySelector("#play");
playButton.addEventListener("click", () => {
	//The Algorithm will run first
	//The algorithm will modify the ants array in appState
	//then the handlePlay function will run and plot data
	//according to the ants array
	handlePlay();
});
const pauseButton = document.querySelector("#pause");
pauseButton.addEventListener("click", handlePause);
