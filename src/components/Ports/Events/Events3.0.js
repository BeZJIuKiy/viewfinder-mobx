import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",

		color: "#ddd",
		fontWeight: 500,
		fontFamily: `"Quicksand", sans-serif`,
		background: "rgba(51, 51, 51, 1)",
	},
	gridContainer: {
		height: "100%",
	},

	types: {
		width: "100%",
		height: "100%",

		textAlign: "center",
		margin: "0 auto",
		padding: 10,

		background: "rgba(240, 240, 240, 0.5)",
		borderRadius: 10,

	},
}));

export const Events30 = () => {
	const classes = useStyles();

	return (
		<div className={`${classes.root}`}>
			<Container maxWidth="xl" className={classes.gridContainer}>
				{/*<Grid className={classes.gridContainer} container spacing={3}>*/}
				<Grid className={classes.gridContainer} container spacing={3}>
					<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
						<Grid className={classes.gridContainer} container spacing={3}>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<div className={classes.types}>Types</div>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<div className={classes.types}>Images</div>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
						<div className={classes.types}>Second part</div>
					</Grid>

					<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
						<Grid className={classes.gridContainer} container spacing={3}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div className={classes.types}>img 1</div>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div className={classes.types}>img 2</div>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						Table
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};