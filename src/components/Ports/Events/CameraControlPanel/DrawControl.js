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
import eventsState from "../../../../store/eventsState";
import connects from "../../../../store/connects";

const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",

		justifyContent: "center",
		alignItems: "center",


		margin: 0,
		padding: 0,

		// textAlign: "center",
	},
	item: {
		"&.show": {
			display: "flex",
		},

		"&.hide": {
			display: "none",
		},
	},

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

	const {port, camera} = ports.selectedObjects;
	const {isShowControlCameraMove, isVisibleCameraCanvas, isCreatePolygon, zoneAction} = eventsState;

	const [action, setAction] = useState(<div/>);

	useEffect(() => {
		new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
	}, [camera, isCreatePolygon, isVisibleCameraCanvas]);
	useEffect(() => {
		switch (eventsState.zoneAction) {
			case SET_NAME: {
				console.log("SET_NAME");
				setAction(
					<div className={`${classes.mainControlItems} ${isCreatePolygon ? "show" : "hide"}`}>

					</div>
				);
				break;
			}
			case SET_TYPE: {
				console.log("SET_TYPE");
				setAction(
					<div className={`${classes.mainControlItems} ${isCreatePolygon ? "show" : "hide"}`}>
						<SetTypeAction/>
					</div>
				);
				break;
			}
			case SET_COLOR: {
				console.log("SET_COLOR");
				setAction(
					<div className={`${classes.mainControlItems} ${isCreatePolygon ? "show" : "hide"}`}>

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
	}, [zoneAction, isCreatePolygon]);

	const createChangePolygon = () => {
		eventsState.setCreatePolygon(true);
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
	const controlMovePanelCamera = () => {
		eventsState.reShowControlCameraMove();
	}
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

	const saveNewPolygonsData = () => {
		// fetchPostPolygon(canvasState.tempPolygons[camera.id], "http://192.168.250.183:5001/api/zones");
		postPoints();
		eventsState.setCreatePolygon(false);
		eventsState.setZoneAction("");
	}
	const deleteNewPolygonsData = () => {
		canvasState.saveDataTest[camera.id] = canvasState.tempPolygons;
		eventsState.setCreatePolygon(false);
		eventsState.setZoneAction("");
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
		const polygons = canvasState.saveDataTest[ports.selectedObjects.camera.id].map((polygon, index) => {
				return ({
					// name: ports.selectedObjects.camera.description,
					id: polygon.id,
					// color: polygon.getAttributeFillColor(),

					points: polygon.getPoints().map((point) => ({
						...point,
						x: +(point.x * canvasState.pointCoefficient).toFixed(),
						y: +(point.y * canvasState.pointCoefficient).toFixed(),
					}))
				})
			}
		);

		if (polygons.length === 0) {
			polygons.push({
					id: 0,
					points: [
						{id: 0, x: 0, y: 0},
						{id: 1, x: 1, y: 0},
						{id: 2, x: 1, y: 1},
						{id: 3, x: 0, y: 1}
					]
				}
			)
		}

		const sendData = {
			// camera_id: camera.id,
			camera_id: 1,
			polygons,
		}

		// console.log(sendData)

		try {
			// const url = "http://192.168.250.183:5001/api/zones";
			// const url = "http://localhost:5001/api/zones";

			await fetch(connects.urlZones, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {"Content-Type": "application/json"},
				redirect: "follow", // manual, *follow, error
				referrerPolicy: "no-referrer", // no-referrer, *client
				body: JSON.stringify(sendData), // body data type must match "Content-Type" header
			})
		} catch (e) {
			console.log(e)
		}
	}

	const btnControlName = isVisibleCameraCanvas ? "Control Camera" : "Show Detected Areas";
	const btnControlZonesName = isCreatePolygon ? "Draw detected areas " : "Create control zones";
	const controlButtons = isShowControlCameraMove ? "Hide control camera move" : "Show control camera move";

	return (
		<Grid container className={classes.container} spacing={1}>
			<Grid item className={`${classes.item} ${!isCreatePolygon && !isShowControlCameraMove ? "show" : "hide"}`}>
				<Button
					variant="contained"
					color="primary"
					onClick={eventsState.reVisibleCameraCanvas}
				>
					{btnControlName}
				</Button>
			</Grid>
			<Grid item className={`${classes.mainControlItems} ${isVisibleCameraCanvas ? "hide" : "show"}`}>
				<Button
					variant="contained"
					color="primary"
					onClick={controlMovePanelCamera}
				>
					{controlButtons}
				</Button>
			</Grid>
			<Grid item className={`${classes.mainControlItems} ${isVisibleCameraCanvas ? "show" : "hide"}`}>
				<Button
					variant="contained"
					color="secondary"
					onClick={createChangePolygon}
				>
					{btnControlZonesName}
				</Button>
			</Grid>
			<Grid item className={`${classes.mainControlItems} ${isCreatePolygon ? "show" : "hide"}`}>
				<div className={`${classes.mainControlItems} ${isCreatePolygon ? "show" : "hide"}`}>
					<ZoneActions/>
				</div>
			</Grid>
			<Grid item style={{flexGrow: 1}}>
				{action}
			</Grid>
			<Grid item className={`${classes.mainControlItems} ${isCreatePolygon ? "show" : "hide"}`}>
				{confirmButtons()}
			</Grid>
		</Grid>
	)
})