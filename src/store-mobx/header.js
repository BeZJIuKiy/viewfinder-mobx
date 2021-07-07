import {makeAutoObservable} from "mobx";
import {userAvatar} from "./ports";
import {
	ADD_ALL_NEW_NOTIFICATIONS,
	ADD_NEW_CAMERAS_NOTIFICATIONS,
	ADD_NEW_PORTS_NOTIFICATIONS
} from "../store-redux/reducers/headerReducer";


class header {
	allNewNote = null;
	portsNewNote = [];
	camerasNewNote = [];
	miniAvatar = userAvatar;

	constructor() {
		makeAutoObservable(this);
	}

	addAllNewNotifications = (portsNote) => {
		let allNewNote = 0;
		portsNote.forEach((portNote) => allNewNote += portNote);
		this.allNewNote = allNewNote;
	}
	addNewPortsNotifications = (index, notif) => {
		this.portsNewNote[index]
			? this.portsNewNote[index] = notif
			: this.portsNewNote.push(notif);
	}
	addNewCamerasNotifications = (index, notif) => {
		this.camerasNewNote[index]
			? this.camerasNewNote[index] = notif
			: this.camerasNewNote.push(notif);
	}
}

export default new header();