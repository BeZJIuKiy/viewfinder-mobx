import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ports from "../../../store/ports";
import header from "../../../store/header";
import {observer} from "mobx-react-lite";
import eventsState from "../../../store/eventsState";
import styles from "../../../store/styles";
import {ImageTitle} from "./ImageTitle";

const useStyles = makeStyles((theme) => ({
	testImage: {
		maxHeight: window.innerHeight * eventsState.maxHeight,

		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		backgroundColor: theme.palette.background.paper,

		"&.toMany": {
			overflowY: "auto",
			overflowX: "hidden",
		}
	},

	icon: {
		color: 'white',
	},
	image: {
		cursor: 'pointer',
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
				<img className={classes.image} src={`data:image/png;base64,${imageLink}`} alt={typeVessel}/>
				<ImageTitle title={typeVessel}/>
			</GridListTile>
		)
	});

	const isToMany = data.length > 2 ? "toMany" : "";

	return (
		<div className={`${classes.testImage} ${isToMany}`}>
			<GridList cellHeight={70} spacing={1}>
				{boatImage}
			</GridList>
		</div>
	);
})