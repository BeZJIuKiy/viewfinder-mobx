import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import canvasState from "../../../../store/canvasState";
import Button from "@material-ui/core/Button";
import ports from "../../../../store/ports";
import Polygons from "../ChangeFigure/Polygons";
import eventsState from "../../../../store/eventsState";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: "80%",
        left: "80%",
        transform: "translate(-50%, 0)",

        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    confirmBtn: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "2vw",
    },

    controlBtn: {
        "&.delete": {
            fontSize: 16,
            width: "6vw",
            backgroundColor: "red",
        },

        "&.cancel": {
            fontSize: 16,
            width: "6vw",
            backgroundColor: "green",
        }
    },
}));

export const ConfirmDeletePolygon = () => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        eventsState.setZoneAction("")
    };

    const handleDeleteDetectedArea = () => {
        canvasState.deletePolygon(ports.selectedObjects.camera.id, canvasState.currentPolygonNum);

        new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);

        setOpen(false);
        eventsState.setZoneAction("")
    }


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">DELETE AREA</h2>
            <p id="simple-modal-description">
                Are you sure  you want to delete this detection area?
            </p>
            <div className={classes.confirmBtn}>
                <Button
                    className={`${classes.controlBtn} delete`}
                    variant="contained"
                    onClick={handleDeleteDetectedArea}
                >
                    DELETE
                </Button>

                <Button
                    className={`${classes.controlBtn} cancel`}
                    variant="contained"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}