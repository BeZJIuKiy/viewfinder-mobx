import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ContextMenu, ContextMenuTrigger, MenuItem, SubMenu} from "react-contextmenu";
import {makeStyles} from "@material-ui/core/styles";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import "./react-contextmenu.css";
import canvasState from "../../../../store/canvasState";
import {ZONE_TYPE_DEFAULT, ZONE_TYPE_IN_OUT, ZONE_TYPE_PARKING, ZONE_TYPE_RESTRICTED_AREA} from "./Polygon";
import ports from "../../../../store/ports";
import Polygons from "./Polygons";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import CheckIcon from '@material-ui/icons/Check';
import eventsState from "../../../../store/eventsState";

export const CANVAS_CONTEXT_MENU = "CANVAS_CONTEXT_MENU";


export const Canvaaas = () => {
	return (
		<ContextMenuTrigger id={CANVAS_CONTEXT_MENU}>
			<div>Right Click for Open Menu</div>
		</ContextMenuTrigger>
	)
}


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
		}
	})
})
export const CanvasContextMenu = observer(() => {
	const classes = useStyles();

	const [selectedType, setSelectedType] = useState(ZONE_TYPE_DEFAULT);

	useEffect(() => {
		setSelectedType(canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum]?.getAttributeType())
	}, [canvasState.currentPolygonNum])

	const handleClick = (e, data) => {
		alert(`Clicked on menu ${data.item}`);
	};
	const handleClickSubMenu = (zoneType) => {
		canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum].setAttributeType(zoneType)
		new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
	};

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
				{menuItem("Homes", handleClick)}
				{menuItem("Post", handleClick)}
				{menuWithSub("Change type", [ZONE_TYPE_DEFAULT, ZONE_TYPE_IN_OUT, ZONE_TYPE_PARKING, ZONE_TYPE_RESTRICTED_AREA], handleClickSubMenu)}
			</ContextMenu>
		</div>
	);
});