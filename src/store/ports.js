// Icons
import mIcon_ports from '../components/Ports/Drawer/images/harborIcon02.png';
import mIcon_cameras from '../components/Ports/Drawer/images/camIcon.png';
import previewImg from '../img/preView̆.jpg';
import previewImg2 from '../img/preView̆02.jpg';
import previewImg3 from '../img/preView̆03.jpg';

// Boath
import boat1_03 from '../components/Ports/Events/images/b1-03.jpg'
import boat1_04 from '../components/Ports/Events/images/b1-04.jpg'
import {makeAutoObservable} from "mobx";
import boat1_01 from '../components/Ports/Events/images/b1-01.jpg'
import canvasState from "./canvasState";
import {AutoSave} from "./AutoSave";
import {makePersistable} from "mobx-persist-store";
// import boat1_02 from '../components/Ports/Events/images/b1-02.jpg'
// import boat1_05 from '../components/Ports/Events/images/b1-05.jpg'

export const userAvatar = 'https://diletant.media/upload/medialibrary/75f/75fc56318cbdcf69f479b48892351a73.jpg';

class ports {
	windowSize = {
		width: null,
		height: null,
	};

	counter = {
		portsId: 0,
		camerasId: 10,
		eventsId: 0,
	};

	portIcon = {
		mapIcon: 'islands#blueWaterwayIcon',
		drawerIcon: mIcon_ports,
	};

	cameraIcon = {
		mapIcon: 'islands#blueVideoIcon',
		drawerIcon: mIcon_cameras,
	};

	selectedObjects = {
		port: {},
		camera: {},
		event: {},
		shipImage: {
			index: 0,
			isVisible: false,
			id: -1,
		},
	};

	data = [
		{
			id: this.counter.portsId++,
			country: 'Russia',
			city: 'Saint Petersburg',
			description: 'Saint Petersburg',
			coordinates: [59.977915, 30.240934],
			// zoom: 3.3,
			zoom: 5,
			link: '',

			cameras: [
				{
					id: this.counter.camerasId++,
					country: 'Russia',
					city: 'Saint Petersburg',
					name: 'Camera 1',
					type: 'Hikvision',
					move: 'STATIC',
					viewingAngle: '130',
					description: 'Club Parking STATIC',
					coordinates: [59.977915, 30.240934],
					zoom: 15,
					// link: 'https://rtsp.me/embed/ayAby5ia',
					link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
					// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
					// previewLink: "http://87.244.33.186:8001/bgr",
					previewLink: "http://192.168.250.210:8000/bgr",
					// previewLink: previewImg,
					// link: 'http://87.244.33.186:8001/bgr',

					events: [
						{
							id: this.counter.eventsId++,
							typeError: 'Warning',
							typeVessel: "Tugboat",
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
						{
							id: this.counter.eventsId++,
							typeError: 'Regular',
							typeVessel: "Dry Cargo Ship",
							location: 'Russia',
							city: 'Saint Petersburg',
							camera: 'Camera 1',
							date: '2020-12-21',
							time: '10:22:31',
							timezone: '+0300',
							imageLink: boat1_01,
							newEvent: true,
							description: 'Nothing interesting, keep moving on',
						},
						{
							id: this.counter.eventsId++,
							typeError: 'Critical',
							typeVessel: "Dry Cargo Ship",
							location: 'Russia',
							city: 'Saint Petersburg',
							camera: 'Camera 1',
							date: '2020-12-21',
							time: '10:24:16',
							timezone: '+0300',
							imageLink: boat1_04,
							newEvent: true,
							description: 'Nothing interesting, keep moving on',
						},
					],
				},
				{
					id: this.counter.camerasId++,
					country: 'Russia',
					city: 'Saint Petersburg',
					name: 'Camera 2',
					type: 'Hikvision',
					move: 'PTZ',
					viewingAngle: '80',
					description: 'Club Parking PTZ',
					coordinates: [59.977913, 30.240952],
					zoom: 15,
					link: 'https://rtsp.me/embed/hitQb4bf',
					// link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
					// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
					// previewLink: "http://87.244.33.186:8001/bgr",
					previewLink: "http://192.168.250.210:8000/bgr",
					// previewLink: "http://192.168.240.121:8000/bgr",
					// link: 'http://87.244.33.186:8081/bgr',
					// link: 'http://192.168.250.210:8000/bgr',

					events: [
						{
							id: this.counter.eventsId++,
							typeError: 'Regular',
							typeVessel: "Dry Cargo Ship",
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
						{
							id: this.counter.eventsId++,
							typeError: 'Warning',
							typeVessel: "Tugboat",
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
					],
				},

				/* В случае необходимости */
				// {
				// 	id: this.counter.camerasId++,
				// 	country: 'Russia',
				// 	city: 'Saint Petersburg',
				// 	name: 'Camera 3',
				// 	type: 'Hikvision',
				// 	move: 'PTZ',
				// 	viewingAngle: '80',
				// 	description: 'Club Parking PTZ 3',
				// 	coordinates: [59.977913, 30.240952],
				// 	zoom: 15,
				// 	link: 'https://rtsp.me/embed/hitQb4bf',
				// 	// link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
				// 	// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
				// 	// previewLink: "http://87.244.33.186:8001/bgr",
				// 	previewLink: previewImg3,
				// 	// previewLink: "https://rtsp.me/embed/hitQb4bf",
				// 	// previewLink: "http://192.168.240.121:8000/bgr",
				// 	// link: 'http://87.244.33.186:8081/bgr',
				// 	// link: 'http://192.168.250.210:8000/bgr',
				//
				// 	events: [
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Regular',
				// 			typeVessel: "Dry Cargo Ship",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 2',
				// 			date: '2020-12-21',
				// 			time: '10:22:31',
				// 			timezone: '+0300',
				// 			imageLink: boat1_04,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Warning',
				// 			typeVessel: "Tugboat",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 1',
				// 			date: '2020-12-21',
				// 			time: '10:20:08',
				// 			timezone: '+0300',
				// 			imageLink: boat1_03,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 	],
				// },
			],
		},

		// {
		// 	id: this.counter.portsId++,
		// 	country: 'Russia',
		// 	city: 'Saint Petersburg 2',
		// 	description: 'Saint Petersburg 2',
		// 	coordinates: [59.977915, 30.240934],
		// 	// zoom: 3.3,
		// 	zoom: 5,
		// 	link: '',
		//
		// 	cameras: [
		// 		{
		// 			id: this.counter.camerasId++,
		// 			country: 'Russia',
		// 			city: 'Saint Petersburg 2',
		// 			name: 'Camera 1',
		// 			type: 'Hikvision',
		// 			move: 'STATIC',
		// 			viewingAngle: '130',
		// 			description: 'Club Parking STATIC 2',
		// 			coordinates: [59.977915, 30.240934],
		// 			zoom: 15,
		// 			link: 'http://192.168.250.193:8080/bgr',
		// 			previewLink: previewImg,
		// 			// link: 'https://rtsp.me/embed/ayAby5ia',
		//
		// 			events: [
		// 				{
		// 					id: this.counter.eventsId++,
		// 					// typeError: 'Regular',
		// 					typeError: 'Warning',
		// 					typeVessel: "Tugboat",
		// 					location: 'Russia',
		// 					city: 'Saint Petersburg',
		// 					camera: 'Camera 1',
		// 					date: '2020-12-21',
		// 					time: '10:20:08',
		// 					timezone: '+0300',
		// 					imageLink: boat1_03,
		// 					newEvent: true,
		// 					description: 'Nothing interesting, keep moving on',
		// 				},
		//
		// 				{
		// 					id: this.counter.eventsId++,
		// 					typeError: 'Regular',
		// 					typeVessel: "Dry Cargo Ship",
		// 					location: 'Russia',
		// 					city: 'Saint Petersburg',
		// 					camera: 'Camera 1',
		// 					date: '2020-12-21',
		// 					time: '10:22:31',
		// 					timezone: '+0300',
		// 					imageLink: boat1_01,
		// 					newEvent: true,
		// 					description: 'Nothing interesting, keep moving on',
		// 				},
		//
		// 				{
		// 					id: this.counter.eventsId++,
		// 					typeError: 'Critical',
		// 					typeVessel: "Dry Cargo Ship",
		// 					location: 'Russia',
		// 					city: 'Saint Petersburg',
		// 					camera: 'Camera 1',
		// 					date: '2020-12-21',
		// 					time: '10:24:16',
		// 					timezone: '+0300',
		// 					imageLink: boat1_04,
		// 					newEvent: true,
		// 					description: 'Nothing interesting, keep moving on',
		// 				},
		// 			],
		// 		},
		//
		// 		{
		// 			id: this.counter.camerasId++,
		// 			country: 'Russia',
		// 			city: 'Saint Petersburg',
		// 			name: 'Camera 2',
		// 			type: 'Hikvision',
		// 			move: 'PTZ',
		// 			viewingAngle: '80',
		// 			description: 'Club Parking PTZ 2',
		// 			coordinates: [59.977913, 30.240952],
		// 			zoom: 15,
		// 			link: 'http://192.168.250.193:8080/bgr',
		// 			previewLink: previewImg,
		// 			// link: 'https://rtsp.me/embed/hitQb4bf',
		//
		// 			events: [
		// 				{
		// 					id: this.counter.eventsId++,
		// 					typeError: 'Regular',
		// 					typeVessel: "Dry Cargo Ship",
		// 					location: 'Russia',
		// 					city: 'Saint Petersburg',
		// 					camera: 'Camera 2',
		// 					date: '2020-12-21',
		// 					time: '10:22:31',
		// 					timezone: '+0300',
		// 					imageLink: boat1_04,
		// 					newEvent: true,
		// 					description: 'Nothing interesting, keep moving on',
		// 				},
		// 			],
		// 		},
		//
		// 		// {
		// 		// 	id: this.counter.camerasId++,
		// 		// 	country: 'Russia',
		// 		// 	city: 'Saint Petersburg',
		// 		// 	name: 'Camera 2',
		// 		// 	type: 'Hikvision',
		// 		// 	move: 'PTZ',
		// 		// 	viewingAngle: '80',
		// 		// 	description: 'Club Parking PTZ',
		// 		// 	coordinates: [59.977913, 30.240952],
		// 		// 	zoom: 15,
		// 		// 	link: 'https://rtsp.me/embed/hitQb4bf/',
		// 		//
		// 		// 	events: [
		// 		// 		{
		// 		// 			id: this.counter.eventsId++,
		// 		// 			typeError: 'Regular',
		// 		// 			typeVessel: "Dry Cargo Ship",
		// 		// 			location: 'Russia',
		// 		// 			city: 'Saint Petersburg',
		// 		// 			camera: 'Camera 2',
		// 		// 			date: '2020-12-21',
		// 		// 			time: '10:22:31',
		// 		// 			timezone: '+0300',
		// 		// 			imageLink: boat1_04,
		// 		// 			newEvent: true,
		// 		// 			description: 'Nothing interesting, keep moving on',
		// 		// 		},
		// 		// 	],
		// 		// },
		// 	],
		// },
	];

	searchQuery = {};

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});

		// makePersistable(this, {
		//     name: "PortsStore",
		//     properties: ["data", "selectedObjects"],
		//     storage: window.localStorage
		// });

		// makePersistable(
		//     this,
		//     {
		//         name: "PortsStore",
		//         properties: ["selectedObjects", "data"],
		//         storage: window.localStorage,  // localForage, window.localStorage, AsyncStorage all have the same interface
		//         expireIn: 86400000, // One day in millsesconds
		//         removeOnExpiration: true,
		//         stringify: false,
		//         debugMode: true,
		//     },
		// );

	};

	setSelectedPort = (portId) => {
		this.selectedObjects.port = this.data.find((port) => port.id === portId);
	};
	setSelectedCamera = (camId) => {
		if (Number.isInteger(this.selectedObjects.port.id) === false) {
			this.selectedObjects.port = this.data[0];
		}

		this.selectedObjects.camera = this.selectedObjects.port.cameras.find((camera) => camera.id === camId);
		canvasState.setPolygonInCamera(this.selectedObjects.camera.id);
	};

	setSelectedEvent = (id) => {
		this.selectedObjects.event = this.selectedObjects.camera.events.find(event => event.id === id);
	};
	clearSelectedEvent = () => {
		this.selectedObjects.event = {};
	};

	setEvents = (events) => {
		// this.selectedObjects.camera.events = events;
		this.data[0].cameras[0].events = events;
	}

	setIsNewNotif = (id, isNew) => {
		const event = this.selectedObjects.camera.events.find(event => event.id === id);
		event.newEvent = isNew;
	}

	setVisibleSelectedImage = (isVisible) => {
		this.selectedObjects.shipImage.isVisible = isVisible;
	};
	setImageIndex = (index) => {
		this.selectedObjects.shipImage.index = index;
	};
	setImageId = (id) => {
		this.selectedObjects.shipImage.id = id;
	};

	clearSelectedObjects = () => {
		this.selectedObjects = {
			port: {},
			camera: {},
			event: {},
			shipImage: {
				index: 0,
				isVisible: false,
				id: -1,
			},
		};
	};

	setSearchQuery = (secretTitle, data) => {
		this.searchQuery[secretTitle] = [...data];
	}

	clearSearchQuery = () => {
		this.searchQuery = {};
	}
}

export default new ports();