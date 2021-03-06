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
	drawer: {
		height: "100%",

		flex: "0 0 auto",
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},

	main: {
		display: "flex",
		flexDirection: "column",
	},
	search: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		marginTop: theme.spacing(1),
		marginBottom: 10,
	}
}));

export const Drawer = observer(() => {
	const classes = useStyles();
	const history = useHistory();

	const search = "description";
	const searchLabel = "Camera Name";
	const secretTitle = `Drawer--${Number.isInteger(ports.selectedObjects.port.id) ? "camera" : "port"}`;


	const {data, portIcon, cameraIcon, selectedObjects, searchQuery} = ports;
	const {portsNoteTest, camerasNoteTest} = header;

	const [allData, setAllData] = useState(data)
	const [notes, setNotes] = useState("");
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
	const setData = (data, notify, icon) => {
		setAllData(data);
		setNotes(notify);
		setIcon(icon);
	}

	const items = allData.map(({id, description, zoom}, i) => {
		const portId = Number.isInteger(selectedObjects.port.id);

		return (
			<DrawerItems
				key={`${id}-${description}-${zoom}-${id+description.length}`}
				icon={icon}
				description={description}
				notes={notes[id]}
				onClick={() => portId ? changeDataCamera(id) : changeDataPorts(id)}
			/>
		)
	});

	return (
		<div className={classes.drawer}>
			<div className={classes.search}>
				<DrawerSearch data={allData} search={search} label={`Search ${searchLabel}`}
				              secretTitle={secretTitle}/>
			</div>

			<List className={`${classes.main}`} component="nav" aria-label="main mailbox folders">
				{items}
			</List>
		</div>
	);
})