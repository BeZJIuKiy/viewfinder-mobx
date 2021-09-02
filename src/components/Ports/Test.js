import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import YaMap from "./YaMap/YaMap";
import {Drawer} from "./Drawer/Drawer";
import {Header} from "./Header/Header";
import Grid from "@material-ui/core/Grid";
import {Box, Card} from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		// display: "flex",
		// height: 500,
		// color: "white",
		// fontSize: "2.6em",
		// flexFlow: "column wrap",    // Расположение в виде колонок

		// display: "flex",
		// flexWrap: "wrap",
		// padding: 0,
		// margin: 0,
		// listStyle: "none",

		display: "flex",
		// flexFlow: "row wrap",
		maxWidth: 1200,
		marginTop: 10,
		margin: "0 auto",
	},

	item01: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",


		"&.one": {
			backgroundColor: "#508694",
			marginRight: 10,
			flexBasis: "100%",
			order: 1, // Первый блок
		},

		"&.two": {
			backgroundColor: "#BB844C",
			marginBottom: 10,
			flex: "1 1 0",
			order: 2, // Второй блок
		},

		"&.three": {
			backgroundColor: "#929D79",
			flex: "1 1 0",
			order: 3, // Третий блок
		},

		"&.four": {
			backgroundColor: "#929D79",
			flexBasis: "100%",
			margin: "0 10px",
			order: 4, // Четвертый блок
		},

		"&.five": {
			backgroundColor: "#929D79",
			marginBottom: 10,
			flex: "1 1 0",
			order: 5, // Пятый блок
		},

		"&.six": {
			backgroundColor: "#929D79",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Шестой блок
		},

		"&.seven": {
			backgroundColor: "#929D79",
			// marginTop: 10,
			flex: "1 1 0",
			order: 7, // Седьмой блок
		},
	},
	item02: {
		flex: "1 1 0",

		padding: 100,
		background: "#f0f0f0",
		borderRadius: 5,
		margin: "1rem",
		textAlign: "center",
	},

	item03: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 200,
		backgroundColor: "#508694",

		borderRadius: 16,
		boxShadow: "0 0 2px 0 rgba(145, 158, 171, 0.24),0 16px 32px -4px rgba(145, 158, 171, 0.24)",

		"&.one": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 1, // Первый блок
		},

		"&.two": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 2, // Первый блок
		},

		"&.three": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 3, // Первый блок
		},

		"&.four": {
			height: 200,

			backgroundColor: "#508694",
			marginBottom: 10,
			flex: "1 1 0",
			order: 4, // Первый блок
		},

		"&.five": {
			// width: 1000,
			height: 300,

			backgroundColor: "#333",
			marginBottom: 10,
			// flexBasis: "80%",

			// flex: "1 1 80%",
			order: 5, // Первый блок
		},

		"&.six": {
			height: 200,

			backgroundColor: "#508694",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Первый блок
		},
		"&.eight": {
			height: 300,

			backgroundColor: "#e5e5e5",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Первый блок
		},
	}
});

export const Test = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{/*<div className={`${classes.item01} one`}>First</div>*/}
			{/*<div className={`${classes.item01} two`}>Second</div>*/}
			{/*<div className={`${classes.item01} three`}>Third</div>*/}
			{/*<div className={`${classes.item01} four`}>Fourth</div>*/}
			{/*<div className={`${classes.item01} five`}>Fifth</div>*/}
			{/*<div className={`${classes.item01} six`}>Sixth</div>*/}
			{/*<div className={`${classes.item01} seven`}>Seventh</div>*/}

			{/*<div className={`${classes.item02}`}>1</div>*/}
			{/*<div className={`${classes.item02}`}>2</div>*/}
			{/*<div className={`${classes.item02}`}>3</div>*/}

			{/*<div className={`${classes.item03} one`}>1</div>*/}
			{/*<div className={`${classes.item03} two`}>2</div>*/}
			{/*<div className={`${classes.item03} three`}>3</div>*/}
			{/*<div className={`${classes.item03} four`}>4</div>*/}

			{/*<div className={`${classes.item03} five`}>5</div>*/}
			{/*<div className={`${classes.item03} six`}>6</div>*/}

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={3}>
					<div className={`${classes.item03}`}>1</div>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<div className={`${classes.item03}`}>2</div>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<div className={`${classes.item03}`}>3</div>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<div className={`${classes.item03}`}>4</div>
				</Grid>

				<Grid item xs={12} sm={6} md={8}>
					<div className={`${classes.item03} five`}>5</div>
				</Grid>

				<Grid item xs={12} sm={6} md={4}>
					<div className={`${classes.item03}`}>6</div>
				</Grid>

				<Grid item xs={12} sm={6} md={8}>
					<div className={`${classes.item03}`}>7</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<div className={`${classes.item03} eight`}>8</div>
				</Grid>

				<Grid item xs={12} sm={6} md={4}>
					<div className={`${classes.item03}`}>9</div>
				</Grid>
				<Grid item xs={12} sm={6} md={8}>
					<div className={`${classes.item03}`}>10</div>
				</Grid>
			</Grid>
		</div>
	)
}