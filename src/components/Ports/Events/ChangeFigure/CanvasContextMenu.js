import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ContextMenu, ContextMenuTrigger, MenuItem, SubMenu} from "react-contextmenu";
import {makeStyles} from "@material-ui/core/styles";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import "./react-contextmenu.css";
import canvasState from "../../../../store/canvasState";
import Polygon, {ZONE_TYPE_DEFAULT, ZONE_TYPE_IN_OUT, ZONE_TYPE_PARKING, ZONE_TYPE_RESTRICTED_AREA} from "./Polygon";
import ports from "../../../../store/ports";
import Polygons from "./Polygons";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import CheckIcon from '@material-ui/icons/Check';
import eventsState from "../../../../store/eventsState";
import {DeletePolygonDialog} from "./DeletePolygonDialog";
import {SetPolygonNameDialog} from "./SetPolygonNameDialog";
import {SetPolygonColorDialog} from "./SetPolygonColorDialog";

export const CANVAS_CONTEXT_MENU = "CANVAS_CONTEXT_MENU";

const useStyles = makeStyles((theme) => {
    const menuBorderRadius = 5;

    return ({
        canvasContextMenu: {},
        contextMenu: {
            background: useHexToRgba("#575757"),
        },
        menuItem: {
            color: "#eee",
            fontWeight: 500,

            "&:hover": {
                background: useHexToRgba("#444"),
            },
        },
        subMenu: {
            padding: 0,
        },
        subMenuItem: {
            fontWeight: 500,
            background: useHexToRgba("#5f5f5f"),
            padding: "3px 16px",
            color: "#eee",
            transition: "background 0.2s",

            "&:first-child": {
                borderTopRightRadius: menuBorderRadius,
                borderTopLeftRadius: menuBorderRadius,
            },

            "&:last-child": {
                borderBottomRightRadius: menuBorderRadius,
                borderBottomLeftRadius: menuBorderRadius,
            },

            "&:hover": {
                background: useHexToRgba("#444"),
            },
        },

        list: {
            padding: 0,
            margin: 0,
        },
        listItem: {
            padding: 0,
            margin: 0,
        },
        listItemIcon: {
            color: "#eee",

            "&.show": {
                display: "flex",
            },
            "&.hide": {
                display: "none",
            },
        },
        icon: {
            "&.show": {
                display: "flex",
            },
            "&.hide": {
                display: "none",
            },
        },
        listItemText: {
            marginLeft: theme.spacing(-2),
        },
        btn: {
            width: 116,
            height: 36,

            "&.ok": {
                color: useHexToRgba("#fff", 0.8),
                background: useHexToRgba("#080", 0.8)
            },

            "&.cancel": {
                color: useHexToRgba("#fff", 0.8),
                background: useHexToRgba("#f00", 0.82),
            },
        },
    })
})
export const CanvasContextMenu = observer(() => {
    const classes = useStyles();

    const {camera} = ports.selectedObjects;

    if (!!!canvasState.saveDataTest[camera.id]) canvasState.checkDataAvailability();

    const [selectedType, setSelectedType] = useState(ZONE_TYPE_DEFAULT);
    const [area, setArea] = useState(canvasState.saveDataTest[camera.id][canvasState.currentPolygonNum]);
    const [isOpenChangeNameAreaDialog, setOpenChangeNameAreaDialog] = useState(false);
    const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isOpenChangeColorDialog, setOpenChangeColorDialog] = useState(false);

    useEffect(() => {
        const index = canvasState.currentPolygonNum;

        setSelectedType(canvasState.saveDataTest[camera.id][index]?.getAttributeType() || ZONE_TYPE_DEFAULT)
        setArea(canvasState.saveDataTest[camera.id][index]);
    }, [canvasState.currentPolygonNum, canvasState.isPolygonSelected]);

    const handleClick = (e, data) => {
        alert(`Clicked on menu ${data.item}`);
    };
    const handleClickSubMenu = (zoneType) => {
        canvasState.changePolygonAttributeType(camera.id, canvasState.currentPolygonNum, zoneType)
        canvasState.setCurrentPolygonNum(-1);
        new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
    };

    const handleShowChangeNameArea = () => {
        setOpenChangeNameAreaDialog(true);
    }
    const handleHideChangeNameArea = () => {
        setOpenChangeNameAreaDialog(false);
    }

    const handleShowChangeColorArea = () => {
        setOpenChangeColorDialog(true);
    }
    const handleHideChangeColorArea = () => {
        setOpenChangeColorDialog(false);
    }

    const handleShowDeleteArea = () => {
        setOpenDeleteDialog(true);
    }
    const handleHideDeleteArea = () => {
        setOpenDeleteDialog(false);
    }

    const menuItem = (title, action) => {
        return (
            <MenuItem
                className={classes.menuItem}
                data={{item: title}}
                onClick={action}
            >
                {title}
            </MenuItem>
        )
    }

    const menuWithSub = (title, subTitles, subAction) => {
        return (
            <MenuItem className={classes.menuItem}>
                <List className={classes.list}>
                    <SubMenu className={classes.subMenu} hoverDelay={0} title={title}>
                        {subTitles.map((title, index) => {
                                return (
                                    <div
                                        className={classes.subMenuItem}
                                        key={`Menu-With-Sub-${title.length}-${title}-${index}`}
                                        onClick={() => subAction(title)}
                                    >
                                        <ListItem className={classes.listItem}>
                                            <ListItemIcon className={`${classes.listItemIcon}`}>
                                                <CheckIcon
                                                    className={`${classes.icon} ${selectedType === title ? "show" : "hide"}`}/>
                                            </ListItemIcon>

                                            <ListItemText className={classes.listItemText} primary={title}/>
                                        </ListItem>
                                    </div>
                                )
                            }
                        )}
                    </SubMenu>
                </List>
            </MenuItem>
        )
    }

    return (
        <div>
            <ContextMenu id={CANVAS_CONTEXT_MENU} className={classes.contextMenu}>
                {menuItem("Change Name", handleShowChangeNameArea)}
                {menuWithSub("Change Type", [ZONE_TYPE_DEFAULT, ZONE_TYPE_IN_OUT, ZONE_TYPE_PARKING, ZONE_TYPE_RESTRICTED_AREA], handleClickSubMenu)}
                {menuItem("Change Color", handleShowChangeColorArea)}
                {menuItem("Delete area", handleShowDeleteArea)}
            </ContextMenu>
            <SetPolygonNameDialog area={area} index={canvasState.currentPolygonNum} isOpen={isOpenChangeNameAreaDialog}
                                  handleClose={handleHideChangeNameArea} btnStyles={classes.btn}/>
            <SetPolygonColorDialog area={area} index={canvasState.currentPolygonNum} isOpen={isOpenChangeColorDialog}
                                   handleClose={handleHideChangeColorArea} btnStyles={classes.btn}/>
            <DeletePolygonDialog area={area} index={canvasState.currentPolygonNum} isOpen={isOpenDeleteDialog}
                                 handleClose={handleHideDeleteArea} btnStyles={classes.btn}/>
        </div>
    );
});