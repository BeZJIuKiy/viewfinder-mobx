import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import account, {DEVICES, FLEET, PERSONAL_INFORMATION} from "../../../../store/account";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Badge from "@material-ui/core/Badge";
import {NavLink} from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {FleetTable} from "../../Account/DataTable/FleetTable";
import {DevicesTable} from "../../Account/DataTable/DevicesTable";
import {SmallDevicesTable20} from "../../Account/DataTable/SmallFleetTable20";
import {Search} from "./Search";
import {AccountTable} from "./AccountTable";
import {useWindowDimensions} from "../../../../useHooks/useWindowDimensions";
import {AccordionFromTable} from "./Accordion";

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
    const {width} = useWindowDimensions();

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
    const fleetActionList = () => {
        return (
            <div className={classes.content}>

                {width <= 425
                    ? <AccordionFromTable tableData={allFleetFull()} header={"IMO"}/>
                    : <AccountTable secretTitle={"Fleet: full Fleet"} rowsData={allFleetFull()} search={`IMO`} searchLabel={`Fleet IMO`}/>}
            </div>
        )
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.personalData}>
                <div className={classes.personalDataItem}>
                    {informationBlock(classes.personalDataContent, fleetTitle, fleetSubtitle, fleetActionList)}
                </div>
            </div>
            <div className={classes.substrate}/>
        </div>
    );
}