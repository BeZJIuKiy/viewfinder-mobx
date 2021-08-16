import React, {useEffect, useState} from 'react';
import {Header} from './Header/Header';
import {Drawer} from './Drawer/Drawer';
import YaMap from './YaMap/YaMap';
import './ports.css';
import {NewMap} from './NewMap/NewMap';
import {useWindowDimensions} from "../../useHooks/useWindowDimensions";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => {
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return ({
		main: {
			width: "100%",
			height: scrollHeight,
		},

		drawer: {
			width: "100%",

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
			},
		},

		changeMap: {
			display: "flex",

			position: "absolute",
			top: 70,
			left: 320,
			zIndex: 1,

			"@media(max-width: 425px)": {
				top: 72,
				left: 10,
			},
		},
		drawerContent: {
			display: "flex",
			position: "relative",
		},
	})
})

export const Ports = () => {
	const classes = useStyles();

	const {height, width} = useWindowDimensions();

	const [mapVisible, setmapVisible] = useState(true);
	const addtype = ["Yamap", "NewMap"];

	const handlerMapChange = () => setmapVisible(!mapVisible);

	fetch('http://192.168.250.183:8080/api/boats')
		.then(response => response.json())
		.then(item => console.log(item));

	console.log(width, height)

	return (
		<div className={classes.main}>
			<Header/>
			<div className={`${classes.drawerContent}`}>
				<div className={classes.drawer}>
					<Drawer/>
				</div>

				<YaMap isVisible={mapVisible}/>
				<NewMap isVisible={!mapVisible}/>
			</div>

			<div className={classes.mobileDrawer}>
				<Drawer/>
			</div>

			<div className={`${classes.changeMap}`}>
				<select
					onChange={handlerMapChange}
					className="browser-default custom-select">{
					addtype.map((address, key) => <option value={key} key={key}>{address}</option>)
				}
				</select>
			</div>
		</div>
	)
}