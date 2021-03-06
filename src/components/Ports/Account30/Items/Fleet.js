import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import account, {FLEET} from "../../../../store/account";
import {AccountTable} from "./AccountTable";
import {useWindowDimensions} from "../../../../useHooks/useWindowDimensions";
import {AccordionFromTable} from "./Accordion";
import {Grid} from "@material-ui/core";
import {FleetCard} from "../../NewAccount/Items/FleetCard";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "20px 0",
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderRadius: 10,
    },

    mainContainer: {
        width: "100%",
        height: "calc(100% - 40px)",

        margin: "20px 0",

        position: "relative",

        "@media(max-width: 425px)": {
            minWidth: 0,
            margin: 0,
        },
    },
    substrate: {
        position: "absolute",

        width: "100%",
        height: "100%",

        top: "50%",
        left: "50%",
        zIndex: -1,
        transform: "translate(-50%, -50%)",

        backgroundColor: "#ddd",
        borderRadius: 10,
        opacity: 0.7,
    },
    personalData: {
        display: "flex",
        flexGrow: 1,
    },
    personalDataItem: {
        flexDirection: "column",
        flexGrow: 1,
    },
    personalDataContent: {
        // height: "calc(100% - 20px)",

        margin: "20px 20px 20px 20px",
        padding: "10px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,

        textAlign: "center",

        "@media(max-width: 425px)": {
            padding: 10,
            margin: 20,
        },
    },

    mainTitle: {
        fontWeight: 500,
        fontSize: "1.5vw",

        "@media(max-width: 425px)": {
            fontSize: "8vw",
        },
    },
    mainSubtitle: {
        fontSize: "1.0vw",
    },
    mainText: {},
    content: {
        display: "flex",
        flexDirection: "column",
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
        width: "10vw",
        minWidth: 100,
        maxWidth: 200,

        color: "#777",
    },
    actionItemAction: {
        width: "100%",
        color: "#444",
    },
    fastPay: {
        width: "20%",

        display: "flex",
        justifyContent: "space-around",
    },
    btn: {
        width: "5vw",
    },
}));

export const Fleet = () => {
    const classes = useStyles();

    const informationBlock = (workClass, title, subTitle, content) => (
        <div className={`${workClass}`}>
            <div className={classes.mainTitle}>{title}</div>
            <div className={classes.mainSubtitle}>{subTitle}</div>
            {content()}
        </div>
    );

    const fleetTitle = FLEET;
    const fleetSubtitle = "";
    const allFleetFull = () => {
        return account.myFleet.map((vessel) => ({
                id: vessel.id,
                "IMO": vessel.imo,
                "Name": vessel.name,
                "Vessel Type Generic": vessel.vesselTypeGeneric,
                "Vessel Type Detailed": vessel.vesselTypeDetailed,
                "Status": vessel.status,
                "MMSI": vessel.mmsi,
                "Call Sign": vessel.callSign,
                "Flag": vessel.flag,
                "Year Built": vessel.yearBuilt
            })
        )
    };
    // const fleetSubtitle = "Here you can change information of your fleet";
    // const fleetActionList = () => {
    //     return (
    //         <div className={classes.content}>
    //             {width <= 425
    //                 ? <AccordionFromTable tableData={allFleetFull()} header={"IMO"}/>
    //                 : <AccountTable secretTitle={"Fleet: full Fleet"} rowsData={allFleetFull()} search={`IMO`}
    //                                 searchLabel={`Fleet IMO`}/>}
    //         </div>
    //     )
    // };

    const fleetActionList = (ship) => {
        return (
            <div className={classes.content}>
                <FleetCard/>
            </div>
        )
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.personalData}>
                <div className={classes.personalDataItem}>
                    {/*{informationBlock(classes.personalDataContent, fleetTitle, fleetSubtitle, fleetActionList)}*/}
                    <Grid container>
                        {account.myFleet.map((ship) => {
                            return (
                                <Grid item>
                                    {fleetActionList(ship)}
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
            <div className={classes.substrate}/>
        </div>
    );
}