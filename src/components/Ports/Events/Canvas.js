import React, {useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite'
import {useParams} from 'react-router-dom'
import Polygons from "./ChangeFigure/Polygons";
import canvasState from "../../../store/canvasState";
import ports from "../../../store/ports";
import {makeStyles} from "@material-ui/core/styles";
import {CameraControlPanel} from "./CameraControlPanel/CameraControlPanel";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
import eventsState from "../../../store/eventsState";
import {ContextMenuTrigger} from "react-contextmenu";
import {CANVAS_CONTEXT_MENU, CanvasContextMenu} from "./ChangeFigure/CanvasContextMenu";

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
				display: "flex",
			},
			"&.hide": {
				display: "none",
			}
		},
		canvas: {
			background: "none",

			position: "absolute",
			top: "50%",
			left: "50%",
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
			width: "100%",
			height: "100%",

			// maxHeight: window.innerHeight*0.45,

			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			overflow: "hidden",

			backgroundColor: "black",
		},
	})
});

export const Canvas = observer(() => {
	const canvasRef = useRef();
	const iframeRef = useRef();
	const params = useParams();
	const classes = useStyles();

	const windowSize = useWindowDimensions();

	// const [width, setWidth] = useState("100%");
	// const [height, setHeight] = useState("100%");
	const [width, setWidth] = useState(1);
	const [height, setHeight] = useState(1);
	const [ratio, setRatio] = useState({width: 1, height: 1});

	const {isVisibleCameraCanvas} = eventsState;

	const displayResolution = (result) => {
		switch (Number(result.toFixed(3))) {
			case 1.25: {
				setRatio({width: 5, height: 4});
				break;
			}
			case 1.333: {
				setRatio({width: 4, height: 3});
				break;
			}
			case 1.5: {
				setRatio({width: 3, height: 2});
				break;
			}
			case 1.6: {
				setRatio({width: 16, height: 10});
				break;
			}
			case 1.667: {
				setRatio({width: 5, height: 3});
				break;
			}
			case 1.778: {
				setRatio({width: 16, height: 9});
				break;
			}
			default:
				setRatio({width: 1, height: 1});
		}
	}

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		displayResolution(canvasState.size.width / canvasState.size.height);
	}, []);
	useEffect(() => {
		canvasState.setSocket("");
		canvasState.setSessionId(params.id);

		new Polygons(canvasRef.current, "", params.id);
	}, [width, ports.selectedObjects.camera]);
	useEffect(() => {
		if (ratio.width === 1 || ratio.height === 1 || ports.selectedObjects.shipImage.isVisible) return;

		const isSide = (iframeRef.current?.scrollWidth / ratio.width * ratio.height) < windowSize.height * eventsState.maxHeight;
		const coefficient = isSide
			? iframeRef.current?.scrollWidth / ratio.width
			: windowSize.height * eventsState.maxHeight / ratio.height;

		reSizeCanvas(coefficient);
	}, [ratio, windowSize.width, windowSize.height, ports.selectedObjects.camera, ports.selectedObjects.shipImage.isVisible]);

	const reSizeCanvas = (coefficient) => {
		const width = coefficient * ratio.width;
		const height = coefficient * ratio.height;

		setWidth(width);
		setHeight(height);

		canvasState.setPointCoefficient(canvasState.size.width / width);
		canvasState.setCanvasReSize(width, height);
	};

	return (
		<div className={classes.main}>
			<div className={classes.canvasDraw}>
				{/* Для потока c сайта RTCP */}
				<div className={classes.forPreview} ref={iframeRef}>
					<iframe
						src={ports.selectedObjects.camera.link}
						width={width} height={height}
						title="YouTube video player"
						ref={iframeRef}
						frameBorder="0"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>

				{/* Для JPG потока */}
				{/*<div className={classes.forPreview} ref={iframeRef}>*/}
				{/*	<img style={{width: width, height: height}} src={ports.selectedObjects.camera.link}*/}
				{/*	     alt={"jpg stream"}/>*/}
				{/*</div>*/}
				<ContextMenuTrigger id={CANVAS_CONTEXT_MENU} disable={canvasState.isPolygonSelected}>
					<canvas
						className={`${classes.canvas} ${isVisibleCameraCanvas ? "show" : "hide"}`}
						ref={canvasRef} width={width} height={height}
					/>
				</ContextMenuTrigger>
				<CanvasContextMenu/>

				<span
					className={`${classes.cameraControlPanel} ${isVisibleCameraCanvas ? "hide" : "show"}`}><CameraControlPanel/></span>
			</div>
		</div>
	)
})