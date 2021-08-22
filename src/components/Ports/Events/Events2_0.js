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

const useStyles = makeStyles((theme) => {


	return({
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
			const url = "http://192.168.250.183:5001/api/zones";
			fetch(url)
				.then(response => response.json())
				.then(data => console.log(data));

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
		console.log(sendData);
		// console.log(JSON.stringify(sendData));

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

			// const myHeaders = new Headers();
			// myHeaders.append("Content-Type", "application/json");
			//
			// const raw = JSON.stringify(test);
			//
			// const requestOptions = {
			// 	method: 'POST',
			// 	headers: myHeaders,
			// 	body: raw,
			// 	redirect: 'follow'
			// };
			//
			// fetch(url, requestOptions)
			// 	.then(response => response.text())
			// 	.then(result => console.log(result))
			// 	.catch(error => console.log('error', error));

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

	// console.log(window.localStorage);

	// if (camera.id)

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
											src={selectedEvent?.imageLink} alt={""}
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