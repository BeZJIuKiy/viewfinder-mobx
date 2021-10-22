import {makeAutoObservable} from "mobx";
import {makePersistable} from "mobx-persist-store";
import Polygon, {ZONE_TYPE_DEFAULT} from "../components/Ports/Events/ChangeFigure/Polygon";
import Polygons from "../components/Ports/Events/ChangeFigure/Polygons";

class CanvasState {
	canvas = null;
	socket = null;
	sessionId = null;

	userName = "alex";

	allPolygons = null;
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
	canvasReSize = {
		coefficient: {
			width: 1,
			height: 1,
		},

		oldSize: {
			width: 1,
			height: 1,
		},

		newSize: {
			width: 1,
			height: 1,
		},
	}

	readyRectCounter = 0;
	isPolygonSelected = false;
	isPolygonChanged = false;
	currentPolygonNum = -1;

	polygonItem = null;
	saveDataTest = {};
	rawData = {};

	constructor() {
		// makeAutoObservable(this);

		makeAutoObservable(this, {}, {autoBind: true});

		makePersistable(this, {
			name: "CanvasStore",
			properties: [
				// "tempPolygons",
				"size",
				"pointCoefficient",
				"canvasReSize",
				"readyRectCounter",
				// "isPolygonSelected",
				"currentPolygonNum",
				"rawData",
				// "saveDataTest",
			],
			storage: window.localStorage
		});

		setTimeout(this.checkDataAvailability);
	}

	setCanvasReSize = (width, height) => {
		this.canvasReSize.oldSize.width = this.canvasReSize.newSize.width;
		this.canvasReSize.oldSize.height = this.canvasReSize.newSize.height;

		this.canvasReSize.newSize.width = width;
		this.canvasReSize.newSize.height = height;

		this.canvasReSize.coefficient.width = this.canvasReSize.newSize.width / this.canvasReSize.oldSize.width;
		this.canvasReSize.coefficient.height = this.canvasReSize.newSize.height / this.canvasReSize.oldSize.height;

		for (const id in this.saveDataTest) {
			this.saveDataTest[id].forEach((polygon) => {
				const points = polygon.getPoints();
				const newPoints = [];

				for (let i = 0; i < points.length; ++i) {
					newPoints.push({
						id: points[i].id,
						x: points[i].x * this.canvasReSize.coefficient.width,
						y: points[i].y * this.canvasReSize.coefficient.height,
					})
				}

				polygon.setPoints(newPoints);
			})
		}
	}

	setAllPolygons = (polygons) => {
		this.allPolygons = polygons;
	}

	setSessionId(id) {
		this.sessionId = id;
	}

	setSocket(socket) {
		this.socket = socket;
	}

	setCanvas(canvas) {
		this.canvas = canvas;
		this.polygonItem = new Polygons(this.canvas, this.socket, this.sessionId);
	}

	incReadyRectCounter() {
		++this.readyRectCounter;
	}

	setPolygonInCamera = (id) => {
		const isStop = Number.isInteger(this.saveDataTest[id]?.length) || Number.isInteger(this.rawData[id]?.length);
		if (isStop) return;
		this.saveDataTest[id] = [];
		this.rawData[id] = [];
	}

	addPolygon(camId, polygon) {
		if (!!!this.rawData[camId]) this.rawData[camId] = [];

		polygon.setAttributeType(ZONE_TYPE_DEFAULT)
		this.saveDataTest[camId].push(polygon);
		// this.rawData[camId].push(this.polygonRawData(polygon));
	}

	changePolygon(camId, index, polygon) {
		console.log("changePolygon")

		this.saveDataTest[camId].splice(index, 1, polygon);
		// this.rawData[camId][index] = this.polygonRawData(polygon);
	}

	// setRawPolygonPoints = (camId, index, points) => {
	// 	this.rawData[camId][index].points = points;
	// }
	changePolygonName = (camId, index, name) => {
		this.saveDataTest[camId][index].setName(name);
		// this.rawData[camId][index].name = name;
	}
	changePolygonAttributeType = (camId, index, type) => {
		this.saveDataTest[camId][index].setAttributeType(type);
		// this.rawData[camId][index].attributes.type = type;
	}

	setPolygonSelect = (isSelect) => {
		this.isPolygonSelected = isSelect;
	}

	setCurrentPolygonNum = (number) => {
		this.currentPolygonNum = number;
	}

	setPointCoefficient = (coefficient) => {
		this.pointCoefficient = coefficient;
	}
	setPolygonChanged = () => {
		this.isPolygonChanged = !this.isPolygonChanged;
	}
	setPolygonColor = (camId, index, rgba) => {
		const {r, g, b} = rgba;
		this.saveDataTest[camId][index].setAttributeFillColor(r, g, b);
		// this.saveDataTest[camId][index].setAttributeFillColor(r, g, b);
	}

	polygonRawData = (polygon) => ({
		id: polygon.id,
		name: polygon.getName(),
		startSize: polygon.getStartSize(),
		points: polygon.getPoints(),
		attributes: polygon.getAttribute(),
	})

	checkDataAvailability = () => {
		for (const camId in this.rawData) {
			if (!!!this.saveDataTest[camId]) {
				this.saveDataTest[camId] = [];
			}

			if (this.rawData[camId].length && !this.saveDataTest[camId]?.length) {
				this.rawData[camId].forEach(area => this.restoreAreas(camId, area));
			}
		}
	}

	restoreAreas = (camId, area) => {
		const {x, y, w, h} = area.startSize;
		const polygon = new Polygon(area.id, x, y, w, h);
		polygon.setName(area.name);
		polygon.setPoints(area.points);
		polygon.setAttribute(area.attributes)

		this.saveDataTest[camId].push(polygon);
	}
	dataSynchronization = () => {
		for (const camId in this.saveDataTest) {
			this.rawData[camId] = [];

			this.saveDataTest[camId].forEach((area, index) => {
				this.rawData[camId][index] = this.polygonRawData(area);
			});
		}
	}

	deletePolygon(camId, index) {
		this.saveDataTest[camId].splice(index, 1);
		// this.rawData[camId].splice(index, 1);
	}
}

export default new CanvasState();