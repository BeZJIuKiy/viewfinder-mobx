import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import account from "../../../../store/account";
import {AccountTable} from "../../Account30/Items/AccountTable";
import React, {useEffect, useState} from "react";
import {FleetCard} from "./FleetCard";
import {Grid, IconButton} from "@material-ui/core";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


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

    addImgBox: {
        width: 310,
        height: 398,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 5,

        color: "#bbb",
        margin: theme.spacing(1),

        transition: "box-shadow 0.1s, background-color 0.3s, color 0.3s",

        "&:hover": {
            color: "#888",
            backgroundColor: "#e5e5e5",
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
    },

    addImg: {
        fontSize: 108,
        margin: 0,
        padding: 0,
    }
}))
export const MyFleet = observer(() => {
    const classes = useStyles();

    const [isAddNewShip, setAddNewShip] = useState(false);

    const handleClick = (e) => {
        setAddNewShip(true);
    };

    const shipTemplate = {
        ...account.templateShipData,
        fromEvent: {...account.templateShipData.fromEvent},
    }

    const handleCloseCard = () => {
        setAddNewShip(false);
    }

    return (
        <div className={classes.smallTable}>
            <div className={classes.title}>Fleet</div>
            <Grid container className={classes.gridContainer} spacing={2} justify={"center"}>
                {account.myFleet.map((ship, index) =>
                    <Grid key={`MyFleet-${index}`} item>
                        <FleetCard ship={ship}/>
                    </Grid>
                )}

                {isAddNewShip
                    ? (
                        <div style={{paddingTop: 8, paddingLeft: 8,}}>
                            <FleetCard
                                ship={shipTemplate}
                                isEdit={true}
                                isDown={true}
                                closeCard={() => handleCloseCard()}
                            />
                        </div>
                    )
                    : (
                        <IconButton
                            className={classes.addImgBox}
                            onClick={handleClick}
                        >
                            <AddCircleOutlineIcon className={classes.addImg}/>
                        </IconButton>
                    )
                }
            </Grid>
        </div>
    )
})