import React, {useEffect, useState} from 'react';
import {TestList} from './TestList';
import {TestImage} from './TestImage';
import {BoatEvents} from './BoatEvents';
import {Header} from '../Header/Header';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import './events.css'
import ports from "../../../store/ports";
import header from "../../../store/header";
import {observer} from "mobx-react-lite";
import {Canvas} from "./Canvas";
import canvasState from "../../../store/canvasState";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Polygons from "./chageFigure/Polygons";
import Polygon from "./chageFigure/Polygon";
import {DELETE, SET_COLOR, SET_NAME, SET_TYPE, ZoneActions} from "./ZoneActions/ZoneActions";
import {SetTypeAction} from "./ZoneActions/SetTypeAction";
import {ConfirmDeletePolygon} from "./ZoneActions/ConfirmDeletePolygon";
import boat1_04 from "./images/b1-04.jpg";

const useStyles = makeStyles((theme) => {


	return ({
		mainCameraControl: {
			width: "100%",
			display: "flex",
			marginTop: 5,

			"&>:nth-last-child(2)": {
				marginLeft: "auto",
			}
		},

		mainControlItems: {
			margin: "0 5px",
			height: "55px",

			"&.show": {
				display: "flex",
			},

			"&.hide": {
				display: "none",
			},
		},

		controlBtn: {

			"&.createDetectedZone": {
				fontWeight: 600,
				color: "#f50057",
				backgroundColor: "#ddd",
			},

			"&.save": {
				fontSize: 16,
				width: "6vw",
				backgroundColor: "green",
			},

			"&.cancel": {
				fontSize: 16,
				width: "6vw",
				backgroundColor: "red",
			}
		},

		forPreview: {
			width: 360,
			minWidth: "100%",
			height: 184,
		},
	})
});

export const Events20 = observer(() => {
	const classes = useStyles();

	const {
		selectedObjects: {
			port, camera, event,
			shipImage: {isVisible: imageVisible, id: imageId},
		},
	} = ports;
	const {camerasNewNote} = header;

	const [currentBoat, setCurrentBoat] = useState('');
	const [otherCameras, setOtherCameras] = useState();
	const [selectedEvent, setSelectedEvent] = useState(camera);
	const [action, setAction] = useState(<div/>);
	const [requestData, setRequestData] = useState()
	// const [notifications, setNotifications] = useState([]);
	// const [tResponse, setTResponse] = useState(null);


	useEffect(() => {
		setCurrentBoat(event.typeVessel);
		ports.setVisibleSelectedImage(false);
		ports.setImageId(-1);
	}, []);
	useEffect(() => {
		setCurrentBoat(event.typeVessel);
		ports.setVisibleSelectedImage(false);
		ports.setImageId(-1);
	}, [event]);
	useEffect(() => {
		setSelectedEvent(findImageId())
	}, [imageId]);
	useEffect(() => {
		setOtherCameras(port.cameras.map(({id, description, events, link, previewLink}, i) => {
			if (id !== camera.id) {
				const notifications = camerasNewNote[i]
					? (
						<IconButton color="inherit" style={{padding: '10px 0 0 5px'}}>
							<Badge badgeContent={camerasNewNote[i]} color="secondary">
								<NotificationsIcon color="primary"/>
							</Badge>
						</IconButton>
					)
					: ("");
				return (
					<div className='events__live__another__cameras__item' key={id}>
						<div className="events__live__go__another__camera"
						     onClick={() => otherCameraClick(i)}
						/>

						<div className={`events__live__another__cameras title`}>
							{description}
							{notifications}
						</div>

						{/*<iframe*/}
						{/*	width="100%" height="auto"*/}
						{/*	src={link}*/}
						{/*	title="YouTube video player"*/}
						{/*	frameBorder="0"*/}
						{/*	allow="accelerometer;*/}
						{/*           autoplay;*/}
						{/*           clipboard-write;*/}
						{/*           encrypted-media;*/}
						{/*           gyroscope;*/}
						{/*           picture-in-picture"*/}
						{/*	allowFullScreen*/}
						{/*/>*/}

						<img className={classes.forPreview} src={previewLink} alt="123"/>
					</div>
				)
			}
		}));
	}, [camera]);
	useEffect(() => {
		new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
	}, [camera, canvasState.isCreatePolygon, canvasState.isVisibleCameraCanvas]);
	useEffect(() => {
		switch (canvasState.zoneAction) {
			case SET_NAME: {
				console.log("SET_NAME");
				setAction(
					<div className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>

					</div>
				);
				break;
			}

			case SET_TYPE: {
				console.log("SET_TYPE");
				setAction(
					<div className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>
						<SetTypeAction/>
					</div>
				);
				break;
			}

			case SET_COLOR: {
				console.log("SET_COLOR");
				setAction(
					<div className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>

					</div>
				);
				break;
			}

			case DELETE: {
				console.log("DELETE");
				setAction(
					<ConfirmDeletePolygon/>
				);
				break;
			}
			default: {
				setAction(<div/>);
			}

		}
	}, [canvasState.zoneAction, canvasState.isCreatePolygon]);

	const findImageId = () => {
		const index = camera.events.findIndex(event => event.id === imageId);
		return camera.events[index > -1 ? index : 0];
	}
	const changeSelectedImg = (num) => {
		const id = selectedEvent.id;
		const cameraEvent = currentBoat
			? camera.events.filter(e => e.typeVessel === currentBoat)
			: camera.events;

		const index = cameraEvent.findIndex((element) => element.id === id);
		const task = (index + num < 0 || index + num === cameraEvent.length);
		const imgNum = task ? index : index + num;

		setSelectedEvent(cameraEvent[imgNum]);
		ports.setImageId(cameraEvent[imgNum].id);
	}
	const otherCameraClick = (i) => {
		ports.setSelectedCamera(i);
	}
	const closeImage = () => {
		ports.setVisibleSelectedImage(false);
		ports.setImageId(-1);
	}
	const createChangePolygon = () => {
		canvasState.setCreatePolygon(true);
		canvasState.tempPolygons = canvasState.saveDataTest[camera.id];
		// canvasState.tempPolygons = canvasState.test.get(camera.id);

		if (canvasState.tempPolygons.length) {
			canvasState.tempPolygons = canvasState.tempPolygons.map(polygon => {
				const points = polygon.getPoints().map(point => ({...point}));
				const attributeType = polygon.getAttributeType();

				const newPolygon = new Polygon(polygon.getId(), 0, 0, 0, 0);
				newPolygon.setPoints(points);
				newPolygon.setAttributeType(attributeType);

				return newPolygon;
			})
		} else {
			canvasState.tempPolygons = [];
		}
		new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
	}
	const saveNewPolygonsData = () => {
		// fetchPostPolygon(canvasState.test.get(camera.id), "http://192.168.250.183:8080/api/positions");
		postPoints();

		canvasState.setCreatePolygon(false);
		canvasState.setZoneAction("");
	}
	const deleteNewPolygonsData = () => {
		// canvasState.test.set(camera.id, canvasState.tempPolygons);
		canvasState.saveDataTest[camera.id] = canvasState.tempPolygons;
		canvasState.setCreatePolygon(false);
		canvasState.setZoneAction("");
	}

	const fetchPostPolygon = async (data, url) => {
		try {
			console.log(data)
			// const url = "http://192.168.250.183:8080/api/positions";

			const response = await fetch(url, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(data) // body data type must match "Content-Type" header
			});

			// console.log(response.message);

		} catch (e) {
			console.log(e)
		}
	}
	const fetchGetPolygon = () => {
		try {
			const url = "http://192.168.250.183:8080/api/positions";
			fetch(url)
				.then(response => response.json())
				.then(data => console.log(data));
		} catch (e) {
			console.log(e)
		}
	}


	const getPoints = (url) => {
		try {
			// const url = "http://192.168.250.183:8080/api/positions";
			// const url = "http://192.168.250.183:5001/api/zones";

			const test = fetch(url)
				.then(response => response.json())
				.then(data => console.log(data));

			console.log(test)

		} catch (e) {
			console.log(e)
		}
	};
	const postPoints = async () => {
		// const polygons = canvasState.test.get(ports.selectedObjects.camera.id).map((polygon) => ({
		const polygons = canvasState.saveDataTest[ports.selectedObjects.camera.id].map((polygon) => ({
				name: "111",
				color: polygon.getAttributeFillColor(),
				points: polygon.getPoints().map((point) => ({
					...point, x: point.x * canvasState.pointCoefficient, y: point.y * canvasState.pointCoefficient
				}))
			})
		);

		// const polygons = canvasState.test.get(ports.selectedObjects.camera.id).map((polygon) =>
		// 	polygon.getPoints().map((point) => ({
		// 		...point, x: point.x * canvasState.pointCoefficient, y: point.y * canvasState.pointCoefficient
		// 	}))
		// );

		const sendData = {
			portId: port.id,
			cameraId: camera.id,
			polygons,
		}

		try {
			const url = "http://192.168.250.183:5001/api/zones";

			await fetch(url, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json"
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: "follow", // manual, *follow, error
				referrerPolicy: "no-referrer", // no-referrer, *client
				body: JSON.stringify(sendData), // body data type must match "Content-Type" header
			})
		} catch (e) {
			console.log(e)
		}
	}


	if (!Number.isInteger(camera.id)) ports.setSelectedCamera(0);

	const visible = !!camera.events?.length ? "show" : "hide";
	const eventsTitle = !!camera.events?.length ? "Detected Objects" : "No Detected Objects";

	const width = canvasState.size.width / canvasState.pointCoefficient;
	const height = canvasState.size.height / canvasState.pointCoefficient;

	const btnControlName = canvasState.isVisibleCameraCanvas ? "Control Camera" : "Show Detected Areas";
	const btnControlZonesName = canvasState.isCreatePolygon ? "Draw detected areas " : "Create control zones";

	// const requestNotifications = [
	//     {
	//         "id": 9,
	//         "name": "zona1",
	//         "img": null
	//     },
	//     {
	//         "id": 10,
	//         "name": "zona2",
	//         "img": null
	//     },
	//     {
	//         "id": 21,
	//         "name": "zona1",
	//         "img": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAnAFQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCg0me1Nz6DFLnijFFgG7iOgX8RRvc+g+gp22k20WGN3N60ZY96GGBU0hXyowpJP8QxjFAEG4+tOdZUVGcMA/K57igwycnbgAdTxV+e3kvIYWjDARpjLDGaAM/c3rTvNf1H5VPHpl3J/CFH+0aSeza3YLJIhOMnB6UARea/tRTTjseKKLAWRFGT/rgPqKeIrcZ3XCnPsaiwvtSYHtTJLAisz1nXHtkGkFtaMwVbsgn8qg2r6Cgop9BQBcjhtbVvNaYTZ/h4NH26ISF1tmLHuBjiqSqqHIYU/cexosMstqEhYlYFTPUtmopL+Rzgzqo9Ahpgcg9ac7hscCgCKSbjH2iWQH+EHAqIGPJwmPrVgPgY4pjEtQBHkf5FFOxRQA/a3rQFbuaKKYg49aCFPWiikAnFLRRQAAUh60UUwDFHSiikA0kUUUUwP//Z"
	//     },
	//     {
	//         "id": 22,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAuAE8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCgz8dqbuNJkCnxQSzuFRTz3IpANAyM9vWlJZeobH+7VyOxuQpUGPZ38zgVNHpDEZMwQHqI+f1oGZu8hd207fWm+cPetVrB432Qx7oz1Z8H9KeunuDzhlPUFFFAGOJfb9KPN+v5Vfm03ZLmNHKdxio4NMmmZst5YB4yp5+lMCuJuKUTAdRT5NNvI2x5RYE8FSKrY5I7iiwjSisrVObx8N2APy/nVqS4WOIR2XlMen3ulZ0TlOiq3s4zUkzpKNrRRjH90YoGW0knCjiEP3d2H9KUtdMeby3UexH+FUFWMD/VipMQkcRgGgC2EmYEHUVH0waVYplXCaipHuoP9apHbjhVppC4/wBWtIC5+9iHOoIB/ug/zqM3kygoLuJiejEAEVWO3ui/lTWWMj7i/lTFclN5ebSPtSfkKqESsxZgCT1PrTvLjP8ADRsx/G/50wJOPQ0uaTdS5piCjNFFIYUc0hpu0Y70CHc0hpu0D1/Ojn1oAU8UhB6hjSZbPalLSAdR+VAH/9k="
	//     },
	//     {
	//         "id": 23,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAxADQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCtS4ppYDvipAVKZzVkjaSjOaVQMjFACYYclWA9cUVoyyAW+WmRhj7uMGswMucZoAfRSZHrRQA5Jhbv+8RWQ9yM4qdp7ZjlUJ/3RUG0FdpGRSLGE4jYqD1ApDLPnRYwIJP++aEnWJgyW8mfdagDSjpM9PEs46TH8qQCvMjybzbHf64qT7ewGBaLxVaTzZTl5GJpn2dhzvIoGOmd55C5jQZ7Cio9sqHC9KKYiXNLSUUxC04U2loAU0hOaKSgAooooASiiigBaKKKACiiigAooooA/9k="
	//     },
	//     {
	//         "id": 24,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAA/AFQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCoXXsajLc+1NwPSjjtSsApYY7UbwB9859hTDx1pV+c4UFiewGadgHeaPWk80etTR2VxKcLCw93G0VZGmuYmh84Mw+baqcfnQBQ833pTIRjK9RxV02IwE+xyKSPvb93/wBarEtmrxeSISu1OJMcg+nvQBlCbH8NO8/jmpjpV4AMKrZ9GqCa2nt/9bEwHr1H5igBfPX0oqPj0ooAtfYpzyhicf7LVLBpk0jjz1CJ7Nkmq2CB8ox+lWLWV1lXLsB0wXwKYGmlhaR9IFP+8N386mBSMYVCB6KtUpGAIxOw/wC21M+0RqcGWU/9tKQzQMvopNIZSFLFdoHrVRbkYO18k+rA0jy+ZGyyuNh7hulS7gTmeTHVRnvUL3Mq/wDLQf8AfNVcQY2gyEeopzsw+7O4HvQkwElubntK2PoBVGSSWUlZJpGX0J4qeVjN9+V2Huah2kE9T9TVCGfKKKdsP90UUwH+WO/86XaB9KMv6igBj1NAhcKf4qcCoP3v0pm0elKABQBJ5o6Hcf0pDIpGG3H8abTeaAJA/GMkj60hOaZnAozQAEZppU0ZcdgaTdIPSgBcN7UUCSX1H5UUAKMY7mlFADHov60uMHBGDQAUUUUAFFFIaAF4pDik5NLsY+lADeKPwoIxxRn1oAKKNwooA//Z"
	//     },
	//     {
	//         "id": 25,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAhAE0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCC9jMV8+Oh+aprIfvHcnjbUt3DJcpDNEhYkYNOhtXiyHG4tx7UgM5AoQnf3NW7cD+zphnPatBbO3T7sK/jzSlEYbdiqp/KgDCWIkcMpx7inFGRckceta8sFqwIJiTjtgU3y7QxCNpoyB3yM0wMhshsGgLwea1FtLEAgzA/WQVDJYwGRRb3CjPUE5oAz+PX9KTbV2awlhBYyIy/rVfYPWnYRpxXEk1o/l4SSMduhpEvJmg8xkXKnHHeq1jJsuyp6OMU7YyW0y46NwKLAPluXlQmSN0H+w1OiaNoHbYxXoQzVXEhaI71PFSQNmxm4xRYdxQ9r/z7Z+rU/wA61/59V/IVSTaVBxTvlpWC5aaa0H/Ltj6AVBcvbvH8kJUg+mKZ8vqfzpr5K7RyTTsK4smxyChcj3NNpcMqgMMGkqhDov8Aj6j/AN4Vam+/L/vj+VFFIYP/AKlqVP8AjykoooAqfwCm0UUxC0+L/j4T60UUCFn/ANe1MNFFAz//2Q=="
	//     },
	//     {
	//         "id": 26,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAmAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwA1ZB56Sr0ZcUWAzcKfRTUk4aXSo3YYZSPyqPT8mVsf3KYFZv8AWSem6rmmZ+zT9qSLS5juEjKoPORzVyCzFujIJGYPwaQGGOOKeEY9FP5VrjToAuAXB9d1JLp4KARyvu9Wc0wMggjqKAcHpWt/Z4dQJcEjuDTv7Pt4yDt9vmYkUAYuKStabTVZ9yy7B/dAGKoyw+U5UsG9xRYRftpxMrWxBJ25XPpTobiIRnbEU2HDYAqlA/lXccnQZwatOhie6HGHAIoAtJeROOH/AAIp3mq3IYcc1kwmURlWyCOhqzaM7LIx5AXjPrSsBc+0R/3x+VOWRGOA4rJink2c7T+FHmjPTB9jRYdzUllVImYMSRWdPcCSIglvXkUzzP8Aa/OkLsQVyDnpxRYLjjslQFZipxzkVARgkZB9xTmiePhyvPOBTdpA6cVSEOcHYD36ir05D6eJOQdoBNFFAFJZDGOCT7GomklDYSRlB7A8UUUASINowTxQVFFFMQgw0oQdaeT5bFVA3ep7UUUwInb5gX+Zj3zUjdBRRSA//9k="
	//     },
	//     {
	//         "id": 27,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAhAD4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCjigctinlat2lpBKu6Rv8AgOcUWFcpucZPtTEQsuQQK2P7Ns/8tTnsIiuElKj8DRYZifjSjI6MfzrRfSX4Mcike/FQS6fcRJu2hgOu05p2ArFm/vN+dJub+8acFzS7KVgJ4p2jBG1W+oqVLg7gfLT8qr04HFW0SXVvo1Pzxr+FTC/th2I/Csv5fSlLkJtXgUrDuaR1K1/vH8qhk1BUAMMm/wBnH9apbiUwabtTstFguWJLm0kUsyNGx6hRnNR7o25jBA96jxTqLBcBQfu0UUxCUUUUAFLRRQAUUUUAf//Z"
	//     },
	//     {
	//         "id": 28,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCABJAJADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLIA7UoFOK8U9IHkOEDN9FNAEYFOxVptNuV6Ju/wB00qaZdOAcKmezHmgCnyTgdTS7WDlTwRWn/ZohTc0fnP3wcY+lNisgqTPPuIYcoOWH40AUMN/eFIVPephC7HaoyV53j0prgdAPx9aAIfpS/NTthHUEH0pcUrAM5PXmgin7TSbadgIiozRyO5qXZRjHYUWAjDOOjGniR/X9BSkfT8qAKVgF82Qf3fyo81z1x+VJg0BTRYBenPSti0vHnXaSgkHYjrWVgf3h+FSwrg7hkN61YGzmbuE/WjM391PzNUFmn7S59mFTrdEDDbc+zYqQLG+UH/VD8GpHm2Abo2yTgAYNQ/bPXZj/AHqbJd5HCofT5qAJhLECWaN09SYzSNJazLtLRkHsaga+dV/1YJ/3qiknjuF/fQIeMZ7j+tMCafTYpEzD8j9ueKz2s7tCcw5A7qacIYo8mGaRD6BiKVbm6jBCTEjP8XNAEJVlXLAg5xtxzQqO5wEf/vmplvLoZyI2YnO4jmka8vCfvqPoKAI3glTG6M89KaI5M48pwfdamS8uVXaxjcf7Qp322b+6g+maAKpyDgqc/SlHPtVk3cp5wufrTTOT1ijNAEGV9aXI9al84f8APJaDMf8AnjH+VFgIQMdKmDnHU1ByO9PU+pFMRLvYjG9gPzpAuefMYfhSD2Jp2WpALt/6aZ+tIUH+x+dIWJ6gUZH90UAGMdCKB6kmkyP7ooBI6UwFJz0phpSSetFACUUtFACUUUUwCjFFFIAxRiikzTAMetFMyCeNxpwJ/umpAdzSg+tN5paAHZoyKTFGKYC0UlHNABRRg+lGPWgAzRSbV70mYh/ERQAuaOKazoBkMT9BSeYCO/40APpcVGHB70ufUmgBT7U/ypQN7xkJ/eNLbn9+qg5B65qZGke5lDHMSjkZ4pXKUblUlh2H5UnPpTjRQSIKdn60lLQAvFH50lKOlMBKSn9qjPWgBcLRhabRQA47OppMr2U0dqSgBc+i0Zk7IKfHT36CgCD96Oqij5+4WnHqaY3Q0gJB+7xLHLtde1a00P8AoxMaLuOGOB1Nc6/b611fahjP/9k="
	//     },
	//     {
	//         "id": 29,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAbAIoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwClluwph3noAPxo3GgbsUxC7WHp+dH1/nR8/YZo2t6YoGIST0cmjnvS8/3v1ow3dqBBgZ6fjSg0nHcj86MjPAoGO57nFKDimfL3BNKCv91qAHcH2pBljilBz0H50mOckD8KAHYx96gnPTFNz7Gl+iigAB9cUoKr3x9KTPrScN2NAh+6PsSaNy0iqOuKPLX0pgJnAzs/MU3LZ+5jNHcUpReOKQDSWPqKDyOTTnVQOBS7FAyFFAEWFoAGOmadk80m5vWgAwT0TNOCMP4MUhJPejtQMdhvSlCkdajDEjrTkoAfjHpilOD/ABEilwMdKQUCE5HUUZpHJHQ0gYnvQA7n0I+tKMnnOPpQo4owCaADHvS4+n50rKMgYpMCmB//2Q=="
	//     },
	//     {
	//         "id": 30,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAdAC8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCmSaTNSFauQabDLCru0nP900WAzsijIrVOnwKMbue2/jNVZNLnyTGyMOwzSCxUyKQLuNSPbzQsBNGV9+xoXA5xTAkqRJnRNocgfWo6KsknF3KB97P1pDdS54C/lUNLSsFx73M0n3gp9M0nmPgfdGeTgUlJ3osB/9k="
	//     },
	//     {
	//         "id": 31,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAdADEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBif8g2qS/dq8F8uy2OVBzztOanj0u32K7PKSRnjp/KgEZeR6iitj7JbEEK65Ix81VH0mfJMUsbL2yaQFKippbWeH/WR4HqDmo9p7iiwDc0U7aaKLAXFRTZ7sDdnrSLczIoVZCAKfF/x5moByorRElg3spXnYT7imG7kP8AAg+gqGiiwXJftUhA4Gfc5pDcSt1CflUdFFguL5knqv8A3yKKSiiwXP/Z"
	//     },
	//     {
	//         "id": 32,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAqAIMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDO20hFS7QTgnA7n0q//ZkY4a6YfhigDK4o4rag0uNHEgm3+mQCKkuNPWdD8kYf+FhxQBg0nFaR0e5xxNGfzqKTTLuMElVcD+6aAKgFOxTtu0gHuM0uD2FAEZWjFSYpMUCGYoxT8UYP4UAMxRin4pQtADMUYNSBaXaKLARYoqXatFFgEPuBWlby3C2yqyBhjgjrj3FUMHuKmSd04DEcY4pgW0aOQfvLYbv9k4qQGAcKkg+jf/XrOWVx/FzTjNIR940DL5aP+/OP+BUeai/duJB9RmswHHQnPrmjew75+tAFgx2HnNLLMzuTk5GP5Cl3abnHzfUZqkcdTSgp6UCLpXT24WQg/jSLHZKSTKrcYw2ap7R6UbV9KALJ+xp0aPHoFNIwsmIO4g/7IIqvhe1GPcUAT4sx/G35Gkxa9pWH4GocUv4UAShID0lNNxH2c0wClxTAXan94/lRSYooATLd6XPtSCikAtFJRQAUlBpaAGkeufypBjNPFBoAARS8U2nCgBMUUpo7UAJRS0UwEpaKKACiiigD/9k="
	//     },
	//     {
	//         "id": 33,
	//         "name": "zona2",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 34,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 35,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 36,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAeALkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNUn1oOfWri6bJjIdOfel/s2U/8tYvzp2EUsn3oyferw0uY9JIv1o/suYfxxfmaVgKW916Ow+hpyzS/wDPRvzq1/Zkucb4/wA6T+zZ8/w/nRYdyv58vdjSid+5H5VYOmz/AOz+dJ/Zs/8As/nRYLkHm56qp/CmHaf4RVr+zrgdFB/EUf2dc/3F/wC+qLBcq4HpTg3HAq0unTnqqj/gVSf2VJj7wBosK5Sz60x1DAdavnS5+xB/GmHT5weUP4UWHcokAdMj8aMH1rQFgduXRj+FPWz2qcJn2xRYDM2mjkd60zattI2H8KjGnuxORj8aLAVFY7hzxT/NzzVkaZIc7nVRSnTzjCsp9xSsBVDtjPFHmH/Z/Op3g8mIqevuKgW0lddwAxRYBRKfQfnR5p9B+dQyRtG2G603n1osMseWPejyV9/zp9FaEDPLA6GjZT6KAGeWPU0bP9pvzp9FIBm0/wB4/nRtP94/nT6KAuNAP94/nS4P94/nS0UBcb83Z2H40oD/APPR/wA6WimAbpB0lYH609bm5XjzmplFAEwvbgfx5+opRfXP95fyqCikFyx9un7lT+FOW/kH8CVVpaAuWTfv/cFH29sfcWqp60UWC5a+3E/ejU/WmNdswIUBR7VBRQBG6bmySSab5dTUlFgP/9k="
	//     },
	//     {
	//         "id": 37,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAA0AG0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDN3P8A3jRvf+8aKKQBlv7xoyf7xoopgHPrRz60Hig8UAHPqaTHvTo43mYKgyTxU62eCA8gBzjAHU+maAKuKVkIAJHXpVmS0ZU3GNk7etSz28k1tB5aMWjG0gCgDP2+1GKnWyued0Mv4LUqWRzh47n8FAoAqYpMD0q21tGpwWkj9PMxzVdgASAcj1oAbvHrThkjI5rTuov9IWMukaqNzMVHI6UhhsZj/wAfKqwH8OBQBnYPpSojyOqIMsxwBVs2dvglbxCPTIzUlsqWpeYEOwXAG4daAGT2yxCK1LAtndI57U5k05Ji8k5cn+ELxUPkpNMXupHy39zB/CpgbRcqfNkAGCvA/lQBKdSskACREgdOAMUxtXjwBFEM9t1MD2aD5LQk/wC01O86MD5YIU92I4oAG1e4DFRCpYegJpP7R1BvuwqB/u//AF6jjkijQgTDk5+VTn86UT2xYbpbg+2AKAGmbUS24uwPpuGPypDeXoGPPAH0FT77ByCTNmqNyIRN+5aQof73amAebMch5QQfUZqMsAetLke/404dP/rUAWLu9NwieWcbl2yADnj+lVgq/wB0Glzg42FfqKXtRYBuwZyAKdH8rHjrRzThTEG1Q2QMU9TTKUUgH/LSEKT0/SkoosMXC+lBwOgH5U3NGaBBwe1KAPYU2igBWAxkEZ96Zz6igrmjb7n86BmxIiRKdiL0781jjv8AWiimIWlFFFABSiiigBaKKKAEooooASiiigApaKKQz//Z"
	//     },
	//     {
	//         "id": 38,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAmAOEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCl5sq/x0edNnhj+VOBZk4hJX1q1CCwIKAEetKwFb7TN6j8qWO4lZsE/pVn7OyndtyKURq3OwelKwCJKz2TvnvVRbiQ9l/KtBYP3BjGADVaSxmReACP9mnYCEzE9UQ/hVm0bKMcAfSq5tbgJuKDFS2YZVkDAj2piIPOG9gI169cUF/9kUeWQxPrRtNKwBvH90UB17r+tIVxTcUrDH7oj1DD6Gnf6P8A3nqE0UWAn2wnpKy0xo07XJH1FRilwKdgFMWelyp+opCjD+JD9KMD0paAGbW9qsKXVBkrUVOycYpWAk8z2FMllYj5VpMUhFFgGb2P3lxQGAHT8aXFGKYDN3OQaUMpPzDNOxSbeaAJVkCqNp2nPGBUzEdCcnvVcqA4X0HNNLnOaVgLPHrRVbzDRSsBZtZPIypUlT2q8txCAPlAwKoUH0rWwrmkL2LcPvCpDd2/8TfpWUOWpH649KLBc0WlQyIUIMfc1MWTs61nx82LfWqwz6n86LBc19xY7QwPtmmSrlGIXBAzWbuYdCakgXzVfezZA45osBaSOCWEM7AEdeaFgsv+egP41QA703aPSiwjU+x2j9HH4GmnS4z0kI+grNC85yacNw7n86Vhl7+yoh96U/lR/Zlp3dvzqlubs7D8acJZAPvn8aLAXv7MtmHy5/Oo30gH7kv5iqnmSf3z+HFM+Y9Xb86LAWH0udfuFWH5VC1hcj/lmfwNNy/aRx/wKnB5h0nk/wC+qLAN+yzj+BqXyJv+eL/lSl5v+ez/APfVKs069Jm/E5osAzyJ/wDnk/5UnkzH/lk/5VOLq5H/AC1/QUjXNywx52PoBRYCsUdfvIw/Cj8DUwluF/5aBv8AeFSC6mHVIj+FFgKZz6UqY3Vb+1yjrHEfwo+0Ntz5MWfTFFgKo6se5pm2rjTcDMKZpPMh282/zexosBTwfSire+D/AJ4H86KLAFJRRVCHR9T7CmnnJ9aKKAJ4v+PF6riiikAVPa/x/SiigCHufakooqgCiiikAUUUUAFFFFABRRRQAUUUUAFFFFAC0hoooAAKdjkD2oopAI33qKKKAEooooA//9k="
	//     },
	//     {
	//         "id": 39,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 40,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAkAEIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCpmkz7VIQKkt7YTsQZNmKYiDf/ALNJ5g/umtIaXGes5P0qQaZBjCu/1yDSAyd65xg0oIz0rUk00MuFcfUiq39mTB8AjHrTGVNygknj0pm5ferEtrLCMyR5HqKi2gjigBm5fein+WKKLCLCCEj53I/ClMdtw3n8ehFRYowPSnYC9BJbKCEUHNL9ltWzyyk+j1SXA7CjanXH61PKNMvxW8aNkXTkehao3+1pIfKuI2TsDVTauelGAecUWC5aa9uox+9jjcd8NUUkKTDzYXVAeqmoiFI6CmFF9BTSC4uQOMr+dFJiimIdRRRTEFFFFADu1JRRSAKSiimAUUUUAf/Z"
	//     },
	//     {
	//         "id": 41,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 42,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAA6AHEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCntAHSmExjrU4K5BcEr3AODV+3kt4rUypbsAGxyASaYGR5kY6Z/KnB1PRW/Ktf+00H/LvMP+Aig6tAB0cH0K0rjsZywyNg7CoPTIpxTDbVVie5YVoJq1swBYlT/u1LJeWv3ZWC57OMUXCxkyRqrkK+7HcVG+EAJ7+lauNNl6GLn0bFSwW9rEWaPaSwwTuzRcVjFBHuKTK+5rXbTImJO48nNV5dNlU5jYOPQ8UXAo4U/wABNGB2jI/CnklWIYYI6ijdTAj5zjY2aMt/zyP41JvIPfmgscZOQPcUAR5b+5+tFSZNFAANv8Wce1TQ3aQqYyWCk55qCplxs5AP1oYFuK9iAAE6Y9GqT7ZE2ATEfcmqAVP7oo2xnqg/KpsFy1LcacDtdYyfZaiuZLSe4VnYbduOeKjCx/3aWVInbcUzxTsO4jQacTxcEZ9Dn+lJ9jtSPku8fXFIIYh/AKXy4/7ooHcXyNoxHfIPxx/WlVr2P7l1HIPrmmCOL+4tG1B/AtAXHTPDdBcssNxn58jg/jT0is0+9OsjD/awDVd8f3R+VN2oR9wD8KdiblxrmNOI2iTPoM1BLOjY8ydv+Ajiowox0XH0pcewosITzIf+e7f980UuB6CigBMelOXNNBpc0wH5ozTc0UgHZpQ1MzS54oGKTSZpM+1G7npQA7NITSFvY00sKBDqSk3Cjr3ouAuKAuT1pVXcMkgCgogAIYsKB2Cin7Yv7popiIqMj1ooFABmlBpDQKAHCigdKQUgFooooAQkeuKCfekPf60DpQAnPrS5J70GoyTnrQBYjTcrKpBfsD3p5tJWh2hlRu+41RmP7s1qXv8AyDLf/gP8qCk9Ct/Z03/P1H+dFXPJi/55J/3yKKVxH//Z"
	//     },
	//     {
	//         "id": 43,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 44,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAtAJsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLpaeEBGd6j6mgxqAD5iH2zRYBlFO2D1z9KMAUWAbiingE9j+VKUP91vyosIjoxSnAOPmFJx60AJikxTsj1FJkeooATFGKXcM4HNG8HpzQAmKKd82MhDj/AHamS2lmKLCUkZhkgcbfrQMgozzWkujTn78sajvgZqaHSoYJFeScMVOcEACgDIY7W2twaNwHWtqW3scsRNHHzn5SM1VLaZvYGKR8dGGfmoAzww9aWrNx9mKfurRkPZmY/wAqgwPSiwE8vkxyqhQgnkknpTHZUJClCPUU7UNhvXEbHA6g9j6VCB7imA4O3UN+lL5kvXzD+QpvA6kUtADvNmIx5rUqzSqMb8/hTKKAJDdTDHRvqKT7W4+9Eh/CmZ9xRkUCHi7jOd8Cn6Cni8tgB/ovPuBUORTcj0oAurqqKNq2/HoOKRtSiYc22D6hsGqeVPak46YoGW/t0efuS/8AfdCyWzSZ8t0LDkhzzVX8KUMKALq/ZF+9Hn6uan8y2Pyrbr+eKzcjuacrYI4zQBf3pGCUtYwffmqM7ySSN8yp6he9IZD64pmec5oATDcZcnFLS5FHHrQBGzmVy8vzORgnpRkf3atmyiMLSKWUqM4zmquAQDjFAhc9tgoyaMZpdoxQAlLijFLigBp+lJinmkx70AN2ns2KNvvSkUg+br2oGIRg9CaU/h+dLtC/jSHFADePSnAUmR/dpR0oAXpSg0lFAhTzSUUUAFGBSgZpdnvQB//Z"
	//     },
	//     {
	//         "id": 45,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 46,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAA8AH8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNxVi1xGsk5/hXA+tRleKkcYgWP1OTSAn0n50nhbqwzVKPIJUjHNWrMiG8jbs3ymi7g8u6kwep3CgLjrNSqTH2quhxH781ZhyttMfUVAABH+FOwFhiTpakkE7s1TBzzVwkLpmD/epsFhNcYJ+RD/Eep/ClYCqRnp1pPIkIzjithdOgBCgnOOtOMPkMFjiMin72aYGOinGR1FITzyK1Ft1bekcHlnryacNMhJ+d2z3CmgDJP0pvfp+lbSabbKwIMmfc019L3ylxcMuewWgDJLex/KgkLET6mtX+zhGd8l1x/tKBVK7t1Eg2XCMDzwOlFgBULN93ilYM7fKhIHHSrEcgdWd3wBxkL3pqTLGvEr/gKYEBjfcgZCoyMn0q3qCYdHHORjNJ9ot8ZYSsTU0VzHJC5SNv3YztPegCouBasDxk0kEHnuEGAO59qsfaYmjV2h+T0ppe26xiWM+q0AXGhjbZEVBUCpwoUADPHFZ6TMkYf5nIPcYJqUXqsRlWX1BFIC1kA5xzS7hiq/2uLsufrTXuUKnEYNIBzy7LhMAEMMZzUZnn80qsCqAfvGoLibbDvWMKVOeKe96joG2Mc+1AEr3Eij7yj8Kp3F1LjAmIPtT/ALVH3tyw780G7tMYa3IFMCsB5hBdi31NIyjOAAKkBQ7igIHbNMPWqJJZcxxpH36mowDjJp0hLu8rdzgD2prH1FIYvWpbWTZPtP3XG002CIynPRaSRfKbfkBVPU0APmVYkWJs8NQFHl5DfnSX9wNkUgUHdVITtJjrtJ7DigC491DHDtMm589qcsu9NyEsPes+FUe6wwBBq6EVCQowKAH+afQU1pX7YH4UoHpRsA5Y5NMBwIZCsg+Ujk1DGQyYVSqjgZ70+ok3LOVJ+U9KLBcfnFITntTiKb3osK4HgUlBNFAFcTy5G6LP6UpuXBGIsH61rKiTJmRAc0eREg+WNR+FIqxlm4u5SNkZAH90VG8VywG6N8Z71qB2D8GmhjIxDHikBWvo5NkKqoIUDIqZrqR4fLSEKCuMHt9KddnDjHpUeflpiK0Fm8WJZCBzxVnOaef+PRf96oqYDs44FJSUUCFJpknQMOxpTSH7pFMB2cikHekX/VinHhRQA00lLRQB/9k="
	//     },
	//     {
	//         "id": 47,
	//         "name": "zona1",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAoAGEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCgVc8/0FJtk/un8qkDHvmnbx6GmBDvlHRQPwFL5sgIyqkehFS7s9qfEPn6e9AEJvJF4CRj/gNAv5x0Cf8AfNWXSM8eWKa0cY5VRk0gIjqE+BlR+Apf7Tn7Ko/Ck8pT2pPLwwIxQAPqNwzZAUe2KY15cueXIz6Cnnd6CmMMtnAoAjMszH5pHP40oeUgje//AH0al3HHQUgJzTAh2y+rfnRVjPvRQAmcDrSg5FCo5H3MgDPBpzI4XeAFXsCcUCAd+tPjIDdePQ03y34+YE+1CnB++PegCUk5prE5zRjlck/N6UxHDu4OQF70WGLmkJp2Yx/E/wCVIfLI3BXIBxy2KBDCaSlYjose33zmk5AzjigYuKbj2o3ZpCxoEGKKNw9DRQBZSCFDkbi3tTvJtyxLQOx9MmiilcZLGqR/6q2Ck8ZLVVIdH4TLHsBmiii4D1S4JH7h+OnanraTtCSExJI3Qn7oFFFFwGSW0iOVC5I6kngmmP5SRqkkiggksBzzRRQBEXhBCxPI5P4UcgkHOPc0UVQhMijj1oooATd70UUUAf/Z"
	//     },
	//     {
	//         "id": 48,
	//         "name": "zona2",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 49,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCACYADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCojDOSDn6U5jn2qYtmq7dTUAHHTrSyRPGRvXGeRTY1JlVR3Na+oweZagr95OfwpoDGLdqdgbaQdfWjqducUwBdmMs2M0VaG3HQflRRcBvyf36rvsDHBNO7VGQM5xSsBYsI/Mu1POBzW+QCuCODxWPpC5lY1s00BzdwjQyvEeMHr7UxItzAkmtDWIf3iSgdeDWegYA8+1NgSAKPvb/wopjs2cA8CipYBSVY4pOPSrsIvaQmImb1NaVVNOGLYVZUsc7lA/GkMranEZbN8DJHIrFByg9MV0jDcpB7iufdDG7RnqD0poCsTmirCoCORRRYQ8DmrP8AZ0zDckyHPTIqtTldx0cj8aoRZ+zXsYURlQe+1qRm1CEZYMw/2cGlj8woXMrD3FPVpG5W6zUlEYn1A9Imx7rVaUyeYXlRlY9crirrvOBkTfoKrm8maN43CtnjNNCIaKQZAxzRTEOooooAmhkdRgDINTZzj90M1HC2ExUwcbcYzSArylTkbMGq4wKsTfTFQ00AgINFLRQAUUUYoAmj3AgAgZqbMu35ivHcCooAM+tSOo7Hj60mIimJzgmoMVK/HvURYCmMWilCORkCigBKQUtKOtAFmJQByoNLIqDnZ+tRoFA5Un8abISxzigQxj7Uw/SnE0gNAxC7A48wrRSNHubOaKLDuOpR16UhpQeKBEyMCB8pz7UjkZ5BH1pABjHP4U0jA6n8aAGEhjxRilwD9aTGT1oAOaKUE0UAJS4FIKcBk5FADtpBpCGPYYpQj4/hx9aQxtjgfrQAjehGKQkdBQeODSbR6UCDNFGKKAAdKdjPANFFAxxiZUDEZ3cCmH5f4qKKAE3inchNxBxRRQAnGASQM0UUUAf/2Q=="
	//     },
	//     {
	//         "id": 50,
	//         "name": "zona2",
	//         "img": ":/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCACHACIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCngHrQOTikLDbxRGrs4IOBUgWbi1Tylcg4JqEQoenAx0rUvI82YFZwBoAZ5C+tFSUUrgVeQOKntgXljU9zUNWrAbr1B6CqA1rpcwECsTzcMRjpW9KcKawLpds7Ed6aQD/N/wBmiq2D60UcoFhUy3NWdPTF5n2qNehNS2TBZy56AVVhGhMwY7QefSsm9j+ccdauyXFtvL7jn0xVWe4WYAeWQB60ICr5dFSZH92igB7A8elTKtosR3zMMjnHBFQnrTkjL9KbEhG/s/gBpifYVGzJn92r4/2qneNR0HNRYxSGNz7GinUUwCpYcA5INRmpo3CrgigQM2T0NQmpnKnpURFADaKXFFAXG1ZhPykKAfXNVqlgbbkcc0CHPk8bR+FM2sOqNT3ZsgLtHuTUbPMCQZVxQMTcf7j/AJUUmZv+ewopAFOTGeSBTcZqVAu3lcmmIinjyRioTETwRVo8nNIx3GgZW8v2oqxg+lFACCpPLIOQwIpvFHHagQp9KTJHSk60GgY3J9aKXFFAC8Cl60UUAHSmmiigQnNFFFAz/9k="
	//     },
	//     {
	//         "id": 51,
	//         "name": "zona1",
	//         "img": ":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"
	//     },
	//     {
	//         "id": 52,
	//         "name": "zona1",
	//         "img": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCACSAC0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOSUheeR6U2SQueaCOu0Egd/SozQA4GlUbieRV3RUD3ZJHAWoJ0+x3rqRkA8fSgAkZ9oAOccE0xjuxk8ijcoQ8cE1ESSakCQtHk4L46de1N/d/7VDAFieBmjA9RVAa+iIAkrjpnFR67D/q5h/umr2lpssU9+affQiazkXuBkfUUwMBHATkZC81BuYElc4NKGOKd8uKQB5M3ZTSeVL3Q07ODnJPtmnxnzZ0UDG5gMUAdHbrtt4x6KKkoAwAPSloGcvc2zpdyxoOjcfSmi2nP8BrQ1aMpdLIG2h1wT9Ko7mPW4zQITZ6kD61cg0+5guFk2hlwSCpzVU/7tXbe5kTYiEgY6E8UwJZb2a3t0d/9a44Ujv71ANanH3o0/UVfSW4YZ2IR602QtIw82CN1/WkMzry+a7gCNCq8ghgc1TA9qtXELJId3yg8gVCUz/FQIl4NKgw4oG09RSgelMRpxNIF9RSSPtbDg4PcVXjZ8DCZ9qV5JSu11ZR/s96LAQzldxU7i3b2FQjAp7jnAB/4EeaZtb1FAwxRz2pnzehxT4m2yAkGmIsxSSDHHanNLJjg4FSq8TjqQ3oarzMAfQUARMWJyzEn3ppB9aUuPWms4GKADIB4NLuOc5pCM/eJ/CkBQHG859xQBYjLkAruanSF+jJimxdP9UJOevSnsxJ/wBSR7UgK5Kg/eGPTFTxJEYwxXcTVaVQP4SCaniurdIUSUyIw/u85oGiuyOV4K4+tIFk4ztxnoDzTyyHvj6rSZHYD8qYiePyiPmchuwpzmJej7j6AVEmMZxk0pwx7k0gIs5bLZP0NRT+WGHBP1qwVwP8ageJnOQePpTAkwBS0uKOe4oAegHrilIx1NIPu+1Jye9ACMD2xn3p0UG6MM86oT2C0w4A5P4ZqxHGwhUjHOT1pAQKSR1ppPNFFMB606QYPFFFADB1pJOGH0oopDP/2Q=="
	//     },
	//     {
	//         "id": 53,
	//         "name": "zona",
	//         "img": "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"
	//     }
	// ];
	// getPoints("http://192.168.250.183:8080/api/boats");

	// setNotifications(notifications.map(note => {
	//     const img = note.img?.length
	//         ? note.img.replace(":", "")
	//         : note.img;
	//
	//     return ({
	//         id: note.id,
	//         typeError: 'Regular',
	//         typeVessel: "Unknown",
	//         location: 'Russia',
	//         city: 'Saint Petersburg',
	//         camera: note.name,
	//         date: 'Unknown',
	//         time: 'Unknown',
	//         timezone: 'Unknown',
	//         imageLink: img,
	//         newEvent: true,
	//         description: 'NO DESCRIPTION',
	//     })
	// }))

	// const newNotifications = notifications.map(note => {
	//     const img = note.img?.length
	//         ? note.img.replace(":", "")
	//         : note.img;
	//
	//     return ({
	//         id: note.id,
	//         typeError: 'Regular',
	//         typeVessel: "Unknown",
	//         location: 'Russia',
	//         city: 'Saint Petersburg',
	//         camera: note.name,
	//         date: 'Unknown',
	//         time: 'Unknown',
	//         timezone: 'Unknown',
	//         imageLink: img,
	//         newEvent: true,
	//         description: 'NO DESCRIPTION',
	//     })
	// })

	// console.log(window.localStorage);

	return (
		<div className='events'>
			<div>
				<Header/>

				<div className='events__container'>
					<div className='events__content'>
						<div className='events__camera'>
							<div className={`events__camera__item container`}>
								<div className={`events__camera__item title`}>{eventsTitle}</div>
								<div className={`events__camera__item events__and__image`}>
									<div className={`events__camera__item ${visible}`}>
										<TestList/>
									</div>
									<div className={`events__camera__item ${visible}`}>
										<TestImage/>
									</div>
								</div>
							</div>

							<div className={`events__live ${imageVisible ? 'hide' : 'show'}`}>
								<div className='events__live__camera'>
									<div className={`events__live__camera__title`}>
										Selected Camera
									</div>

									<div>
										<Canvas/>
									</div>

									<div className={classes.mainCameraControl}>
										<div
											className={`${classes.mainControlItems} ${!canvasState.isCreatePolygon ? "show" : "hide"}`}>
											<Button
												variant="contained"
												color="primary"
												onClick={canvasState.reVisibleCameraCanvas}
											>
												{btnControlName}
											</Button>
										</div>
										<div
											className={`${classes.mainControlItems} ${canvasState.isVisibleCameraCanvas ? "show" : "hide"}`}>
											<Button
												className={`${classes.controlBtn} ${canvasState.isCreatePolygon ? "createDetectedZone" : ""}`}
												variant="contained"
												color="secondary"
												onClick={createChangePolygon}
											>
												{btnControlZonesName}
											</Button>
										</div>

										<div
											className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>
											<ZoneActions/>
										</div>

										{action}

										<div
											className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>
											<Button
												className={`${classes.controlBtn} save`}
												variant="contained"
												onClick={saveNewPolygonsData}
											>
												Save
											</Button>
										</div>
										<div
											className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>
											<Button
												className={`${classes.controlBtn} cancel`}
												variant="contained"
												onClick={deleteNewPolygonsData}
											>
												Cancel
											</Button>
										</div>
									</div>
								</div>

								<div className='events__live__another__cameras'>
									<div className={`events__live__camera__title`}>
										Other Cameras
									</div>
									{otherCameras}
								</div>
							</div>

							<div className={`events__image ${imageVisible ? 'show' : 'hide'}`}>
								<div className='events__image__boat'>
									<div className={`events__image__boat title`}>
										{`${selectedEvent?.time} ${selectedEvent?.typeVessel}`}
									</div>
									<div className={`events__image__boat img`}>
										<div className={`events__image__boat close`}>
											<IconButton
												style={{color: 'black'}} aria-label="add an alarm"
												onClick={closeImage}
											>
												<CloseIcon/>
											</IconButton>
										</div>

										<IconButton
											style={{color: '#333'}} aria-label="add an alarm"
											onClick={() => changeSelectedImg(-1)}
										>
											<ArrowForwardIosIcon
												className={`events__image__boat left__arrow`}
												fontSize="large"
											/>
										</IconButton>

										<img
											style={{width, height, marginBottom: 5}}
											src={"data:image/png;base64," + selectedEvent?.imageLink} alt={""}
											// src={selectedEvent?.imageLink} alt={""}
										/>

										<IconButton
											style={{color: '#333'}} aria-label="add an alarm"
											onClick={() => changeSelectedImg(+1)}
										>

											<ArrowForwardIosIcon fontSize="large"/>
										</IconButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`events__container`}>
				<div className='events__footer'>
					<BoatEvents/>
				</div>
			</div>
		</div>
	)
});