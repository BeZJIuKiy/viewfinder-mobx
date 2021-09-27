import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
	imageTitle: {
		position: "absolute",
		top: 0,
		left: "50%",

		zIndex: 1,

		transform: "translate(-50%, 0)",

		color: "white",
		fontWeight: 400,
		padding: "5px 10px 5px",
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		background: "rgba(51, 51, 51, 0.7)",
	},
}))

export const ImageTitle = ({title}) => {
	const classes = useStyle();

	return (
		<div className={classes.imageTitle}>
			{title}
		</div>
	);
};