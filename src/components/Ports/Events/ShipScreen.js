import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

import boatImg from "./images/b1-01.jpg";
import CloseIcon from "@material-ui/icons/Close";
import ports from "../../../store/ports";
import header from "../../../store/header";
import * as events from "events";
import eventsState from "../../../store/eventsState";

const useStyles = makeStyles((theme) => ({
	shipScreen: {
		width: "100%",
		height: "100%",

		display: "flex",

		fontFamily: `"Quicksand", sans-serif`,
		position: "relative",
	},
	shipImage: {
		width: "100%",
		height: "100%",
		maxWidth: 800,
		maxHeight: 450,
	},
	btn: {
		position: "absolute",
		color: '#333',
		background: "rgba(255, 255, 255, 0.2)",
		transition: "background 0.5s",
		margin: 15,

		"&.previous": {
			top: "50%",
			left: 0,
			transform: `translate(0, -50%) rotate(180deg)`,
			zIndex: 10,
		},

		"&.next": {
			top: "50%",
			right: 0,
			transform: `translate(0, -50%)`,
			zIndex: 10,
		},

		"&.close": {
			top: 0,
			right: 0,
			zIndex: 10,
		},

		"&:hover": {
			background: "rgba(255, 255, 255, 0.5)",
		},
	},
}));

export const ShipScreen = observer(() => {
	const classes = useStyles();

	const {
		selectedObjects: {
			port, camera, event,
			shipImage: {isVisible: imageVisible, id: imageId},
		},
	} = ports;
	const {camerasNewNote} = header;

	const [currentBoat, setCurrentBoat] = useState('');
	const [selectedEvent, setSelectedEvent] = useState(camera);


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


	const arrow = (direction) => {
		return (
			<IconButton
				className={`${classes.btn} ${direction}`}
				aria-label="add an alarm"
				onClick={() => changeSelectedImg(-1)}
			>
				<ArrowForwardIosIcon fontSize="large"/>
			</IconButton>
		)
	}
	const close = () => {
		return (
			<IconButton
				className={`${classes.btn} close`}
				aria-label="add an alarm"
				onClick={closeImage}
			>
				<CloseIcon fontSize="large"/>
			</IconButton>
		)
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
	const closeImage = () => {
		ports.setVisibleSelectedImage(false);
		ports.setImageId(-1);
	}
	const findImageId = () => {
		const index = camera.events.findIndex(event => event.id === imageId);
		return camera.events[index > -1 ? index : 0];
	}

	return (
		<div className={classes.shipScreen}>
			{arrow("previous")}
			{/*<img className={classes.shipImage} src={`data:image/png;base64, ${event.imageLink || ""}`} alt="#"/>*/}
			<img className={classes.shipImage} src={"data:image/png;base64," + selectedEvent?.imageLink} alt="#"/>
			{arrow("next")}
			{close()}
		</div>
	);
});