import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ports from "../../../store/ports";
import {observer} from "mobx-react-lite";


const useStyles = makeStyles((theme) => ({
	root: {
		// width: '100%',
		width: 250,
		maxWidth: 360,
		maxHeight: 400,
		backgroundColor: theme.palette.background.paper,
		overflowY: 'auto',
	},

	list: {
		minWidth: 150,
	}
}));

export const TestList = observer(() => {
	const classes = useStyles();
	const {selectedObjects: {camera}} = ports;

	/* Переделать!!! */
	const cameraEvents = camera.events.length ? `All Events ${camera.name}` : `No events`;
	const vesselTypes = camera.events.map(b => b.typeVessel)
		.filter((type, index, arr) => arr.indexOf(type) === index)
		.map((type, i) =>
			<div className={classes.root} key={i * 2}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button onClick={() => ports.setSelectedEvent(i)}>
						<ListItemText primary={type} align="center"/>
					</ListItem>
				</List>
				<Divider/>
			</div>
		);

	return (
		<div className={classes.list}>
			<List component="nav" aria-label="main mailbox folders">
				<ListItem button onClick={ports.clearSelectedEvent} disabled={camera.events.length === 0}>
					<ListItemText primary={cameraEvents} align="center"/>
				</ListItem>
			</List>
			<Divider/>
			{vesselTypes}
		</div>
	);
})