import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ports from "../../../store/ports";
import header from "../../../store/header";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: "100%",
		height: "100%",
		maxHeight: 450,

		// width: 230,
		// height: 400,

		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	titleBar: {
		cursor: "pointer",
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	icon: {
		color: 'white',
	},
}));

export const TestImage = observer(() => {
	const classes = useStyles();
	const {selectedObjects: {camera, event}} = ports;
	const [data, setData] = useState(camera.events);

	useEffect(() => {
		typeof event.id !== "undefined"
			? setData(camera.events.filter(item => item.typeVessel === event.typeVessel))
			: setData(camera.events);
	}, [event, camera, camera.events]);


	const boatImage = data.map(({id, imageLink, typeVessel}) => {
		return (
			<GridListTile key={id} cols={2} rows={2}
			              onClick={() => {
				              ports.setImageId(id);
				              ports.setVisibleSelectedImage(true);
			              }}
			>
				<img
					style={{cursor: 'pointer'}}
					// src={"data:image/png;base64," + imageLink} alt={typeVessel}
					src={imageLink} alt={typeVessel}
				/>
				<GridListTileBar
					className={classes.titleBar}
					title={typeVessel}
					titlePosition="top"
					actionPosition="left"
				/>
			</GridListTile>
		)
	});

	return (
		<div className={classes.root}>
			<GridList cellHeight={70} spacing={1} className={classes.gridList}>
				{boatImage}
			</GridList>
		</div>
	);
})