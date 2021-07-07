// Icons
import mIcon_ports from '../components/Ports/Drawer/images/harborIcon02.png';
import mIcon_cameras from '../components/Ports/Drawer/images/camIcon.png';

// Boath
import boat1_03 from '../components/Ports/Events/images/b1-03.jpg'
import boat1_04 from '../components/Ports/Events/images/b1-04.jpg'
import {makeAutoObservable} from "mobx";
import boat1_01 from '../components/Ports/Events/images/b1-01.jpg'
import canvasState from "./canvasState";
// import boat1_02 from '../components/Ports/Events/images/b1-02.jpg'
// import boat1_05 from '../components/Ports/Events/images/b1-05.jpg'

export const userAvatar = 'https://diletant.media/upload/medialibrary/75f/75fc56318cbdcf69f479b48892351a73.jpg';

class ports {
	counter = {
		portsId: 0,
		camerasId: 0,
		eventsId: 0,
	};

	portIcon = {
		map: 'islands#blueWaterwayIcon',
		drawer: mIcon_ports,
	};

	cameraIcon = {
		map: 'islands#blueVideoIcon',
		drawer: mIcon_cameras,
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

			cameras: {
				data: [
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
						link: 'https://rtsp.me/embed/ayAby5ia',

						events: [
							{
								id: this.counter.eventsId++,
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

							{
								id: this.counter.eventsId++,
								typeError: 'Regular',
								typeVessel: 'Boat 2',
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
								typeError: 'Regular',
								typeVessel: 'Boat 2',
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
						link: 'https://rtsp.me/embed/KHyZd4ky/',

						events: [
							// {
							// 	id: this.counter.eventsId++,
							// 	typeError: 'Regular',
							// 	typeVessel: 'Boat 2',
							// 	location: 'Russia',
							// 	city: 'Saint Petersburg',
							// 	camera: 'Camera 2',
							// 	date: '2020-12-21',
							// 	time: '10:22:31',
							// 	timezone: '+0300',
							// 	imageLink: boat1_04,
							// 	newEvent: true,
							// 	description: 'Nothing interesting, keep moving on',
							// },
						],
					},
				],
			},
		},

		// {
		// 	id: this.counter.portsId++,
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
		// 				id: this.counter.camerasId++,
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
		// 						id: this.counter.eventsId++,
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
		// 						id: this.counter.eventsId++,
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
		// 						id: this.counter.eventsId++,
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
		// 				id: this.counter.camerasId++,
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
		// 						id: this.counter.eventsId++,
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
		// 						id: this.counter.eventsId++,
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
		// 						id: this.counter.eventsId++,
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
	];

	constructor() {
		makeAutoObservable(this)
	}

	setSelectedPort = (index) => {
		this.selectedObjects.port = this.data[index];
	};
	setSelectedCamera = (index) => {
		if (Number.isInteger(this.selectedObjects.port.id) === false) {
			this.selectedObjects.port = this.data[0];
		}

		this.selectedObjects.camera = this.selectedObjects.port.cameras.data[index];
		canvasState.setCameraInMap(this.selectedObjects.camera.id);
	};

	setSelectedEvent = (index) => {
		this.selectedObjects.event = this.selectedObjects.camera.events[index];
	};
	clearSelectedEvent = () => {
		this.selectedObjects.event = {};
	};

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
}

export default new ports();