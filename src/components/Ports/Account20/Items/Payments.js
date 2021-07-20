import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "80vw",
        marginTop: 10,
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 6,
    },

    main: {

    },

    mainTitle: {

    },

    mainText: {

    },


}));

export const Payments = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.container}>
                Payments
            </div>
        </div>
    );
};