import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

import boatImg from "./images/b1-01.jpg";

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
	},
	btn: {
		color: '#333',

		"&.previous": {
			transform: "rotate(180deg)",
		},

		"&.next": {}
	},
}));

export const ShipScreen = observer(() => {
	const classes = useStyles();
	const arrow = (direction) => {
		return (
			<IconButton className={`${classes.btn} ${direction}`} aria-label="add an alarm">
				<ArrowForwardIosIcon fontSize="large"/>
			</IconButton>
		)
	}
	return (
		<div className={classes.shipScreen}>
			{arrow("previous")}
			<img className={classes.shipImage} src={boatImg} alt="#"/>
			{arrow("next")}
		</div>
	);
});