import {
	CLEAR_SELECTED_EVENT,
	CLEAR_SELECTED_OBJECTS, SET_IMAGE_ID, SET_IMAGE_INDEX,
	SET_SELECTED_CAMERA, SET_SELECTED_EVENT,
	SET_SELECTED_PORT,
	SET_VISIBLE_SELECTED_IMAGE
} from "../reducers/portsReducer";


export const SelectedPortAction = (number) => ({type: SET_SELECTED_PORT, payload: number});
export const SelectedCameraAction = (number) => ({type: SET_SELECTED_CAMERA, payload: number});
export const ClearSelectedAction = () => ({
	type: CLEAR_SELECTED_OBJECTS,
	payload: {
		port: {},
		camera: {},
		event: {},
		shipImage: {
			index: 0,
			isVisible: false,
			id: -1,
		},
	}
});

export const SelectedEventAction = (number) => ({type: SET_SELECTED_EVENT, payload: number});
export const ClearSelectedEventAction = () => ({
	type: CLEAR_SELECTED_EVENT,
	payload: {
		event: {},
	}
});

export const SelectedImageVisibleAction = (isVisible) => ({type: SET_VISIBLE_SELECTED_IMAGE, payload: isVisible});
export const SelectedShipImageAction = (number) => ({type: SET_IMAGE_INDEX, payload: number});
export const SelectedShipImageIdAction = (number) => ({type: SET_IMAGE_ID, payload: number});
