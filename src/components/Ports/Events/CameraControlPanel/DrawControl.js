import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import canvasState from "../../../../store/canvasState";
import {DELETE, SET_COLOR, SET_NAME, SET_TYPE, ZoneActions} from "../ZoneActions/ZoneActions";
import {SetTypeAction} from "../ZoneActions/SetTypeAction";
import {ConfirmDeletePolygon} from "../ZoneActions/ConfirmDeletePolygon";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Polygon from "../chageFigure/Polygon";
import Polygons from "../chageFigure/Polygons";
import ports from "../../../../store/ports";
import header from "../../../../store/header";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",

		justifyContent: "center",
		alignItems: "center",


		margin: 0,
		padding: 0,

		// textAlign: "center",
	},
	item: {},

	mainControlItems: {
		"&.show": {
			display: "flex",
		},

		"&.hide": {
			display: "none",
		},
	},
	confirmContainer: {
		margin: 0,
		padding: 0,
	},
	confirmItem: {
		"&.save": {
			textAlign: "right",
		},

		"&.cancel": {
			textAlign: "left",
		},
	},
	confirmButton: {
		width: 100,

		"&.save": {},

		"&.cancel": {},
	},
}));
export const DrawControl = observer(() => {
	const classes = useStyles();

	const {
		selectedObjects: {
			port, camera,
		},
	} = ports;

	const [action, setAction] = useState(<div/>);

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

	const createChangePolygon = () => {
		canvasState.setCreatePolygon(true);
		canvasState.tempPolygons = canvasState.saveDataTest[camera.id];

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
		// fetchPostPolygon(canvasState.tempPolygons[camera.id], "http://192.168.250.183:5001/api/zones");
		postPoints();
		// console.log(canvasState.saveDataTest)
		canvasState.setCreatePolygon(false);
		canvasState.setZoneAction("");
	}
	const deleteNewPolygonsData = () => {
		canvasState.saveDataTest[camera.id] = canvasState.tempPolygons;
		canvasState.setCreatePolygon(false);
		canvasState.setZoneAction("");
	}


	const getPoints = (url) => {
		try {
			const test = fetch(url)
				.then(response => response.json())
				.then(data => console.log(data));

			console.log(test)

		} catch (e) {
			console.log(e)
		}
	};
	const postPoints = async () => {
		const polygons = canvasState.saveDataTest[ports.selectedObjects.camera.id].map((polygon, index) => ({
				// name: ports.selectedObjects.camera.description,
				id: polygon.id,
				// color: polygon.getAttributeFillColor(),

				points: polygon.getPoints().map((point) => ({
					...point, x: point.x * canvasState.pointCoefficient, y: point.y * canvasState.pointCoefficient
				}))
			})
		);

		const sendData = {
			port_id: port.id,
			camera_id: camera.id,
			polygons,
		}

		console.log(sendData)



		// try {
		// 	const url = "http://192.168.250.183:5001/api/zones";
		//
		// 	await fetch(url, {
		// 		method: "POST", // *GET, POST, PUT, DELETE, etc.
		// 		mode: "cors", // no-cors, *cors, same-origin
		// 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		// 		credentials: "same-origin", // include, *same-origin, omit
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 			// 'Content-Type': 'application/x-www-form-urlencoded',
		// 		},
		// 		redirect: "follow", // manual, *follow, error
		// 		referrerPolicy: "no-referrer", // no-referrer, *client
		// 		body: JSON.stringify(sendData), // body data type must match "Content-Type" header
		// 	})
		// } catch (e) {
		// 	console.log(e)
		// }
	}


	if (!Number.isInteger(camera.id)) {
		ports.setSelectedCamera(ports.data[0].cameras[0].id);
	}

	const btnControlName = canvasState.isVisibleCameraCanvas ? "Control Camera" : "Show Detected Areas";
	const btnControlZonesName = canvasState.isCreatePolygon ? "Draw detected areas " : "Create control zones";

	const confirmButtons = () => {
		return (
			<Grid container spacing={1}>
				<Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={`${classes.confirmItem} save`}>
					<Button className={`${classes.confirmButton} save`} variant="contained" color={"primary"}
							onClick={saveNewPolygonsData}>
						Save
					</Button>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={`${classes.confirmItem} cancel`}>
					<Button className={`${classes.confirmButton} cancel`} variant="contained" color={"secondary"}
							onClick={deleteNewPolygonsData}>
						Cancel
					</Button>
				</Grid>
			</Grid>
		)
	}

	return (
		<Grid container className={classes.container} spacing={1}>
			<Grid item>
				<Button
					className={`${classes.mainControlItems} ${!canvasState.isCreatePolygon ? "show" : "hide"}`}
					variant="contained"
					color="primary"
					onClick={canvasState.reVisibleCameraCanvas}
				>
					{btnControlName}
				</Button>
			</Grid>
			<Grid item>
				<Button
					className={`${classes.mainControlItems} ${canvasState.isVisibleCameraCanvas ? "show" : "hide"}`}
					variant="contained"
					color="secondary"
					onClick={createChangePolygon}
				>
					{btnControlZonesName}
				</Button>
			</Grid>
			<Grid item>
				<div className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>
					<ZoneActions/>
				</div>
			</Grid>
			<Grid item style={{flexGrow: 1}}>
				{action}
			</Grid>
			<Grid item>
				<div className={`${classes.mainControlItems} ${canvasState.isCreatePolygon ? "show" : "hide"}`}>
					{confirmButtons()}
				</div>
			</Grid>
		</Grid>
	)
})