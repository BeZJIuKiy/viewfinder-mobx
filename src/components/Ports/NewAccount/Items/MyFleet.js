import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import account from "../../../../store/account";
import {AccountTable} from "../../Account30/Items/AccountTable";
import React from "react";
import {FleetCard} from "./FleetCard";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    smallTable: {
        display: "flex",
        flexDirection: "column",
        // flexGrow: 1,
        minHeight: "100%",
    },

    title: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 24,

    },

    gridContainer: {
        margin: 0,
        padding: 0,
    },
}))
export const MyFleet = observer(() => {
    const classes = useStyles();

    return (
        <div className={classes.smallTable}>
            <div className={classes.title}>Fleet</div>
            <Grid container className={classes.gridContainer} spacing={2} justify={"center"}>
                {account.myFleet.map((ship) =>
                    <Grid item>
                        <FleetCard ship={ship}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
})