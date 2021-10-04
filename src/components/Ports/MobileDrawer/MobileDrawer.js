import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import account from "../../../store/account";
import {Icon} from "@material-ui/core";
import ports from "../../../store/ports";
import {NavLink, useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {observer} from "mobx-react-lite";
import header from "../../../store/header";
import {DrawerSearch} from "../Drawer/DrawerSearch";
import {DrawerItems} from "../Drawer/DrawerItems";
import styles from "../../../store/styles";

const useStyles = makeStyles({
    list: {
        width: styles.drawerWidth,
    },
    fullList: {
        width: 'auto',
    },
    menuIcon: {
        fontSize: 32,
        fill: "#fff",
    },
    active: {
        "&.isActive": {
            color: "#333",
        },

        "&.noActive": {
            color: "#aaa",
        }
    },
    search: {
        "&.show": {
            width: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            marginBottom: 10,
        },

        "&.hide": {
            display: "none",
        },
    }
});

export const MobileDrawer = observer(({drawer}) => {
    const classes = useStyles();
    const history = useHistory();

    const {data, portIcon, cameraIcon, selectedObjects, searchQuery} = ports;
    const {portsNoteTest, camerasNoteTest} = header;

    const search = "description";
    const searchLabel = "Camera Name";
    const secretTitle = `Mobile--Drawer--${Number.isInteger(ports.selectedObjects.port.id) ? "camera" : "port"}`;
    const portId = Number.isInteger(selectedObjects.port.id);


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [allData, setAllData] = useState(data);
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

    const setData = (data, notif, icon) => {
        setAllData(data);
        setNotes(notif);
        setIcon(icon);
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;

        setState({...state, [anchor]: open});
    };
    const handleSelectItem = (index) => {
        account.setSelectedItem(index);
    }

    const drawerMapPoints = () => {
        return (
            <List component="nav" aria-label="main mailbox folders">
                {allData.map(({id, description}) => {
                    return (
                        <DrawerItems
                            key={`DrawerMapPoints--${id}--${description}`}
                            icon={icon}
                            description={description}
                            notes={notes[id]}
                            onClick={() => portId ? handleClickCameraItem(id) : handleClickPortItem(id)}
                        />
                    )
                })}
            </List>
        )
    }
    const handleClickPortItem = (id) => {
        ports.setSelectedPort(id);
    }
    const handleClickCameraItem = (id) => {
        ports.setSelectedCamera(id);
        ports.clearSearchQuery();
        history.push('/events');
    }

    const drawerAccountItem = () => {
        return (
            <List component="nav" aria-label="main mailbox folders">
                {account.drawerItems.map(({id, icon, title}, i) => {
                    return (
                        <ListItem
                            key={`drawerAccountItem--${id}--${title}--${i}`}
                            className={`${classes.active} ${i === account.selectedItemIndex ? "isActive" : "noActive"}`}
                            button
                            onClick={() => handleSelectItem(i)}
                        >
                            <ListItemIcon>
                                <Icon>
                                    {icon}
                                </Icon>
                            </ListItemIcon>

                            <ListItemText primary={title}/>
                        </ListItem>
                    )
                })}
            </List>
        )

    }

    const anchor = 'right';
    const curData = () => {
        switch (history.location.pathname) {
            case "/ports":
                return drawerMapPoints();
            case "/account":
                return drawer.component;
                // return drawerAccountItem();
            case "/test": {
                return drawer.component;
            }

            default:
                return [];
        }
    }

    return (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
                <ListItemIcon><MenuIcon className={classes.menuIcon}/></ListItemIcon>
            </Button>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                classes={{
                    paper: drawer?.style,
                }}
            >
                <div
                    className={clsx(classes.list, {
                        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                    })}
                    role="presentation"
                    // onClick={toggleDrawer(anchor, false)}
                    // onKeyDown={toggleDrawer(anchor, false)}
                >
                    {/*<div*/}
                    {/*	className={`${classes.search} ${history.location.pathname === "/ports" ? "show" : "hide"}`}>*/}
                    {/*	<DrawerSearch data={allData} search={search} label={`Mobile--Search ${searchLabel}`}*/}
                    {/*	              secretTitle={secretTitle}/>*/}
                    {/*</div>*/}

                    {curData()}
                </div>
            </Drawer>
        </React.Fragment>
    );
})