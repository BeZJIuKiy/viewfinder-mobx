import {makeAutoObservable} from "mobx";

class connects {
	serverEvents = "";
	wsCameraControl = "";

	constructor() {
		makeAutoObservable(this);
	}

	setServerEvents = (event) => {
		this.serverEvents = event;
	}

	setWSCameraCameraControl = (ws) => {
		this.wsCameraControl = ws;
	}
}

export default new connects();