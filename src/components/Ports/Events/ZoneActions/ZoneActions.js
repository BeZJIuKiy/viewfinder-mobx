import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import canvasState from "../../../../store/canvasState";
import {observer} from "mobx-react-lite";
import eventsState from "../../../../store/eventsState";
import styles from "../../../../store/styles";

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 140,
	},

	text: {
		padding: 0,
		fontWeight: 500,
		textTransform: "uppercase",

		fontFamily: styles.fontFamily,
	},
	inputLabel: {
		fontFamily: styles.fontFamily,
	},
}));

export const SET_NAME = "SET NAME";
export const SET_TYPE = "SET TYPE";
export const SET_COLOR = "SET COLOR";
export const DELETE = "DELETE";

export const ZoneActions = observer(() => {
	const classes = useStyles();

	const handleChange = (e) => {
		eventsState.setZoneAction(e.target.value);
	};

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel id="demo-simple-select-outlined-label" className={classes.inputLabel}>
				Zone Actions
			</InputLabel>

			<Select
				className={classes.text}
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={eventsState.zoneAction}
				onChange={handleChange}
				label="Zone Actions"
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem className={classes.text} value={SET_NAME}>{SET_NAME}</MenuItem>
				<MenuItem className={classes.text} value={SET_TYPE}>{SET_TYPE}</MenuItem>
				<MenuItem className={classes.text} value={SET_COLOR}>{SET_COLOR}</MenuItem>
				<MenuItem
					className={classes.text}
					value={DELETE}
					disabled={!canvasState.isPolygonSelected}
				>
					{DELETE}
				</MenuItem>
			</Select>
		</FormControl>
	);
})
