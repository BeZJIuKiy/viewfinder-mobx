import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Header} from "../Header/Header";
import {TestImage} from "./TestImage";
import {TestList} from "./TestList";
import {Canvas} from "./Canvas";
import {BoatEvents} from "./BoatEvents";
import {Hidden} from "@material-ui/core";
import {CameraControlPanel} from "./CameraControlPanel/CameraControlPanel";
import {DrawControl} from "./CameraControlPanel/DrawControl";
import ports from "../../../store/ports";
import header from "../../../store/header";
import {OtherCameras} from "./OtherCameras";
import eventsState from "../../../store/eventsState";

const useStyles = makeStyles((theme) => ({
	event: {
		flexGrow: 1,
		// flexShrink: 1,
		height: "100%",

		marginTop: theme.spacing(-4),

		color: "#ddd",
		fontWeight: 500,
		fontFamily: `"Quicksand", sans-serif`,

		// background: "rgba(51, 51, 51, 1)",
		backgroundAttachment: "fixed",
		backgroundPosition: 'center',
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",

		position: "relative",
	},
	gridContainer: {
		height: "100%",

		flexGrow: 1,
		margin: 0,
	},

	secondGridContainer: {
		height: "100%",
		margin: 0,

		"&.controlMovePanel": {
			marginTop: theme.spacing(-5),
			marginLeft: 12,

			"&.show": {
				display: "flex",
			},

			"&.hide": {
				display: "none",
			},
		},
		"&.tableEvents": {
			marginTop: theme.spacing(-4),
		},
		"&.fourthPart": {
			overflowY: "auto",
		},
	},

	types: {
		width: "100%",
		height: "100%",

		textAlign: "center",
		margin: "0 auto",
		padding: 10,

		alignItems: "center",

		// background: "rgba(51, 51, 51, 0.5)",
		// background: "rgba(200, 200, 200, 0.7)",
		borderRadius: 5,

		position: "relative",

		"&.show": {
			display: "block",
			"@media(max-width: 960)": {
				// marginTop: theme.spacing(-2),
			}
			// marginBottom: theme.spacing(10),
		},
		"&.hide": {
			display: "none",
		},
	},
	correctingPosition: {
		height: "100%",

		paddingTop: 92,
		marginRight: 24,
		marginLeft: -24,
	},
	container: {
		height: "100%",
	},
}));

export const Events30 = () => {
	const classes = useStyles();

	const {
		selectedObjects: {
			port, camera, event,
			shipImage: {isVisible: imageVisible, id: imageId},
		},
	} = ports;
	const {camerasNewNote} = header;

	const vesselsPack = () => {
		return (
			<Grid className={`${classes.secondGridContainer}`} container spacing={3}>
				{/*<Hidden mdDown>*/}
				{/*	<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>*/}
				{/*		<div className={classes.types}>*/}
				{/*			<TestList/>*/}
				{/*		</div>*/}
				{/*	</Grid>*/}
				{/*</Hidden>*/}
				{/*<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>*/}
				{/*<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>*/}
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<div className={classes.types}>
						<TestImage/>
					</div>
				</Grid>
			</Grid>
		)
	}
	const mainCamera = () => {
		return (
			<Grid className={`${classes.secondGridContainer}`} container spacing={3}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<div className={`${classes.types} ${eventsState.isShowImage ? "hide" : "show"}`}>
						{/*<span style={{display: "none", "@media(max-width: 960)": {display: "flex", opacity: 0} }}>123</span>*/}
						<span style={{opacity: 0}}>123</span>
						<Canvas/>
					</div>

					<div className={`${classes.types} ${eventsState.isShowImage ? "show" : "hide"}`}>
						img
					</div>
				</Grid>
			</Grid>
		)
	}
	const otherCameras = () => {
		return (
			<Grid className={`${classes.secondGridContainer} thirdPart`} container spacing={3}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<div className={`${classes.types} cameras`}>
						<OtherCameras/>
					</div>
				</Grid>
			</Grid>
		)
	}
	const cameraMovePanel = () => {
		return (
			<Grid className={`${classes.secondGridContainer} controlMovePanel`} container>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<div className={`${classes.types}`}>
						<DrawControl/>
					</div>
				</Grid>
			</Grid>
		)
	}
	const tableEvents = () => {
		return (
			<Grid className={`${classes.secondGridContainer} tableEvents`} container spacing={3}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<BoatEvents/>
				</Grid>
			</Grid>
		)
	}

	if (!Number.isInteger(camera.id)) {
		ports.setSelectedCamera(ports.data[0].cameras[0].id);
	}

	return (
		<div className={`${classes.event}`}>
			<Header/>
			<Container maxWidth="xl" className={classes.container}>
				<div className={classes.correctingPosition}>
					<Grid className={classes.gridContainer} container spacing={3} justify={"center"}>
						<Hidden smDown>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								{vesselsPack()}
							</Grid>
						</Hidden>

						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							{mainCamera()}
						</Grid>

						<Hidden smDown>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								{otherCameras()}
							</Grid>
						</Hidden>

						<Hidden smDown>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								{cameraMovePanel()}
							</Grid>
						</Hidden>

						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							{tableEvents()}
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
};