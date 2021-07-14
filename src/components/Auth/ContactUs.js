import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    contactUs: {
        display: "flex",

        position: "absolute",
        top: 0,
        left: "50%",
        zIndex: 3,

        transform: "translate(-100%, 10%)",
    },

    icons: {
        fontSize: "2vw",
        transition: "color 0.2s, background-color 0.2s",
        margin: theme.spacing(0.5),

        "&.telegram": {
            color: "white",
            borderRadius: "50%",
            backgroundColor: "#0088dd",
            paddingRight: "5%",

            "&:hover": {
                color: "#0088dd",
                backgroundColor: "white",
            },
        },

        "&.phone": {
            color: "white",
            borderRadius: "50%",
            backgroundColor: "#0d7c04",
            padding: 5,

            "&:hover": {
                color: "#0d7c04",
                backgroundColor: "white",
            },
        },

        "&.email": {
            color: "white",
            borderRadius: "50%",
            backgroundColor: "#d33738",
            padding: 5,

            "&:hover": {
                color: "#d33738",
                backgroundColor: "white",
            },
        },
    }
}))

export const ContactUs = () => {
    const classes = useStyles();

    return (
        <div className={classes.contactUs}>
            <a href="tel:+71112223344">
                <LocalPhoneIcon className={`${classes.icons} phone`}/>
            </a>

            <a href="mailto:servise.soft@somemail.com" target="_blanc">
                <EmailIcon className={`${classes.icons} email`}/>
            </a>

            <a href="https://t.me/BeZJIuKiy" target="_blanc">
                <TelegramIcon className={`${classes.icons} telegram`}/>
            </a>
        </div>
    )
}