import {
	ADD_NEW_PORTS_NOTIFICATIONS,
	ADD_ALL_NEW_NOTIFICATIONS,
	ADD_NEW_CAMERAS_NOTIFICATIONS
} from "../reducers/headerReducer";

export const AddAllNewNotificationAction = (portsNote) => ({type: ADD_ALL_NEW_NOTIFICATIONS, payload: portsNote});
export const AddNewPortsNotificationAction = (index, note) => ({type: ADD_NEW_PORTS_NOTIFICATIONS, payload: {index, note}});
export const AddNewCamerasNotificationAction = (index, note) => ({type: ADD_NEW_CAMERAS_NOTIFICATIONS, payload: {index, note}});

