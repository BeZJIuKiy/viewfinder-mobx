// Icons
import mIcon_ports from '../../components/Ports/Drawer/images/harborIcon02.png';
import mIcon_cameras from '../../components/Ports/Drawer/images/camIcon.png';

// Boath
import boat1_01 from '../../components/Ports/Events/images/b1-01.jpg'
// import boat1_02 from '../../components/Ports/Events/images/b1-02.jpg'
import boat1_03 from '../../components/Ports/Events/images/b1-03.jpg'
import boat1_04 from '../../components/Ports/Events/images/b1-04.jpg'
// import boat1_05 from '../../components/Ports/Events/images/b1-05.jpg'

export const userAvatar = 'https://diletant.media/upload/medialibrary/75f/75fc56318cbdcf69f479b48892351a73.jpg';

const counter = {
	portsId: 0,
	camerasId: 0,
	eventsId: 0,
}

const initialState = {
	portIcon: {
		map: 'islands#blueWaterwayIcon',
		drawer: mIcon_ports,
	},

	cameraIcon: {
		map: 'islands#blueVideoIcon',
		drawer: mIcon_cameras,
	},

	selectedObjects: {
		port: {},
		camera: {},
		event: {},
		shipImage: {
			index: 0,
			isVisible: false,
			id: -1,
		},
	},

	data: [
		{
			id: counter.portsId++,
			country: 'Russia',
			city: 'Saint Petersburg',
			description: 'Saint Petersburg',
			coordinates: [59.977915, 30.240934],
			// zoom: 3.3,
			zoom: 5,
			link: '',

			cameras: {
				data: [
					{
						id: counter.camerasId++,
						country: 'Russia',
						city: 'Saint Petersburg',
						name: 'Camera 1',
						type: 'Hikvision',
						move: 'STATIC',
						viewingAngle: '130',
						description: 'Club Parking STATIC',
						coordinates: [59.977915, 30.240934],
						zoom: 15,
						link: 'https://rtsp.me/embed/ayAby5ia',

						events: [
							{
								id: counter.eventsId++,
								typeError: 'Regular',
								typeVessel: 'Boat 1',
								location: 'Russia',
								city: 'Saint Petersburg',
								camera: 'Camera 1',
								date: '2020-12-21',
								time: '10:20:08',
								timezone: '+0300',
								imageLink: boat1_03,
								newEvent: true,
								description: 'Nothing interesting, keep moving on',
							},
							//
							// {
							// 	id: counter.eventsId++,
							// 	typeError: 'Regular',
							// 	typeVessel: 'Boat 2',
							// 	location: 'Russia',
							// 	city: 'Saint Petersburg',
							// 	camera: 'Camera 1',
							// 	date: '2020-12-21',
							// 	time: '10:22:31',
							// 	timezone: '+0300',
							// 	imageLink: boat1_01,
							// 	newEvent: true,
							// 	description: 'Nothing interesting, keep moving on',
							// },
							//
							// {
							// 	id: counter.eventsId++,
							// 	typeError: 'Regular',
							// 	typeVessel: 'Boat 2',
							// 	location: 'Russia',
							// 	city: 'Saint Petersburg',
							// 	camera: 'Camera 1',
							// 	date: '2020-12-21',
							// 	time: '10:24:16',
							// 	timezone: '+0300',
							// 	imageLink: boat1_04,
							// 	newEvent: true,
							// 	description: 'Nothing interesting, keep moving on',
							// },
						],
					},

					{
						id: counter.camerasId++,
						country: 'Russia',
						city: 'Saint Petersburg',
						name: 'Camera 2',
						type: 'Hikvision',
						move: 'PTZ',
						viewingAngle: '80',
						description: 'Club Parking PTZ',
						coordinates: [59.977913, 30.240952],
						zoom: 15,
						link: 'https://rtsp.me/embed/KHyZd4ky/',

						events: [
							{
								id: counter.eventsId++,
								typeError: 'Regular',
								typeVessel: 'Boat 2',
								location: 'Russia',
								city: 'Saint Petersburg',
								camera: 'Camera 2',
								date: '2020-12-21',
								time: '10:22:31',
								timezone: '+0300',
								imageLink: boat1_04,
								newEvent: true,
								description: 'Nothing interesting, keep moving on',
							},
						],
					},
				],
			},
		},

		// {
		// 	id: counter.portsId++,
		// 	country: 'Russia',
		// 	city: 'Saint Petersburg_02',
		// 	description: 'Saint Petersburg_02',
		// 	coordinates: [59.977915, 30.240934],
		// 	// zoom: 3.3,
		// 	zoom: 5,
		// 	link: '',
		//
		// 	cameras: {
		// 		data: [
		// 			{
		// 				id: counter.camerasId++,
		// 				country: 'Russia',
		// 				city: 'Saint Petersburg_02',
		// 				name: 'Camera 1',
		// 				type: 'Hikvision',
		// 				move: 'STATIC',
		// 				viewingAngle: '130',
		// 				description: 'Club Parking STATIC',
		// 				coordinates: [59.977915, 30.240934],
		// 				zoom: 15,
		// 				link: 'https://rtsp.me/embed/ayAby5ia',
		//
		// 				events: [
		// 					{
		// 						id: counter.eventsId++,
		// 						typeError: 'Regular',
		// 						typeVessel: 'Boat 1',
		// 						location: 'Russia',
		// 						city: 'Saint Petersburg_02',
		// 						camera: 'Camera 1',
		// 						date: '2020-12-21',
		// 						time: '10:20:08',
		// 						timezone: '+0300',
		// 						imageLink: boat1_03,
		// 						newEvent: true,
		// 						description: 'Nothing interesting, keep moving on',
		// 					},
		//
		// 					{
		// 						id: counter.eventsId++,
		// 						typeError: 'Regular',
		// 						typeVessel: 'Boat 2',
		// 						location: 'Russia',
		// 						city: 'Saint Petersburg_02',
		// 						camera: 'Camera 1',
		// 						date: '2020-12-21',
		// 						time: '10:22:31',
		// 						timezone: '+0300',
		// 						imageLink: boat1_01,
		// 						newEvent: true,
		// 						description: 'Nothing interesting, keep moving on',
		// 					},
		//
		// 					{
		// 						id: counter.eventsId++,
		// 						typeError: 'Regular',
		// 						typeVessel: 'Boat 2',
		// 						location: 'Russia',
		// 						city: 'Saint Petersburg_02',
		// 						camera: 'Camera 1',
		// 						date: '2020-12-21',
		// 						time: '10:24:16',
		// 						timezone: '+0300',
		// 						imageLink: boat1_04,
		// 						newEvent: true,
		// 						description: 'Nothing interesting, keep moving on',
		// 					},
		// 				],
		// 			},
		//
		// 			{
		// 				id: counter.camerasId++,
		// 				country: 'Russia',
		// 				city: 'Saint Petersburg',
		// 				name: 'Camera 2',
		// 				type: 'Hikvision',
		// 				move: 'PTZ',
		// 				viewingAngle: '80',
		// 				description: 'Club Parking PTZ',
		// 				coordinates: [59.977913, 30.240952],
		// 				zoom: 15,
		// 				link: 'https://rtsp.me/embed/KHyZd4ky/',
		//
		// 				events: [
		// 					{
		// 						id: counter.eventsId++,
		// 						typeError: 'Regular',
		// 						typeVessel: 'Boat 2',
		// 						location: 'Russia',
		// 						city: 'Saint Petersburg_02',
		// 						camera: 'Camera 2',
		// 						date: '2020-12-21',
		// 						time: '10:22:31',
		// 						timezone: '+0300',
		// 						imageLink: boat1_04,
		// 						newEvent: true,
		// 						description: 'Nothing interesting, keep moving on',
		// 					},
		//
		// 					{
		// 						id: counter.eventsId++,
		// 						typeError: 'Regular',
		// 						typeVessel: 'Boat 3',
		// 						location: 'Russia',
		// 						city: 'Saint Petersburg_02',
		// 						camera: 'Camera 2',
		// 						date: '2020-12-21',
		// 						time: '10:22:31',
		// 						timezone: '+0300',
		// 						imageLink: boat1_01,
		// 						newEvent: true,
		// 						description: 'Nothing interesting, keep moving on',
		// 					},
		//
		// 					{
		// 						id: counter.eventsId++,
		// 						typeError: 'Regular',
		// 						typeVessel: 'Boat 3',
		// 						location: 'Russia',
		// 						city: 'Saint Petersburg_02',
		// 						camera: 'Camera 2',
		// 						date: '2020-12-21',
		// 						time: '10:22:31',
		// 						timezone: '+0300',
		// 						imageLink: boat1_03,
		// 						newEvent: true,
		// 						description: 'Nothing interesting, keep moving on',
		// 					},
		// 				],
		// 			},
		// 		],
		// 	},
		// },
	],
}

// Actions
export const SET_SELECTED_PORT = 'SET_SELECTED_PORT';
export const SET_SELECTED_CAMERA = 'SET_CURRENT_CAMERA';
export const CLEAR_SELECTED_OBJECTS = 'CLEAR_SELECTED_OBJECTS';

export const SET_SELECTED_EVENT = "SET_SELECTED_EVENT";
export const CLEAR_SELECTED_EVENT = 'CLEAR_SELECTED_EVENT';

export const SET_VISIBLE_SELECTED_IMAGE = "SET_VISIBLE_SELECTED_IMAGE";
export const SET_IMAGE_INDEX = "SET_IMAGE_INDEX";
export const SET_IMAGE_ID = "SET_IMAGE_ID";


export const portsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_PORT: {
			const {selectedObjects} = state;
			const i = action.payload;
			selectedObjects.port = state.data[i];
			return {...state, selectedObjects};
		}

		case SET_SELECTED_CAMERA: {
			const {selectedObjects} = state
			const {port} = selectedObjects;
			const i = action.payload;

			selectedObjects.camera = port.cameras.data[i];
			return {...state, selectedObjects}
		}

		case CLEAR_SELECTED_OBJECTS: {
			return {...state, selectedObjects: action.payload}
		}

		case SET_SELECTED_EVENT: {
			const {selectedObjects} = state;
			const {camera} = selectedObjects;
			const i = action.payload;

			selectedObjects.event = camera.events[i];
			return {...state, selectedObjects};
		}

		case CLEAR_SELECTED_EVENT: {
			const {selectedObjects} = state;
			selectedObjects.event = action.payload.event;
			return {...state, selectedObjects}
		}

		case SET_VISIBLE_SELECTED_IMAGE: {
			const {selectedObjects} = state;
			const {shipImage} = selectedObjects;
			shipImage.isVisible = action.payload;
			return {...state, selectedObjects}
		}

		case SET_IMAGE_INDEX: {
			const {selectedObjects} = state;
			const {shipImage} = selectedObjects;
			shipImage.index = action.payload;
			return {...state, selectedObjects}
		}

		case SET_IMAGE_ID: {
			const {selectedObjects} = state;
			const {shipImage} = selectedObjects;
			shipImage.id = action.payload;
			return {...state, selectedObjects}
		}

		default:
			return state;
	}
}