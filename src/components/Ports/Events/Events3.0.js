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

const useStyles = makeStyles((theme) => ({
	event: {
		flexGrow: 1,

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
		flexGrow: 1,
		margin: 0,
	},

	secondGridContainer: {
		height: "100%",
		margin: 0,

		"&.camera": {
			// alignItems: "center",
		},
	},

	types: {
		width: "100%",
		height: "100%",

		textAlign: "center",
		margin: "0 auto",
		padding: 10,

		alignItems: "center",

		background: "rgba(51, 51, 51, 0.5)",
		borderRadius: 5,

		position: "relative",

		"&.aaa": {

		},
	},
	cameraControlPanel: {
		position: "absolute",
		left: "50%",
		bottom: 10,
		// right: 10,
		// bottom: 50,
		zIndex: 1,

		transform: "translate(-50%, 0)",

	},
	correctingPosition: {
		paddingTop: 92,
		marginRight: 24,
		marginLeft: -24,
	},
}));

const FirstPart = () => {
	const classes = useStyles();

	return (
		<Grid className={`${classes.secondGridContainer}`} container spacing={3}>
			<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
				<div className={classes.types}>
					<TestList/>
				</div>
			</Grid>
			<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
				<div className={classes.types}>
					<TestImage/>
				</div>
			</Grid>
		</Grid>
	)
}
const SecondPart = () => {
	const classes = useStyles();

	return (
		<Grid className={`${classes.secondGridContainer} camera`} container spacing={3}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<div className={`${classes.types} aaa`}>
					<Canvas/>
					<span className={classes.cameraControlPanel}><CameraControlPanel/></span>
				</div>
			</Grid>
		</Grid>
	)
}
const ThirdPart = () => {
	const classes = useStyles();

	return (
		<Grid className={`${classes.secondGridContainer}`} container spacing={3} style={{overflowY: "auto"}}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<div className={`${classes.types} cameras`}>img</div>
			</Grid>
		</Grid>
	)
}
const ForthPart = () => {
	const classes = useStyles();

	return (
		<Grid className={`${classes.secondGridContainer}`} container>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<BoatEvents/>
			</Grid>
		</Grid>
	)
}


export const Events30 = () => {
	const classes = useStyles();

	return (
		<div className={`${classes.event}`}>
			<Header/>
			<Container maxWidth="xl">
				<div className={classes.correctingPosition}>
					<Grid className={classes.gridContainer} container spacing={3} justify={"center"}>
						<Hidden smDown>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<FirstPart/>
							</Grid>
						</Hidden>

						<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
							<SecondPart/>
						</Grid>

						<Hidden smDown>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<ThirdPart/>
							</Grid>
						</Hidden>

						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<ForthPart/>
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
};