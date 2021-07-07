import {makeAutoObservable} from "mobx";

class CanvasState {
	canvas = null;
	socket = null;
	sessionId = null;

	userName = "alex";

	size = {
		/* Test 1.25 5:4 */
		// width: 800,
		// height: 640,

		/* Test 1.333 4:3 */
		// width: 1600,
		// height: 1200,
		// width: 800,
		// height: 600,

		/* Test 1.5 3:2 */
		// width: 720,
		// height: 480,

		/* Test 1.6 16:10 */
		// width: 800,
		// height: 500,

		/* Test 1.667 5:3 */
		// width: 800,
		// height: 480,

		/* Test 1.778 16:9 */
		// width: 1280,
		// height: 720,
		width: 800,
		height: 450,
	}

	pointCoefficient = 1;

	/* Размеры элемента Canvas */
	canvasSize = {
		oldS: {
			width: 0,
			height: 0,
		},

		newS: {
			width: 0,
			height: 0,
		},

		difS: {
			width: 0,
			height: 0,
		},
	}

	username = "";

	readyRectCounter = 0;
	polygons = [];

	test = new Map();


	constructor() {
		makeAutoObservable(this);
	}

	setCameraInMap = (id) => {
		if (!!this.test.get(id)) return;

		this.test.set(id, this.polygons);
	}

	getCanvasDif = () => this.canvasSize.difS;

	setSessionId(id) {
		this.sessionId = id;
	}

	setSocket(socket) {
		this.socket = socket;
	}

	setUsername(username) {
		this.username = username;
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}

	incReadyRectCounter() {
		++this.readyRectCounter;
	}

	addPolygon(polygon) {
		this.polygons.push(polygon);
	}

	changePolygon(index, polygon) {
		this.polygons.splice(index, 1, polygon);
	}

	deletePolygon(index) {
		this.polygons.splice(index, 1);
	}
}

export default new CanvasState();