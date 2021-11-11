import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import ports from "../../../../store/ports";
import account from "../../../../store/account";

const useStyles = makeStyles((theme) => ({

}))
export const DeleteShipDialog = observer(({ship, isOpen, handleClose, btnStyles}) => {
	const classes = useStyles();

	const handleDeletePolygon = () => {
		handleClose();
		const {isFromEvent, portId, cameraId, eventId} = ship.fromEvent;

		account.deleteShip(ship.id);
		if (isFromEvent) ports.changeEvent(portId, cameraId, clearEvent(portId, cameraId, eventId));
	}

	const confirmBtn = (classPrefix, text, action) => {
		return (
			<Button className={`${btnStyles} ${classPrefix}`} onClick={action} color="primary" autoFocus>
				{text}
			</Button>
		)
	}

	const clearEvent = (portId, cameraId, eventId) => {
		const portIndex = ports.data.findIndex(({id}) => id === portId);
		const cameraIndex = ports.data[portIndex].cameras.findIndex(({id}) => id === cameraId);
		const event = ports.data[portIndex].cameras[cameraIndex].events.find(({id}) => id === eventId);

		return ({
			...event,
			imo: "",
			mmsi: "",
			name: "",
			callSign: "",
		})
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
				{`Delete ${ship.name}?`}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description-delete-ship">
					{`Are you sure you want to delete the ship "${ship.name}"?`}
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				{confirmBtn("cancel", "cancel", handleClose)}
				{confirmBtn("ok", "delete", handleDeletePolygon)}
			</DialogActions>
		</Dialog>
	)
})