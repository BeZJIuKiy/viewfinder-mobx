import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ports from "../../../store/ports";
import React, {useEffect, useRef, useState} from "react";
import eventsState from "../../../store/eventsState";
import {ImageTitle} from "./ImageTitle";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
import { useHexToRgba } from "../../../useHooks/useHexToRgba";

const useStyles = makeStyles((theme) => ({
	otherCameras: {
		height: "100%",
		maxHeight: useWindowDimensions().height * eventsState.maxHeight,
		// maxHeight: window.innerHeight * eventsState.maxHeight,
		overflowY: "auto",
	},
	otherCamerasAll: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flexGrow: 1,

		cursor: "pointer",
		marginBottom: 10,

		color: "#333",

		position: "relative",

		"&:last-child": {
			marginBottom: 0,
		},
	},
	pressLayout: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		zIndex: 1,
	},
}))
export const OtherCameras = observer(() => {
	const classes = useStyles();
	const otherCamerasRef = useRef();

	const {port, camera} = ports.selectedObjects;
	const {height} = useWindowDimensions();

	const [cameras, setCameras] = useState([])
	const [resize, setResize] = useState("");

	useEffect(() => {
		if (Number.isInteger(camera.id) === false) return;

		const otherCameras = port.cameras.filter(({id}) => id !== camera.id);
		const isManyCameras = !!otherCameras.length;
		const NoCameras = () => {
			const title = "No Cameras";

			return (
				<div style={{
					width: "100%",
					height: "100%",

					display: "flex",
					justifyContent: "center",
					alignItems: "center",

					color: "#777",
					background: "rgba(200, 200, 200, 0.3)",
					borderRadius: 4,
				}}>
					{title}
				</div>
			)
		}
		setCameras(isManyCameras 
			? otherCameras.map(camera => {
				return (
					<div key={`Other--Cameras--${camera.id}--${camera.description.length}`} className={classes.otherCamerasAll}>
						{/*<iframe*/}
						{/*	src={camera.link}*/}
						{/*	width={"100%"} height={"100%"}*/}
						{/*	title="Other cameras"*/}
						{/*	frameBorder="0"*/}
						{/*	allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
						{/*	allowFullScreen*/}
						{/*/>*/}
						<img style={{width: "100%", height: "100%"}} src={camera.previewLink} alt={"jpg stream"}/>
						<div className={classes.pressLayout} onClick={() => goToNextCam(camera.id)}/>
						<ImageTitle title={camera.description}/>
					</div>
				)
			})
			: <NoCameras />
		)
	}, [port, camera]);
	useEffect(() => {
		setResize("resize");
	}, [useWindowDimensions().height])

	const goToNextCam = (camId) => {
		ports.setSelectedCamera(camId);
	}

	if (!Number.isInteger(camera.id)) {
		ports.setSelectedCamera(ports.data[0].cameras[0].id);
	}

	return (
		<div
			className={`${classes.otherCameras}`}
			style={{maxHeight: useWindowDimensions().height * eventsState.maxHeight}}
		>
			{cameras}
		</div>
	)
})