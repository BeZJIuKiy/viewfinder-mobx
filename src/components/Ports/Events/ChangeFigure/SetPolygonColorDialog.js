import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input} from "@material-ui/core";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import ports from "../../../../store/ports";
import {ChromePicker} from "react-color";
import "./react-contextmenu.css";
import canvasState from "../../../../store/canvasState";
import Polygons from "./Polygons";

const useStyles = makeStyles((theme) => ({}))
export const SetPolygonColorDialog = observer(({area, index, isOpen, handleClose, btnStyles}) => {
    const classes = useStyles();

    const {camera} = ports.selectedObjects;

    const [value, setValue] = useState("#333")

    const handleChangeColor = (e) => {
        setValue(e.rgb)
        // setValue(e.hex)
    }
    const handleSavingChanges = () => {
        handleClose(area);
        canvasState.setPolygonColor(camera.id, index, value);
        // canvasState.deletePolygon(camera.id, index);
        new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
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
                {`Change color area ${name}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`Select the desired color for this zone`}
                    <ChromePicker onChange={handleChangeColor} color={value} width={"270px"} disableAlpha={true}/>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {confirmBtn("cancel", "cancel", handleCloseDialog)}
                {confirmBtn("ok", "ok", handleSavingChanges)}
            </DialogActions>
        </Dialog>
    )
})