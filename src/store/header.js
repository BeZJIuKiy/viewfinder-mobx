import {makeAutoObservable} from "mobx";
import ports, {userAvatar} from "./ports";

class header {
	allNewNote = null;
	portsNewNote = [];
	camerasNewNote = [];

	portsNoteTest = {};
	camerasNoteTest = {};

	miniAvatar = userAvatar;

	constructor() {
		makeAutoObservable(this);
	}

	// addAllNewNotifications = (portsNote) => {
	// 	let allNewNote = 0;
	// 	portsNote.forEach((portNote) => allNewNote += portNote);
	// 	this.allNewNote = allNewNote;
	// }
	// addNewPortsNotifications = (index, notif) => {
	// 	console.log(notif);
	// 	this.portsNewNote[index]
	// 		? this.portsNewNote[index] = notif
	// 		: this.portsNewNote.push(notif);
	// }
	// addNewCamerasNotifications = (index, notif) => {
	// 	this.camerasNewNote[index]
	// 		? this.camerasNewNote[index] = notif
	// 		: this.camerasNewNote.push(notif);
	// }
	checkNewNotifications = () => {
		let allNewNote = 0;
		ports.data.forEach((port) => {
			let allPortsNotifications = 0;
			port.cameras.forEach((camera) => {
				const allCameraNotifications = camera.events.filter(({newEvent}) => newEvent).length;
				allPortsNotifications += allCameraNotifications;
				this.camerasNoteTest[camera.id] = allCameraNotifications;
				allNewNote += allCameraNotifications;
			})

			this.portsNoteTest[port.id] = allPortsNotifications;
		})

		this.allNewNote = allNewNote;
		// console.log(allNewNote);
	}
	addAllNewNotifications = () => {
		let allNewNote = 0;
		for (const key in this.portsNoteTest) allNewNote += this.portsNoteTest[key]
		this.allNewNote = allNewNote;
	}
	addNewPortsNotifications = (id, notif) => {
		this.portsNoteTest[id] = notif;

	}
	addNewCamerasNotifications = (id, notif) => {
		this.camerasNoteTest[id] = notif;
	}
}

export default new header();