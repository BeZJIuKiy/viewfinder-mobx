import React, {useEffect, useState} from 'react';
import {Header} from './Header/Header';
import {Drawer} from './Drawer/Drawer';
import YaMap from './YaMap/YaMap';
import './ports.css';
import {NewMap} from './NewMap/NewMap';
import {useWindowDimensions} from "../../useHooks/useWindowDimensions";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";
import connects from "../../store/connects";
import styles from "../../store/styles";


const useStyles = makeStyles((theme) => {
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return ({
		gridContainer: {
			fontFamily: styles.fontFamily,
			overflow: "hidden",
		},
		gridItem: {
			paddingTop: styles.headerHeight,
		},
	})
})

export const Ports = () => {
	const classes = useStyles();

	const [mapVisible, setmapVisible] = useState(true);
	const addtype = ["Yamap", "NewMap"];

	const handlerMapChange = () => setmapVisible(!mapVisible);

	// fetch(connects.urlPortsPage)
	// 	.then(response => response.json())
	// 	.then(item => console.log(item));

	return (
		<Grid container className={classes.gridContainer}>
			<Grid item xs={12} sm={12} md={12}>
				<Header mobileDrawer={{component: <Drawer/>}}/>
			</Grid>
			<Hidden smDown>
				<Grid item xs={12} sm={3} md={4} lg={3} xl={2}>
					<div className={classes.gridItem}><Drawer/></div>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
				<div className={classes.gridItem}><YaMap isVisible={true}/></div>
			</Grid>
		</Grid>
	)
}