import {DRAGGABLE_TESTING, PaperComponent} from "../../../useHooks/useDraggable";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import ports from "../../../store/ports";
import header from "../../../store/header";

const useStyles = makeStyles((theme) => ({}))
export const DeleteEventDialog = observer(({isOpen, handleClose, selectedId, btnStyles}) => {
	const classes = useStyles();

	const {selectedObjects: {port, camera}} = ports;

	const handleDeleteRow = () => {
		ports.deleteEvents(port.id, camera.id, selectedId);
		header.checkNewNotifications();
		handleClose();
	}

	const confirmBtn = (classPrefix, text, action) => {
		return (
			<Button className={`${btnStyles} ${classPrefix}`} onClick={action} color="primary" autoFocus>
				{text}
			</Button>
		)
	}

	return (
		<Dialog
			PaperComponent={PaperComponent}
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="draggable-dialog-titles"
			aria-describedby="simple-modal-descriptions"
		>
			<DialogTitle id={DRAGGABLE_TESTING} style={{cursor: 'move'}}>
				{`Delete selected events?`}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{`Are you sure you want to delete the selected ${selectedId.length} events?`}
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				{confirmBtn("ok", "cancel", handleClose)}
				{confirmBtn("cancel", "delete", handleDeleteRow)}
			</DialogActions>
		</Dialog>
	)
})