import {makeAutoObservable} from "mobx";

class connects {
	serverEvents = "";
	wsCameraControl = "";
	wsSound = "";

	constructor() {
		makeAutoObservable(this);
	}

	setServerEvents = (event) => {
		this.serverEvents = event;
	}

	setWSCameraCameraControl = (ws) => {
		this.wsCameraControl = ws;
	}

	setWSSound = (ws) => {
		this.wsSound = ws;
	}
}

export default new connects();