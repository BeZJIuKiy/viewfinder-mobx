import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Header} from "../Header/Header";
import {TestImage} from "./TestImage";
import {TestList} from "./TestList";
import {Canvas} from "./Canvas";
import {BoatEvents} from "./BoatEvents";

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
	},

	types: {
		width: "100%",
		height: "100%",

		textAlign: "center",
		margin: "0 auto",
		padding: 10,

		background: "rgba(51, 51, 51, 0.5)",
		borderRadius: 5,
	},
	correctingPosition: {
		paddingTop: 92,
		marginRight: 24,
		marginLeft: -24,
	}
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
		<Grid className={`${classes.secondGridContainer}`} container spacing={3}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<div className={classes.types}>
					<Canvas/>
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
					<Grid className={classes.gridContainer} container spacing={3}>
						<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
							<FirstPart/>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
							<SecondPart/>
						</Grid>

						<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
							<ThirdPart/>
						</Grid>

						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<ForthPart/>
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
};

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
//
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	paper: {
// 		padding: theme.spacing(2),
// 		margin: 'auto',
// 		// maxWidth: 500,
// 		// maxWidth: "100%",
// 	},
// 	image: {
// 		width: 128,
// 		height: 128,
// 	},
// 	img: {
// 		margin: 'auto',
// 		display: 'block',
// 		maxWidth: '100%',
// 		maxHeight: '100%',
// 	},
// }));
//
// export const Events30 = () => {
// 	const classes = useStyles();
//
// 	return (
// 		<div className={classes.root}>
// 			<Paper className={classes.paper}>
// 				<Grid container spacing={2}>
// 					<Grid item>
// 						<ButtonBase className={classes.image}>
// 							<img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
// 						</ButtonBase>
// 					</Grid>
// 					<Grid item xs={12} sm container>
// 						<Grid item xs container direction="column" spacing={2}>
// 							<Grid item xs>
// 								<Typography gutterBottom variant="subtitle1">
// 									Standard license
// 								</Typography>
// 								<Typography variant="body2" gutterBottom>
// 									Full resolution 1920x1080 • JPEG
// 								</Typography>
// 								<Typography variant="body2" color="textSecondary">
// 									ID: 1030114
// 								</Typography>
// 							</Grid>
// 							<Grid item>
// 								<Typography variant="body2" style={{ cursor: 'pointer' }}>
// 									Remove
// 								</Typography>
// 							</Grid>
// 						</Grid>
// 						<Grid item>
// 							<Typography variant="subtitle1">$19.00</Typography>
// 						</Grid>
// 					</Grid>
// 				</Grid>
// 			</Paper>
// 		</div>
// 	);
// }