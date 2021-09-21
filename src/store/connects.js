import {makeAutoObservable} from "mobx";

class connects {
	serverEvents = "";
	wsCameraControl = "";
	wsSound = "";

	urlEvents = "";
	urlPortsPage = "";
	urlZones = "";

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


	setUrlEvents = (url) => {
		this.urlEvents = url;
	}
	setUrlPortsPage = (url) => {
		this.urlPortsPage = url;
	}
	setUrlZones = (url) => {
		this.urlZones = url;
	}
}

export default new connects();