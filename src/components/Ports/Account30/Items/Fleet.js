import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import account from "../../../../store/account";
import {FleetTable} from "../../Account/DataTable/FleetTable";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "70vw",
        marginTop: 10,
        padding: "10px 20px",
        border: "1px solid #ddd",
        borderRadius: 6,
    },

    main: {},

    mainTitle: {
        fontWeight: 500,
        fontSize: "2.5vw",
    },

    mainSubtitle: {
        fontSize: "1.2vw",
    },

    mainText: {},

    content: {
        display: "flex",
        marginTop: 15,
        alignItems: "center",
    },

    avatar: {
        width: "12vw",
        height: "100%",

        minWidth: 150,
        minHeight: 200,
        margin: "0px 10px 0px 0px",
    },

    actions: {
        width: "100%",
    },

    actionItemName: {
        width: "8vw",
        minWidth: 100,
        maxWidth: 200,

        color: "#777",
    },

    actionItemAction: {
        width: "100%",
        color: "#444",
    },
}));

export const Fleet = () => {
    const classes = useStyles();

    const informationBlock = (title, subTitle, content) => (
        <div className={classes.container}>
            <div className={classes.mainTitle}>{title}</div>
            <div className={classes.mainSubtitle}>{subTitle}</div>
            {content()}
        </div>
    );

    const fleetTitle = account.selectedItem;
    const fleetSubtitle = "Some text 4";
    const fleetActionList = () => {
        return (
            <div className={classes.content}>
                <FleetTable/>
            </div>
        )
    };

    return (
        <div>
            {informationBlock(fleetTitle, fleetSubtitle, fleetActionList)}
        </div>
    );
}