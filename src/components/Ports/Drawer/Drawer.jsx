import React, {useEffect, useState} from 'react';
import './drawer.css';
import { SimpleList } from './SimpleList';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Icon} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {NavLink, useHistory} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import ports from "../../../store/ports";
import header from "../../../store/header";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",

        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",

        "@media(max-width: 425px)": {
            maxWidth: 99999,
            // backgroundColor: "gold",
            overflowY: "hidden",
        }
    },

    main: {
        display: "flex",
        flexDirection: "column",

        "@media(max-width: 425px)": {
            width: '100%',
            flexDirection: "row",
            padding: 0,
        },
    }
}));

export const Drawer = observer(({isMobile}) => {
    const classes = useStyles();
    const history = useHistory();


    const {data, portIcon, cameraIcon, selectedObjects} = ports;
    const {portsNewNote, camerasNewNote} = header;


    const [allData, setAllData] = useState(data)
    const [notes, setNotes] = useState(data.map(() => 0));
    const [icon, setIcon] = useState();


    useEffect(() => {
        const {id, cameras} = selectedObjects.port;
        const portId = Number.isInteger(id);

        portId
            ? setData(cameras, camerasNewNote, cameraIcon.drawer)
            : setData(data, portsNewNote, portIcon.drawer);
    }, [selectedObjects.port]);


    const changeDataPorts = (i) => {
        ports.setSelectedPort(i);
    }
    const changeDataCamera = (i) => {
        ports.setSelectedCamera(i);
        history.push('/events');
    }
    const setData = (data, note, icon) => {
        setAllData(data);
        setNotes(note);
        setIcon(icon);
    }


    // const camData = allData.map(({id, link, description}, i) => {
    // 	const portId = Number.isInteger(selectedObjects.port.id);
    //
    // 	return (
    // 		<div key={id}>
    // 			<List component="nav" aria-label="main mailbox folders">
    // 				<ListItem button
    // 				          onClick={() => portId ? changeDataCamera(i) : changeDataPorts(i)}
    // 				>
    // 					<ListItemIcon>
    // 						<Icon>
    // 							<img src={icon} height={25} width={25} alt=""/>
    // 						</Icon>
    // 					</ListItemIcon>
    // 					<ListItemText primary={description}/>
    //
    // 					<IconButton aria-label="show 17 new notifications" color="default">
    // 						<Badge badgeContent={notes[i]} color="secondary">
    // 							<NavLink to="/events">
    // 								<NotificationsIcon/>
    // 							</NavLink>
    // 						</Badge>
    // 					</IconButton>
    // 				</ListItem>
    // 			</List>
    // 			<Divider/>
    // 		</div>
    // 	)
    // });
    const camData = allData.map(({id, link, description}, i) => {
        const portId = Number.isInteger(selectedObjects.port.id);

        return (
            <div key={id}>
                <ListItem button
                          onClick={() => portId ? changeDataCamera(i) : changeDataPorts(i)}
                >
                    <ListItemIcon>
                        <Icon>
                            <img src={icon} height={25} width={25} alt=""/>
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary={description}/>

                    <IconButton aria-label="show 17 new notifications" color="default">
                        <Badge badgeContent={notes[i]} color="secondary">
                            <NavLink to="/events">
                                <NotificationsIcon/>
                            </NavLink>
                        </Badge>
                    </IconButton>
                </ListItem>
                <Divider/>
            </div>
        )
    });

    return (
        <div className={classes.root}>
            {/*<List className={`${classes.main} ${isMobile ? "mobile" : "desctop"}`} component="nav" aria-label="main mailbox folders">*/}
            <List className={`${classes.main}`} component="nav" aria-label="main mailbox folders">
                {camData}
            </List>
        </div>
    );
})