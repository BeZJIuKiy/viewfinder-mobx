import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import backgroundImage from "./images/backgroundChanged02.jpg"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    main: {
        width: "100wh",
        height: "100vh",

        display: "flex",

        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        fontFamily: "Roboto",

        position: "relative",
    },

    mainSubstrate: {
        width: "50%",
        height: "100%",

        backgroundColor: "#333",
        opacity: 0.4,

        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
    },

    mainTitle: {
        color: "white",
        fontSize: "7vw",
        fontWeight: 500,
        marginBottom: "8vw",
    },

    mainItem: {
        width: "50%",
        textAlign: "center",

        position: "absolute",
        top: "50%",
        left: "25%",
        transform: "translate(-50%, -70%)",
        zIndex: 2,
    },

    mainForm: {
        display: "flex",
        flexDirection: "column",
        // height: "80%",
        justifyContent: "center",
        alignItems: "center",

        position: "relative",
    },

    mainFormBorderSubstrate: {
        width: "40%",
        height: "100%",
        padding: "10px 30px",
        borderRadius: 5,

        backgroundColor: "#555",
        opacity: 0.7,

        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: -1,

        transform: "translate(-50%, -50%)",
    },

    mainFormBorder: {
        width: "40%",

        // backgroundColor: "#444",
        // opacity: 0.7,

        // borderRadius: 5,
        color: "white",

        padding: "10px 30px",
    },

    mainFormTitle: {
        fontSize: "2.5vw",
        textAlign: "right",
    },

    mainFormText: {
        margin: "10%",
        fontSize: "1.2vw",
    },

    mainFormBtn: {
        marginTop: 10,
    },
}));

export const Auth_2_0 = () => {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <div className={classes.mainSubstrate}></div>
            <div className={classes.mainItem}>
                <div className={classes.mainTitle}>ViewFinder</div>
                <div className={classes.mainForm}>
                    {/*<div className={classes.mainFormBorderSubstrate}></div>*/}
                    <div className={classes.mainFormBorder}>
                        <div className={classes.mainFormTitle}>ViewFinder</div>
                        <div className={classes.mainFormText}>текст текст текст много текста</div>
                        <div className={classes.mainFormBtn}>
                            <Button variant="contained" color="secondary" style={{fontSize: "1.5vw", width: "10vw"}}>
                                DEMO
                            </Button>
                        </div>
                        <div className={classes.mainFormBtn}>
                            <Button variant="contained" color="primary" style={{fontSize: "1.5vw", width: "10vw"}}>
                                Login in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.mainItem}></div>
        </div>
    );
};