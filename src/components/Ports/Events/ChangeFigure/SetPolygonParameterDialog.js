import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import ports from "../../../../store/ports";
import header from "../../../../store/header";
import canvasState from "../../../../store/canvasState";
import eventsState from "../../../../store/eventsState";

const useStyles = makeStyles((theme) => ({

}))
export const SetPolygonParameterDialog = observer(({area, index, isOpen, handleClose, btnStyles}) => {
	const classes = useStyles();

	const {camera} = ports.selectedObjects;

	const [value, setValue] = useState("");

	useEffect(() => {
		if (canvasState.isPolygonSelected === false) return;

		setValue(canvasState.saveDataTest[camera.id][canvasState.currentPolygonNum]?.getName());
	}, [canvasState.currentPolygonNum]);

	const handleCloseDialog = () => {
		handleClose(area);
	}
	const handleConfirmChanges = () => {
		canvasState.saveDataTest[camera.id][index].setName(value);
		handleClose(area)
	}
	const handleChangeAreaName = (e) => {
		setValue(e.target.value)
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
				{`Change Name Area`}
			</DialogTitle>
			<DialogContent>
				<TextField
					type={"text"}
					variant={"outlined"}
					value={value}
					label={"Area Name"}
					placeholder={`Input new name area`}
					onChange={handleChangeAreaName}
				/>
			</DialogContent>

			<DialogActions>
				{confirmBtn("cancel", "cancel", handleCloseDialog)}
				{confirmBtn("ok", "ok", handleConfirmChanges)}
			</DialogActions>
		</Dialog>
	)
})