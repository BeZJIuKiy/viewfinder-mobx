import React, {useEffect, useState} from 'react';
import './drawer.css';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {useHistory} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import ports from "../../../store/ports";
import header from "../../../store/header";
import {DrawerSearch} from "./DrawerSearch";
import {DrawerItems} from "./DrawerItems";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",

		flex: "0 0 auto",
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",

		// "@media(max-width: 425px)": {
		// 	// maxWidth: 99999,
		// 	// backgroundColor: "gold",
		// 	// overflowY: "hidden",
		// }
	},

	main: {
		display: "flex",
		flexDirection: "column",

		"@media(max-width: 425px)": {
			width: '100%',
			flexDirection: "row",
			padding: 0,
		},
	},
	search: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		marginBottom: 10,

		"@media(max-width: 425px)": {
			display: "none",
		}
	}
}));

export const Drawer = observer(({isMobile}) => {
	const classes = useStyles();
	const history = useHistory();

	const search = "description";
	const searchLabel = "Camera Name";
	const secretTitle = `Drawer--${Number.isInteger(ports.selectedObjects.port.id) ? "camera" : "port"}`;


	const {data, portIcon, cameraIcon, selectedObjects, searchQuery} = ports;
	const {portsNoteTest, camerasNoteTest} = header;


	const [allData, setAllData] = useState(data)
	const [notes, setNotes] = useState({});
	const [icon, setIcon] = useState();

	useEffect(() => {
		const {id, cameras} = selectedObjects.port;
		const portId = Number.isInteger(id);

		portId
			? setData(cameras, camerasNoteTest, cameraIcon.drawerIcon)
			: setData(data, portsNoteTest, portIcon.drawerIcon);
	}, [selectedObjects.port]);
	useEffect(() => {
		const {id, cameras} = selectedObjects.port;
		const portId = Number.isInteger(id);

		searchQuery[secretTitle]?.length
			? setAllData(searchQuery[secretTitle])
			: portId
				? setData(cameras, camerasNoteTest, cameraIcon.drawerIcon)
				: setData(data, portsNoteTest, portIcon.drawerIcon);
	}, [searchQuery[secretTitle]]);

	const changeDataPorts = (id) => {
		ports.setSelectedPort(id);
	}
	const changeDataCamera = (id) => {
		ports.setSelectedCamera(id);
		ports.clearSearchQuery();
		history.push('/events');
	}
	const setData = (data, notif, icon) => {
		setAllData(data);
		setNotes(notif);
		setIcon(icon);
	}

	const items = allData.map(({id, description}, i) => {
		const portId = Number.isInteger(selectedObjects.port.id);

		return (
			<DrawerItems
				key={`${id}-${description}`}
				icon={icon}
				description={description}
				notes={notes[id]}
				onClick={() => portId ? changeDataCamera(id) : changeDataPorts(id)}
			/>
		)
	});

	// const items = () => {
	// 	const portId = Number.isInteger(selectedObjects.port.id);
	//	const pointsId = [];
	//	for (const key in allData) pointsId.push(key);
	//
	// 	return pointsId.map((itemId) => {
	// 		const {id, description} = allData[itemId];
	//
	// 		return (
	// 			<DrawerItems
	// 				key={`${id}-${description}`}
	//				icon={icon}
	// 				description={description}
	// 				notes={notes[id]}
	// 				onClick={() => id ? changeDataCamera(id) : changeDataPorts(id)}
	// 			/>
	// 		)
	// 	})
	// }

	return (
		<div className={classes.root}>
			<List className={`${classes.main}`} component="nav" aria-label="main mailbox folders">
				<div className={classes.search}>
					<DrawerSearch data={allData} search={search} label={`Search ${searchLabel}`}
					              secretTitle={secretTitle}/>
				</div>
				{items}
			</List>
		</div>
	);
})