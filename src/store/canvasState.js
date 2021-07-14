import {makeAutoObservable} from "mobx";

class CanvasState {
	canvas = null;
	socket = null;
	sessionId = null;

	userName = "alex";
	isVisibleCameraCanvas = false;
	isCreatePolygon = false;

	tempPolygons = [];

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
		// width: 800,
		// height: 450,
		width: 1920,
		height: 1080,
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
	// polygons = [];

	test = new Map();


	constructor() {
		makeAutoObservable(this);
	}

	getCanvasDif = () => this.canvasSize.difS;

	setVisibleCameraCanvas = (isVisible) => {
		this.isVisibleCameraCanvas = isVisible;
	}

	reVisibleCameraCanvas = () => {
		this.isVisibleCameraCanvas = !this.isVisibleCameraCanvas;
	}

	setCreatePolygon = (isVisible) => {
		this.isCreatePolygon = isVisible;
	}

	reCreatePolygon = () => {
		this.isCreatePolygon = !this.isCreatePolygon;
	}

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

	// addPolygon(polygon) {
	// 	this.polygons.push(polygon);
	// }

	// changePolygon(index, polygon) {
	// 	this.polygons.splice(index, 1, polygon);
	// }

	// deletePolygon(index) {
	// 	this.polygons.splice(index, 1);
	// }

	setPolygonInCamera = (id) => {
		if (this.test.has(id)) return;

		const polygons = [];
		this.test.set(id, polygons);

		console.log(this.test);
	}

	addPolygon(camId, polygon) {
		const polygons = this.test.get(camId);
		polygons.push(polygon);
	}

	changePolygon(camId, index, polygon) {
		const polygons = this.test.get(camId);
		polygons.splice(index, 1, polygon);
	}

	deletePolygon(camId, index) {
		const polygons = this.test.get(camId);
		polygons.splice(index, 1);
	}
}

export default new CanvasState();