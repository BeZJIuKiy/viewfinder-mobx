import {makeAutoObservable} from "mobx";

class EventsState {
	isVisibleCameraCanvas = false;
	isCreatePolygon = false;
	isShowControlCameraMove  = false;
	isShowImage = false;
	zoneAction = "";

	constructor() {
		makeAutoObservable(this)
	}

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

	setShowControlCameraMove = (isVisible) => {
		this.isShowControlCameraMove = isVisible;
	}
	reShowControlCameraMove = () => {
		this.isShowControlCameraMove = !this.isShowControlCameraMove;
	}

	setShowImage = (isVisible) => {
		this.isShowImage = isVisible;
	}
	reShowImage = () => {
		this.isShowImage = !this.isShowImage;
	}

	setZoneAction = (action) => {
		this.zoneAction = action;
	}
}

export default new EventsState();