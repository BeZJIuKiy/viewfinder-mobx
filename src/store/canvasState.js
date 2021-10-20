import {makeAutoObservable} from "mobx";
import {makePersistable} from "mobx-persist-store";
import Polygon, {ZONE_TYPE_DEFAULT} from "../components/Ports/Events/ChangeFigure/Polygon";

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

		setTimeout(() => {
			for (const camId in this.rawData) {
				if (this.rawData[camId].length && !this.saveDataTest[camId].length) {
					console.log(this.rawData[camId]);
					this.rawData[camId].forEach(area => this.restoreAreas(camId, area));
				}
			}
		});
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
	}

	incReadyRectCounter() {
		++this.readyRectCounter;
	}

	setPolygonInCamera = (id) => {
		if (Number.isInteger(this.saveDataTest[id]?.length)) return;
		this.saveDataTest[id] = [];
		this.rawData[id] = [];
		console.log(this.rawData[id]);
	}

	addPolygon(camId, polygon) {
		// console.log(this.rawData[camId])
		if (!!!this.rawData[camId]) this.rawData[camId] = [];

		polygon.setAttributeType(ZONE_TYPE_DEFAULT)
		this.saveDataTest[camId].push(polygon);
		this.rawData[camId].push(this.polygonRawData(polygon));
	}

	changePolygon(camId, index, polygon) {
		console.log(polygon)

		this.saveDataTest[camId].splice(index, 1, polygon);
		this.rawData[camId][index] = this.polygonRawData(polygon);
	}
	changePolygonName = (camId, index, name) => {
		this.saveDataTest[camId][index].setName(name);
		this.rawData[camId][index].name = name;
	}
	changePolygonAttributeType = (camId, index, type) => {
		this.saveDataTest[camId][index].setAttributeType(type);
		this.rawData[camId][index].attributes.type = type;
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

	polygonRawData = (polygon) => ({
		id: polygon.id,
		name: polygon.getName(),
		startSize: polygon.getStartSize(),
		points: polygon.getPoints(),
		attributes: polygon.getAttribute(),
	})

	restoreAreas = (camId, area) => {
		const {x, y, w, h} = area.startSize;
		const polygon = new Polygon(area.id, x, y, w, h);
		polygon.setName(area.name);
		polygon.setPoints(area.points);
		polygon.setAttribute(area.attributes)
		// polygon.setAttributeType(area.attributes);

		// polygon.setAttribute(area.attributes);
		console.log(area.name);

		this.saveDataTest[camId].push(polygon);
	}

	deletePolygon(camId, index) {
		this.saveDataTest[camId].splice(index, 1);
		this.rawData[camId].splice(index, 1);
	}
}

export default new CanvasState();