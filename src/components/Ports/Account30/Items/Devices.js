// import React from 'react';
// import {makeStyles} from "@material-ui/core/styles";
// import account from "../../../../store/account";
// import {DevicesTable} from "../../Account/DataTable/DevicesTable";
//
// const useStyles = makeStyles((theme) => ({
//     container: {
//         width: "70vw",
//         marginTop: 10,
//         padding: "10px 20px",
//         border: "1px solid #ddd",
//         borderRadius: 6,
//     },
//
//     main: {},
//
//     mainTitle: {
//         fontWeight: 500,
//         fontSize: "2.5vw",
//     },
//
//     mainSubtitle: {
//         fontSize: "1.2vw",
//     },
//
//     mainText: {},
//
//     content: {
//         display: "flex",
//         marginTop: 15,
//         alignItems: "center",
//     },
//
//     avatar: {
//         width: "12vw",
//         height: "100%",
//
//         minWidth: 150,
//         minHeight: 200,
//         margin: "0px 10px 0px 0px",
//     },
//
//     actions: {
//         width: "100%",
//     },
//
//     actionItemName: {
//         width: "8vw",
//         minWidth: 100,
//         maxWidth: 200,
//
//         color: "#777",
//     },
//
//     actionItemAction: {
//         width: "100%",
//         color: "#444",
//     },
// }));
//
// export const Devices = () => {
//     const classes = useStyles();
//
//     const informationBlock = (title, subTitle, content) => (
//         <div className={classes.container}>
//             <div className={classes.mainTitle}>{title}</div>
//             <div className={classes.mainSubtitle}>{subTitle}</div>
//             {content()}
//         </div>
//     );
//
//     const devicesTitle = account.selectedItem;
//     const devicesSubtitle = "Some text 3";
//     const devicesActionList = () => {
//         return (
//             <div className={classes.content}>
//                 <DevicesTable/>
//             </div>
//         )
//     };
//
//     return (
//         <div>
//             {informationBlock(devicesTitle, devicesSubtitle, devicesActionList)}
//         </div>
//     );
// }
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
import ports from "../../../../store/ports";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "20px 0",
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderRadius: 30,
    },

    mainContainer: {
        width: "100%",
        height: "calc(100% - 40px)",

        margin: "20px 0",
        position: "relative",
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
        borderRadius: 30,
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
        borderRadius: 30,

        textAlign: "center",
    },

    mainTitle: {
        fontWeight: 500,
        fontSize: "1.5vw",
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

export const Devices = () => {
    const classes = useStyles();

    const informationBlock = (workClass, title, subTitle, content) => (
        <div className={`${workClass}`}>
            <div className={classes.mainTitle}>{title}</div>
            <div className={classes.mainSubtitle}>{subTitle}</div>
            {content()}
        </div>
    );

    const devicesTitle = DEVICES;
    const devicesSubtitle = "";
    const allDevicesFull = () => {
        const devices = [];
        ports.data.forEach(({cameras}) => {
            cameras.forEach(camera => {
                devices.push({
                    id: camera.id,
                    "Country": camera.country,
                    "City": camera.city,
                    "Camera Name": camera.description,
                    "Type": camera.type,
                    "PTZ/STATIC": camera.move,
                    "Viewing Angle": camera.viewingAngle,
                    "Coordinates": `${camera.coordinates[0]}°, ${camera.coordinates[1]}°`
                });
            })
        })

        return devices;
    };
    const devicesActionList = () => {
        return (
            <div className={classes.content}>
                <AccountTable secretTitle={"Devices: full Devices"} rowsData={allDevicesFull()} search={"Camera Name"} searchLabel={"Devices Name"}/>
            </div>
        )
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.personalData}>
                <div className={classes.personalDataItem}>
                    {informationBlock(classes.personalDataContent, devicesTitle, devicesSubtitle, devicesActionList)}
                </div>
            </div>
            <div className={classes.substrate}/>
        </div>
    );
}