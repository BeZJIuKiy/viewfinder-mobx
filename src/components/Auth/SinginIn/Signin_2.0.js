import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import backgroundImage from "../images/backgroundNew.jpg"
import backgroundImage425px from "../images/background320px.jpg"
import {SigninForm} from "./SigninForm";
import {ContactUs} from "../ContactUs";

const useStyles = makeStyles((theme) => {
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    return ({
        main: {
            width: "100wh",
            height: scrollHeight,

            display: "flex",

            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

            // fontFamily: "Roboto",

            position: "relative",

            "@media(max-width: 425px)": {
                backgroundImage: `url(${backgroundImage425px})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }
        },
        mainSubstrateLeft: {
            width: "50%",
            height: "100%",

            backgroundColor: "#333",
            opacity: 0.7,

            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,

            "@media(max-width: 425px)": {
                width: "100%",
            }
        },
        mainSubstrateRight: {
            width: "50%",
            height: "100%",

            backgroundColor: "#333",
            opacity: 0.2,

            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,

            "@media(max-width: 425px)": {
                opacity: 0,
            },
        },
        mainTitle: {
            color: "white",
            fontSize: "4vw",
            fontWeight: 500,
            userSelect: "none",
            // marginBottom: "1vw",
        },
        mainItem: {
            width: "50%",
            textAlign: "center",

            position: "absolute",
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,

            "@media(max-width: 425px)": {
                width: "100%",
                top: "40%",
                left: "50%",
            },
        },
        mainForm: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            position: "relative",
        },
        mainFormBorder: {
            width: "50%",

            color: "white",

            padding: "10px 30px",

            "@media(max-width: 1024px)": {
                width: "80%",
            },

            "@media(max-width: 768px)": {
                width: "100%",
            },

            "@media(max-width: 425px)": {
                width: "100%",
            },
        },
        mainFormTitle: {
            fontSize: "2.5vw",
            textAlign: "left",
        },
        mainFormText: {
            marginBottom: "6%",
            fontSize: "1.2vw",
        },
        mainFormBtn: {
            marginTop: 10,
            display: "flex",
            justifyContent: "space-around",
        },
    })
});

export const Signin_2_0 = () => {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <div className={classes.mainSubstrateLeft}></div>
            <ContactUs />
            <div className={classes.mainItem}>
                <div className={classes.mainForm}>
                    <div className={classes.mainFormBorder}>
                        <SigninForm />
                    </div>
                </div>
            </div>

            <div className={classes.mainSubstrateRight}></div>
            <div className={classes.mainItem}></div>
        </div>
    );
};