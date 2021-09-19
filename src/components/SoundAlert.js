import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import connects from "../store/connects";

const useStyles = makeStyles((theme) => ({
    soundAlert: {
        display: "flex",
        justifyContent: "center",

        overflow: "hidden",

        position: "absolute",
        top: 0,

        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 50000,

        "&.show": {
            display: "flex",

            "&.critical": {
                background: "rgba(255, 51, 51, 0.5)",
            },
            "&.warning": {
                background: "rgba(51, 255, 51, 0.5)",
            },
            "&.text": {
                background: "rgba(51, 51, 255, 0.5)",
            },
        },

        "&.hide": {
            display: "none",
        },
    },

    message: {
        fontSize: 42,
        color: "#e5e5e5",
        marginTop: theme.spacing(10),
    },
}));

export const SoundAlert = observer(() => {
    const classes = useStyles();

    const [isVisible, setVisible] = useState(false);
    const [message, setMessage] = useState(<div className={`${classes.soundAlert} ${isVisible ? "show" : "hide"}`}/>);

    useEffect(() => {
        if (connects.wsSound.onopen === null) return;

        setVisible(true);
    }, [connects.wsSound.onmessage]);
    useEffect(() => {
        if (connects.wsSound.onopen === null) return;
        const message = connects.wsSound.onmessage.data;
        // const message = "critical";
        setMessage(recognitionMessage(message));
    }, [isVisible]);

    const recognitionMessage = (message) => {
        switch (message) {
            case "critical": {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} ${message}`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{message}</div>
                    </div>
                )
            }
            case "warning": {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} ${message}`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{message}</div>
                    </div>
                )
            }
            case "text": {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} ${message}`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{message}</div>
                    </div>
                )
            }
        }
    }
    const handleClose = () => {
        setVisible(false);
    }

    return (
        <>
            {message}
        </>
    );
});