import EventHandler from "../UI/EventHandler.js";
import State from "../state/State.js";
import ACO from "../Algo/ACO.js";
import TestUtils from "./TestUtils.js";
const canvas = document.querySelector("#simulate");
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 700;
const appState = new State(canvas.height, canvas.width);
const algo = new ACO(appState);

let points = [
	{x: 10, y : 10},
	{x: 30, y : 65},
	{x: 20, y : 45},
	{x: 95, y : 98},
	{x: 300, y : 400},
	{x: 82, y : 95}
];

TestUtils.addPointsInappState(appState, points);

algo.antMovement();



