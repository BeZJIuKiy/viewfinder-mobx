import React, {useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite'
// import './canvas.scss'
import {useParams} from 'react-router-dom'
import Polygons from "./chageFigure/Polygons";
import canvasState from "../../../store/canvasState";
import ports from "../../../store/ports";
import {makeStyles} from "@material-ui/core/styles";
import backgroundImage320px from "../../Auth/images/background320px.jpg";
import {CameraControlPanel} from "./CameraControlPanel/CameraControlPanel";

const useStyles = makeStyles((theme) => {
	const {camera} = ports.selectedObjects

	return ({
		main: {
			width: "100%",
			height: "100%",
		},
		canvasDraw: {
			width: "100%",
			height: "100%",

			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			position: "relative",
		},
		cameraControlPanel: {
			position: "absolute",
			left: "50%",
			bottom: 10,
			zIndex: 1,

			transform: "translate(-50%, 0)",

			"&.show": {
				zIndex: 2,
			},
			"&.hide": {
				zIndex: -2,
			}
		},
		canvas: {
			background: "none",

			position: "absolute",
			top: "50%",
			left: "50%",
			// bottom: 0,
			// right: 0,
			display: "block",
			transform: "translate(-50%, -50%)",

			"&.show": {
				zIndex: 2,
			},
			"&.hide": {
				zIndex: -2,
			}
		},
		forPreview: {
			width: 800,
			height: 450,

			// backgroundImage: `url(${camera.link})`,
			backgroundImage: `url(${camera.previewLink})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
		},
	})
});

export const Canvas = observer(() => {
	const canvasRef = useRef();
	const iframeRef = useRef();
	const params = useParams();
	const classes = useStyles();

	const [width, setWidth] = useState(canvasState.size.width);
	const [height, setHeight] = useState(canvasState.size.height);

	const displayResolution = (result) => {
		switch (Number(result.toFixed(3))) {
			case 1.25: {
				setWidth(800);
				setHeight(640);
				canvasState.pointCoefficient = canvasState.size.width / 800;
				console.log('1.25');
				break;
			}
			case 1.333: {
				setWidth(800);
				setHeight(600);
				canvasState.pointCoefficient = canvasState.size.width / 800;
				console.log('1.333');
				break;
			}
			case 1.5: {
				setWidth(720);
				setHeight(480);
				canvasState.pointCoefficient = canvasState.size.width / 720;
				console.log('1.5');
				break;
			}
			case 1.6: {
				setWidth(800);
				setHeight(500);
				canvasState.pointCoefficient = canvasState.size.width / 800;
				console.log('1.6');
				break;
			}
			case 1.667: {
				setWidth(800);
				setHeight(480);
				canvasState.pointCoefficient = canvasState.size.width / 800;
				console.log('1.667');
				break;
			}
			case 1.778: {
				// 2160p: 3840 x 2160
				// 1440p: 2560 x 1440
				// 1080p: 1920 x 1080
				// 720p: 1280 x 720
				// 480p: 854 x 480
				// 360p: 640 x 360
				// 240p: 426 x 240

				// setWidth(800);
				// setHeight(450);

				setWidth(720);
				setHeight(405);

				canvasState.pointCoefficient = canvasState.size.width / 800;
				console.log('1.778');
				break;
			}
		}
	}

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		displayResolution(width / height);
	}, []);
	useEffect(() => {
		const socket = new WebSocket('ws://localhost:5000/');

		canvasState.setSocket(socket);
		canvasState.setSessionId(params.id);

		new Polygons(canvasRef.current, socket, params.id);
	}, [width, ports.selectedObjects.camera]);

	return (
		<div className={classes.main}>
			<div className={classes.canvasDraw}>
				{/*<iframe*/}
				{/*	src={ports.selectedObjects.camera.link}*/}
				{/*	width={width} height={height} title="YouTube video player"*/}
				{/*	ref={iframeRef}*/}
				{/*	frameBorder="0"*/}
				{/*	allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
				{/*	allowFullScreen*/}
				{/*/>*/}
				<div className={classes.forPreview}/>

				<canvas
					className={`${classes.canvas} ${canvasState.isVisibleCameraCanvas ? "show" : "hide"}`}
					// className={`${classes.canvas} hide`}
					// className={`${classes.canvas} show`}
					// ref={canvasRef} width={"100%"} height={"100%"}
					ref={canvasRef} width={width} height={height}
				/>

				<span className={`${classes.cameraControlPanel} ${canvasState.isVisibleCameraCanvas ? "hide" : "show"}`}><CameraControlPanel/></span>
			</div>
		</div>
	)
})