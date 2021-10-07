import React from 'react';
import {observer} from "mobx-react-lite";
import {ContextMenu, ContextMenuTrigger, MenuItem, SubMenu} from "react-contextmenu";
import {makeStyles} from "@material-ui/core/styles";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import "./react-contextmenu.css";
import canvasState from "../../../../store/canvasState";

export const CANVAS_CONTEXT_MENU = "CANVAS_CONTEXT_MENU";


export const Canvaaas = () => {
	return (
		<ContextMenuTrigger id={CANVAS_CONTEXT_MENU}>
			<div>Right Click for Open Menu</div>
		</ContextMenuTrigger>
	)
}


const useStyles = makeStyles((theme) => ({
	canvasContextMenu: {},
	contextMenu: {
		background: useHexToRgba("#bbb"),
	},
	menuItem: {},
}))
export const CanvasContextMenu = observer(() => {
	const classes = useStyles();

	const handleClick = (e, data) => {
		alert(`Clicked on menu ${data.item}`);
	};

	const handleClickSubMenu = (item) => {
		console.log(item)
	};
	const handleClose = (e, data) => {
		console.log(e)
		console.log(data)
	}

	return (
		<div>
			{/*<ContextMenuTrigger id={CANVAS_CONTEXT_MENU}>*/}
			{/*	<div>Right Click for Open Menu</div>*/}
			{/*</ContextMenuTrigger>*/}
			<ContextMenu id={CANVAS_CONTEXT_MENU} className={classes.contextMenu} hideOnLeave={true}>
				<MenuItem
					className={classes.menuItem}
					data={{item: "Home"}}
					onClick={handleClick}
				>
					Home
				</MenuItem>
				<MenuItem
					className={classes.menuItem}
					data={{item: "Post"}}
					onClick={handleClick}
				>
					Post
				</MenuItem>
				<MenuItem
					className={classes.menuItem}
					data={{item: "Post"}}
				>
					<SubMenu hoverDelay={0} title={"Test"}>
						<div onClick={() => handleClickSubMenu("test")}>
							1234
						</div>
					</SubMenu>
				</MenuItem>
			</ContextMenu>
		</div>
	);
});