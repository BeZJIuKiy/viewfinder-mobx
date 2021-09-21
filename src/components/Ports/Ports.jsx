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


const useStyles = makeStyles((theme) => {
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return ({
		main: {
			height: "100%",

			"@media(max-width: 425px)": {
				height: scrollHeight,
			},
		},

		drawer: {
			// width: 300,
			// minHeight: "100%",
			// flexShrink: 0,

			paddingTop: 98,

			// "@media(max-width: 425px)": {
			// 	display: "none",
			// },
		},
		drawerOld: {
			width: 300,
			minHeight: "100%",
			flexShrink: 0,

			paddingTop: 98,

			"@media(max-width: 425px)": {
				display: "none",
			},
		},

		mobileDrawer: {
			display: "none",


			"@media(max-width: 425px)": {
				width: "100%",
				display: "flex",

				position: "absolute",

				bottom: 0,
				left: 0,
				zIndex: 1,

				overflowX: "auto",
			},
		},

		changeMap: {
			display: "flex",

			width: 95,
			height: 28,

			borderRadius: 3,
			borderColor: "transparent",

			boxShadow: "0 1px 2px 1px rgba(0,0,0,.15),0 2px 5px -3px rgba(0,0,0,.15)",

			position: "absolute",
			top: 112,
			left: 320,
			zIndex: 1,

			backgroundColor: "white",

			"@media(max-width: 425px)": {
				top: 102,
				left: 10,
			},
		},
		drawerContent: {
			display: "flex",
			position: "relative",

			minHeight: "100%",
		},
	})
})

export const Ports = () => {
	const classes = useStyles();

	const {height, width} = useWindowDimensions();

	const [mapVisible, setmapVisible] = useState(true);
	const addtype = ["Yamap", "NewMap"];

	const handlerMapChange = () => setmapVisible(!mapVisible);

	// fetch(connects.urlPortsPage)
	// 	.then(response => response.json())
	// 	.then(item => console.log(item));

	return (
		<Grid container style={{overflow: "hidden",}}>
			<Grid item xs={12} sm={12} md={12}>
				<Header/>
			</Grid>
			<Hidden xsDown>
				<Grid item xs={12} sm={3} md={4} lg={3} xl={2} >
					<div className={classes.drawer}><Drawer/></div>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={9} md={8} lg={9} xl={10}>
				<YaMap isVisible={true}/>
			</Grid>
		</Grid>
	)
	// return (
	// 	<div className={classes.main}>
	// 		<Header/>
	// 		<div className={`${classes.drawerContent}`}>
	// 			<div className={classes.drawer}>
	// 				<Drawer/>
	// 			</div>
	//
	// 			<YaMap isVisible={mapVisible}/>
	// 			<NewMap isVisible={!mapVisible}/>
	// 		</div>
	//
	// 		<div className={classes.mobileDrawer}>
	// 			<Drawer/>
	// 		</div>
	//
	// 		<select className={`${classes.changeMap}`} onChange={handlerMapChange}>
	// 			{addtype.map((address, key) => <option value={key} key={key}>{address}</option>)}
	// 		</select>
	// 	</div>
	// )
}