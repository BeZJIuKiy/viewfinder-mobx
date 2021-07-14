import Polygon from "./Polygon";
import canvasState from "../../../../store/canvasState";
import ports from "../../../../store/ports";

export default class Polygons {
	canvas = null;
	socket = null;
	id = "";

	startX = null;
	startY = null;
	width = null;
	height = null;
	saved = "";
	isCreateRect = false;

	cameraId = ports.selectedObjects.camera.id;
	polygons = [];
	curPolygon = null;
	isDrag = false;
	handlesSize = null;
	mousePos = {x: null, y: null};

	constructor(canvas, socket, id) {
		this.canvas = canvas;
		this.socket = socket;
		this.id = id;

		this.destroyEvents();

		this.ctx = canvas.getContext('2d');

		this.polygons = canvasState.test.get(ports.selectedObjects.camera.id);

		/* DELETE */
		if (this.polygons.length) {
			switch (this.polygons.length - 1) {
				case 0: {
					this.polygons[0].setAttributeType("In/Out");
					console.log(this.polygons[0].getAttributeFillColor());
					break;
				}

				case 1: {
					this.polygons[0].setAttributeType("In/Out");
					this.polygons[1].setAttributeType("Parking");
					break;
				}

				case 2: {
					this.polygons[0].setAttributeType("In/Out");
					this.polygons[1].setAttributeType("Parking");
					this.polygons[2].setAttributeType("Restricted area");
					break;
				}

				default: {
					this.polygons[0].setAttributeType("In/Out");
					this.polygons[1].setAttributeType("Parking");
					this.polygons[2].setAttributeType("Restricted area");
				}
			}
		}

		/* ====== */

		this.drawPolygons();
		this.polygons = this.showCenterPoint();

		this.handlesSize = 8;
		this.currentHandle = -1;

		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.oncontextmenu = this.mouseRightClickHandler.bind(this);
	}

	mouseDownHandler(e) {
		if (!canvasState.isCreatePolygon) return;
		switch (e.which) {
			case 1: {
				this.lmbDown(e);
				break;
			}
			case 2: {
				this.cmbDown(e);
				break;
			}
			case 3: {
				this.rmbDown(e);
				break;
			}
			default: {
				console.log("Нажатие какой-то кнопкой мыши")
			}
		}
	}

	lmbDown = (e) => {
		this.isDrag = true;
		(this.currentHandle < 0) ? this.startCreateRect() : this.changePolygonPointPosition();
	}
	cmbDown = (e) => {
		console.log("Нажата СКМ");
	}
	rmbDown = (e) => {
		console.log("Нажата ПКМ");
	}

	mouseUpHandler(e) {
		switch (e.which) {
			case 1: {
				this.lmbUp(e);
				break;
			}
			case 2: {
				this.cmbUp(e);
				break;
			}
			case 3: {
				this.rmbUp(e);
				break;
			}
			default: {
				console.log("Отпущена какая-то кнопка мыши")
			}
		}
	}

	lmbUp = (e) => {
		if (this.isCreateRect) this.createNewPolygon();

		this.isDrag = false;
		this.curPolygon = null;
		this.currentHandle = -1;

		this.polygons = this.showCenterPoint();

		this.selectPolygon() ? this.polygonSelection() : this.drawPolygons();

		this.postPolygon("https://lockalhost:5000", this.polygons);
		// .then((data) => {
		// 	console.log(data);  // JSON data parsed by `response.json()` call
		// })
	}
	cmbUp = (e) => {
		console.log("Отпущена СКМ");
	}
	rmbUp = (e) => {
		if (this.currentHandle < 0 || this.polygons[this.curPolygon].points[this.currentHandle].id === null) return;

		const id = this.polygons[this.curPolygon].points[this.currentHandle].id;
		this.polygons[this.curPolygon].deletePoint(id);

		if (this.polygons[this.curPolygon].getPoints().length <= 2) {
			this.deletePolygon();
			canvasState.deletePolygon(this.cameraId, this.curPolygon);

			this.curPolygon = null;
			this.currentHandle = -1;
		} else {
			this.polygons[this.curPolygon].points = this.polygons[this.curPolygon].getPoints();
			canvasState.changePolygon(this.cameraId, this.curPolygon, this.polygons[this.curPolygon]);
			this.polygons = this.showCenterPoint();
		}

		this.drawPolygons();
	}

	/* FUNCTION: lmbUp */
	createNewPolygon = () => {
		this.isCreateRect = false;
		canvasState.addPolygon(this.cameraId, new Polygon(canvasState.readyRectCounter, this.startX, this.startY, this.width, this.height));
		this.polygons = canvasState.test.get(this.cameraId);
	}


	mouseMoveHandler(e) {
		this.bounds = e.target.getBoundingClientRect();
		this.mousePos = {x: e.offsetX, y: e.offsetY};

		if (!this.isDrag) this.findAnyPoint();
		if (!canvasState.isCreatePolygon) return;

		if (this.isDrag && this.currentHandle < 0) this.isCreateRect = true;
		if (this.isDrag && this.isCreateRect) this.drawNewRect();

		if (this.currentHandle >= 0 && this.isDrag) this.changePointPosition();
		if (this.isDrag && this.currentHandle >= 0) this.redrawPoint();
	}

	/* FUNCTION: mouseMoveHandler */
	findAnyPoint = () => {
		for (let i = 0; i < this.polygons?.length; ++i) {
			this.currentHandle = this.getHandle(this.polygons[i]);
			if (this.currentHandle >= 0) {
				this.curPolygon = i;
				break;
			}
		}
	}
	changePointPosition = () => {
		const point = this.polygons[this.curPolygon].points[this.currentHandle];

		point.x = this.mousePos.x;
		point.y = this.mousePos.y;
	}
	redrawPoint = () => {
		const pointsWithId = [...this.polygons];
		pointsWithId[this.curPolygon] = {
			...this.polygons[this.curPolygon],
			points: this.polygons[this.curPolygon].getPoints()
		};

		this.drawPolygons(pointsWithId);
		this.preparationPoints(pointsWithId[this.curPolygon], pointsWithId[this.curPolygon].points);
	}
	polygonSelection = () => {
		this.drawPolygons();
		const polygon = this.polygons[this.curPolygon];
		const points = this.polygons[this.curPolygon].getPoints();
		const centerPoints = this.polygons[this.curPolygon].points.filter(({id}) => id === null);

		this.preparationPoints(polygon, points);
		this.preparationCenterPoints(polygon, centerPoints);
	}

	mouseRightClickHandler = (e) => e.preventDefault();

	point = (x, y) => ({x, y});
	newPoint = (x, y) => ({id: null, x, y});
	dist = (p1, p2) => Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
	getHandle = ({points}) => points.findIndex(({x, y}, index) =>
		this.dist(this.mousePos, this.point(x, y)) <= this.handlesSize);

	addPoints = (first, second) => this.newPoint((first.x + second.x) / 2, (first.y + second.y) / 2);
	deletePolygon = () => this.polygons.splice(this.curPolygon, 1);

	showCenterPoint = () => this.polygons.map((polygon) => {
		const points = [];
		const pointsWithId = polygon.getPoints();

		for (let i = 0; i < pointsWithId.length; ++i) {
			points.push(pointsWithId[i], this.addPoints(pointsWithId[i], pointsWithId[i + 1 === pointsWithId.length ? 0 : i + 1]));
		}

		return {...polygon, points};
	});

	preparationPoints = (polygon, points, visible = true) => {
		const pointSize = visible ? polygon.getPointSize() : 0;
		const pointColor = polygon.getPointColor();

		points.forEach(({x, y}) => this.drawPoints(x, y, pointSize, pointColor));
	}
	preparationCenterPoints = (polygon, points, visible = true) => {
		const centerPointSize = (visible) ? polygon.getCenterPointSize() : 0;
		const centerPointColor = polygon.getCenterPointColor();

		points.forEach(({x, y}) => this.drawPoints(x, y, centerPointSize, centerPointColor));
	}

	startCreateRect = () => {
		this.startX = this.mousePos.x;
		this.startY = this.mousePos.y;
		this.ctx.moveTo(this.startX, this.startY);
		this.ctx.beginPath();
		this.saved = this.canvas.toDataURL();
	}
	drawNewRect = () => {
		this.width = this.mousePos.x - this.startX;
		this.height = this.mousePos.y - this.startY;

		const img = new Image();
		img.src = this.saved;
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.rect(this.startX, this.startY, this.width, this.height);
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}
	changePolygonPointPosition = () => {
		const point = this.polygons[this.curPolygon].points[this.currentHandle];
		if (point.id === null) {
			point.id = this.polygons[this.curPolygon].getIdCounter();
			this.polygons[this.curPolygon].incCounter();
			const points = this.polygons[this.curPolygon].points.filter(({id}) => id !== null);
			this.polygons[this.curPolygon].setPoints(points);
		}
	}
	selectPolygon = () => {
		let findedPolygon = false;
		for (let i = 0; i < this.polygons.length; ++i) {
			const points = this.polygons[i].getPoints();
			this.ctx.beginPath();
			this.ctx.moveTo(points[0].x, points[0].y);
			points.forEach(({x, y}) => this.ctx.lineTo(x, y));
			this.ctx.closePath();

			if (this.ctx.isPointInPath(this.mousePos.x, this.mousePos.y)) {
				this.curPolygon = i;
				findedPolygon = true;
			}
		}
		return findedPolygon;
	}

	drawPolygons(polygons = this.polygons) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		polygons.forEach((polygon, index) => {
			const points = polygon.getPoints();
			this.startX = points[0].x;
			this.startY = points[0].y;

			for (let i = 1; i < points.length; ++i) {
				this.startX = points[i - 1].x;
				this.startY = points[i - 1].y;

				this.drawLine(points[i].x, points[i].y);
			}

			this.startX = points[points.length - 1].x;
			this.startY = points[points.length - 1].y;
			this.drawLine(points[0].x, points[0].y);

			this.fillPolygon(this.polygons[index].getPoints(), this.polygons[index].getAttributeFillColor());
		})

	}

	drawLine = (x, y) => {
		this.ctx.strokeStyle = this.polygons[this.curPolygon]?.getLineColor();
		this.ctx.lineWidth = this.polygons[this.curPolygon]?.getLineWidth();
		this.ctx.beginPath();
		this.ctx.moveTo(this.startX, this.startY);
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
	fillPolygon = (points, fillColor = `rgba(170, 170, 170, 0.3)`) => {
		this.ctx.beginPath();
		this.ctx.moveTo(points[0].x, points[0].y);
		points.forEach(({x, y}) => this.ctx.lineTo(x, y));
		this.ctx.fillStyle = fillColor;
		this.ctx.fill();
		this.ctx.closePath();
	}
	drawPoints = (x, y, pointSize, pointColor) => {
		this.ctx.beginPath();
		this.ctx.fillStyle = pointColor;
		// this.ctx.globalCompositeOperation = 'xor';
		this.ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
		this.ctx.fill();

		this.ctx.globalCompositeOperation = 'source-over';
	}

	destroyEvents() {
		this.canvas.onmousemove = null;
		this.canvas.onmousedown = null;
		this.canvas.onmouseup = null;
		this.canvas.oncontextmenu = null;
	}

	postPolygon = async (url = "", data = {}) => {
		// Default options are marked with *
		const pointsToSend = this.polygons.map((polygon) =>
			polygon.getPoints().map((point) => ({
				...point, x: point.x * canvasState.pointCoefficient, y: point.y * canvasState.pointCoefficient
			}))
		)
		try {
			const response = await fetch(url, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json"
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: "follow", // manual, *follow, error
				referrerPolicy: "no-referrer", // no-referrer, *client
				body: JSON.stringify(pointsToSend), // body data type must match "Content-Type" header
			});

			// return await response.json();   // parses JSON response into native JavaScript objects
		} catch (e) {
			console.log("Ошибка");
		}

		// return false;
	}
};