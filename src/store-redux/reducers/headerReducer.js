import {userAvatar} from "./portsReducer";

const initialState = {
	allNewNote: null,
	portsNewNote: [],
	camerasNewNote: [],
	miniAvatar: userAvatar,
}

export const ADD_ALL_NEW_NOTIFICATIONS = "ADD_ALL_NEW_NOTIFICATIONS";
export const ADD_NEW_PORTS_NOTIFICATIONS = "ADD_NEW_PORTS_NOTIFICATIONS";
export const ADD_NEW_CAMERAS_NOTIFICATIONS = "ADD_NEW_CAMERAS_NOTIFICATIONS";


export const headerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ALL_NEW_NOTIFICATIONS: {
			let allNewNote = 0;
			action.payload.forEach((portNote) => allNewNote += portNote);
			return {...state, allNewNote};
		}

		case ADD_NEW_PORTS_NOTIFICATIONS: {
			const {portsNewNote} = state;
			const {index: i, note} = action.payload;

			portsNewNote[i]
				? portsNewNote[i] = note
				: portsNewNote.push(note);

			return {...state, portsNewNote};
		}

		case ADD_NEW_CAMERAS_NOTIFICATIONS: {
			const {camerasNewNote} = state;
			const {index: i, note} = action.payload;

			camerasNewNote[i]
				? camerasNewNote[i] = note
				: camerasNewNote.push(note);

			return {...state, camerasNewNote};
		}

		default:
			return state;
	}
}