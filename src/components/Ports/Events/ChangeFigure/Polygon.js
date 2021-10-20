import canvasState from "../../../../store/canvasState";

export const ZONE_TYPE_DEFAULT = "Default Area";
export const ZONE_TYPE_IN_OUT = "In/Out Port Area";
export const ZONE_TYPE_PARKING = "Parking Area";
export const ZONE_TYPE_RESTRICTED_AREA = "Restricted Area";

export default class Polygon {
	id = null;
	#idCounter = 0;

	#name = "";
	#startSize = {x: null, y: null, w: null, h: null};
	#points = [];

	#lineWidth = null;
	#lineColor = "";

	#pointSize = null;
	#pointColor = "";

	#centerPointSize = null;
	#centerPointColor = "";

	#attribute = {
		type: ZONE_TYPE_DEFAULT,
		fillColor: "rgba(170, 170, 170, 0.3)",
	}

	constructor(id, x, y, w, h) {
		this.id = id;
		this.#name = `Area #${this.id}`;
		this.#startSize = {x, y, w, h};
		this.#points = this.setPolygonData(x, y, w, h);
		this.#lineWidth = 2;
		this.#lineColor = "#000";

		this.#pointSize = 8;
		this.#pointColor = "#ff0000";

		this.#centerPointSize = 5;
		this.#centerPointColor = "gold";
	}

	getId = () => this.id;

	incCounter = () => {
		++this.#idCounter;
	}
	getIdCounter = () => this.#idCounter;

	setPolygonData(x, y, w, h) {
		return ([
			{id: this.#idCounter++, x: x, y: y},
			{id: this.#idCounter++, x: x + w, y: y},
			{id: this.#idCounter++, x: x + w, y: y + h},
			{id: this.#idCounter++, x: x, y: y + h},
		])
	}

	getStartSize = () => this.#startSize;

	addPoint(index, point) {
		this.#points.splice(index, 0, point);
	}

	setPoints = (points) => {
		this.#points = points;
	}
	getPoints = () => ([...this.#points]);

	setLineWidth = (lineWidth) => {
		this.#lineWidth = lineWidth
	};
	getLineWidth = () => this.#lineWidth;

	setLineColor = (lineColor) => {
		this.#lineColor = lineColor
	};
	getLineColor = () => this.#lineColor;

	setPointSize = (pointSize) => {
		this.#pointSize = pointSize
	};
	getPointSize = () => this.#pointSize;

	setPointColor = (pointColor) => {
		this.#pointColor = pointColor
	};
	getPointColor = () => this.#pointColor;

	setCenterPointSize = (centerPointSize) => {
		this.#centerPointSize = centerPointSize
	};
	getCenterPointSize = () => this.#centerPointSize;

	setCenterPointColor = (centerPointColor) => {
		this.#centerPointColor = centerPointColor
	};
	getCenterPointColor = () => this.#centerPointColor;

	deletePoint = (id) => {
		const index = this.#points.findIndex((point) => point.id === id)
		this.#points.splice(index, 1);
	}

	setAttributeType = (type) => {
		this.#attribute.type = type;
		switch (type) {
			case ZONE_TYPE_IN_OUT: {
				this.setAttributeFillColor(32, 165, 211, 0.3);
				break;
			}
			case ZONE_TYPE_PARKING: {
				this.setAttributeFillColor(211, 168, 32, 0.3);
				break;
			}
			case ZONE_TYPE_RESTRICTED_AREA: {
				this.setAttributeFillColor(211, 32, 32, 0.3);
				break;
			}
			default: {
				this.setAttributeFillColor(170, 170, 170, 0.3);
			}
		}
		canvasState.setPolygonChanged();
	}
	getAttributeType = () => this.#attribute.type;

	setAttributeFillColor = (r, g, b, a) => {
		this.#attribute.fillColor = `rgba(${r}, ${g}, ${b}, ${a})`;
		canvasState.setPolygonChanged();
	}
	getAttributeFillColor = () => this.#attribute.fillColor;

	setAttribute = (attributes) => {
		// this.#attribute = {...attributes}
		this.setAttributeType(attributes.type);
	}
	getAttribute = () => this.#attribute;

	setName = (name) => {
		this.#name = name;
		canvasState.setPolygonChanged();
	}
	getName = () => this.#name;
}