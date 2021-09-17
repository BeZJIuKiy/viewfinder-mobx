import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ports from "../../../store/ports";
import React, {useEffect, useState} from "react";

// const [eventSource] = useState(new EventSource('http://192.168.250.183:5001/sse'));
// useEffect(() => {
// 	eventSource.onmessage = ({data}) => {
// 		console.log(`New message: ${data}`)
// 	}
// }, [eventSource?.onmessage]);

const useStyles = makeStyles((theme) => ({
	otherCameras: {
		maxHeight: 450,
		overflowY: "auto"
	},
	otherCamerasAll: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flexGrow: 1,

		position: "relative",

		color: "#333",
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

	const {port, camera} = ports.selectedObjects;

	const [cameras, setCameras] = useState([])

	useEffect(() => {
		if (!!camera.id === false) return;

		setCameras(port.cameras.filter(({id}) => id !== camera.id)
			.map(camera => {
				return (
					<div key={`Other--Cameras--${camera.id}`} className={classes.otherCamerasAll}>
						{camera.description}
						{/*<iframe*/}
						{/*	src={camera.link}*/}
						{/*	width={"100%"} height={"100%"}*/}
						{/*	title="Other cameras"*/}
						{/*	frameBorder="0"*/}
						{/*	allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
						{/*	allowFullScreen*/}
						{/*/>*/}
						<img style={{width: "100%", height: "100%"}} src={camera.previewLink} alt={"jpg stream"} />
						<div className={classes.pressLayout} onClick={() => goToNextCam(camera.id)}/>
					</div>
				)
			}))
	}, [port, camera]);

	const goToNextCam = (camId) => {
		ports.setSelectedCamera(camId);
	}

	if (!Number.isInteger(camera.id)) {
		ports.setSelectedCamera(ports.data[0].cameras[0].id);
	}

	return (
		<div className={classes.otherCameras}>
			{cameras}
		</div>
	)
})