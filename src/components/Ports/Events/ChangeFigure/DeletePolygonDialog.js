import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import ports from "../../../../store/ports";
import header from "../../../../store/header";
import canvasState from "../../../../store/canvasState";
import Polygons from "./Polygons";

const useStyles = makeStyles((theme) => ({

}))
export const DeletePolygonDialog = observer(({area, index, isOpen, handleClose, btnStyles}) => {
	const classes = useStyles();

	const {camera} = ports.selectedObjects;

	const handleDeletePolygon = () => {
		handleClose(area);
		canvasState.deletePolygon(camera.id, index);
		// canvasState.polygonItem.deletePolygon();
		// canvasState.polygonItem.setPolygon(canvasState.saveDataTest[camera.id])
		// console.log(canvasState.saveDataTest[camera.id])
		// console.log(canvasState.rawData[camera.id])
		// console.log(canvasState.polygonItem.polygons)
		// new Polygons(canvasState.canvas, canvasState.socket, "");
		// canvasState.polygonItem.setPolygon(canvasState.saveDataTest[camera.id])
		// canvasState.polygonItem.drawPolygons();

	}
	const handleCloseDialog = () => {
		handleClose(area)
	}

	const confirmBtn = (classPrefix, text, action) => {
		return (
			<Button className={`${btnStyles} ${classPrefix}`} onClick={action} color="primary" autoFocus>
				{text}
			</Button>
		)
	}

	const name = area?.getName();

	return (
		<Dialog
			PaperComponent={PaperComponent}
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="draggable-dialog-titles"
			aria-describedby="simple-modal-descriptions"
		>
			<DialogTitle id={DRAGGABLE_TESTING} style={{cursor: 'move'}}>
				{`Delete ${name}?`}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{`Are you sure you want to delete the selected ${name} area?`}
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				{confirmBtn("cancel", "cancel", handleCloseDialog)}
				{confirmBtn("ok", "delete", handleDeletePolygon)}
			</DialogActions>
		</Dialog>
	)
})