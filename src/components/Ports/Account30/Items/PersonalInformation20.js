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

const useStyles = makeStyles((theme) => ({
    container: {
        // width: "38.2vw",
        margin: "20px 0",
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderRadius: 30,
    },

    mainContainer: {
        height: "calc(100% - 20px)",

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
    personalDataContentLeft: {
        height: "calc(100% - 20px)",

        margin: "20px 10px 20px 20px",
        padding: "10px 40px",
        backgroundColor: "#fff",
        borderRadius: 30,

        textAlign: "center",
    },
    personalDataContentRight: {
        margin: "20px 20px 0px 10px",
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
    }
}));

export const PersonalInformation20 = () => {
    const classes = useStyles();
    const {avatar, firstName, secondName, dateOfBirth, sex, company, status} = account.personalInformation;
    const {phone, email} = account.contactInformation;

    const informationBlock = (workClass, title, subTitle, content) => (
        <div className={`${workClass}`}>
            <div className={classes.mainTitle}>{title}</div>
            <div className={classes.mainSubtitle}>{subTitle}</div>
            {content()}
        </div>
    );

    const personalTitle = PERSONAL_INFORMATION;
    const personalSubtitle = "Here you can change personal information";
    const personalInformationActionList = () => {
        return (
            <div className={classes.content}>
                <img className={classes.avatar} src={avatar} alt="123"/>

                <div className={classes.actions}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Divider/>
                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Name"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${firstName} ${secondName}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>

                        <Divider/>

                        {/*<ListItem button>*/}
                        {/*    <ListItemText className={classes.actionItemName} primary={"Date Of Birth"}/>*/}
                        {/*    <ListItemText className={classes.actionItemAction} primary={`${dateOfBirth}`}/>*/}
                        {/*    <ArrowForwardIosIcon color={"action"}/>*/}
                        {/*</ListItem>*/}

                        {/*<Divider/>*/}

                        {/*<ListItem button>*/}
                        {/*    <ListItemText className={classes.actionItemName} primary={"Sex"}/>*/}
                        {/*    <ListItemText className={classes.actionItemAction} primary={`${sex}`}/>*/}
                        {/*    <ArrowForwardIosIcon color={"action"}/>*/}
                        {/*</ListItem>*/}

                        {/*<Divider/>*/}

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Company"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${company}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Account status"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${status}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>

                        <Divider/>

                        {/*{lastPayments()}*/}

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Phone"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${phone}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Email"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${email}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Fast pay"}/>
                            {fastPay()}
                        </ListItem>

                        <Divider/>
                    </List>
                </div>
            </div>
        )
    };

    const lastPayments = () => {
        const lastPays = [];
        for (let i = account.payHistory.length - 1; i > account.payHistory.length - 4; --i) {
            lastPays.push(account.payHistory[i]);
        }

        return lastPays.map((pay) => (
            <div>
                <ListItem button>
                    <ListItemText className={classes.actionItemName} primary={"Last payment"}/>
                    <ListItemText className={classes.actionItemAction} primary={`${pay.date} ${pay.price}`}/>
                    <ArrowForwardIosIcon color={"action"}/>
                </ListItem>
                <Divider/>
            </div>
        ));
    }
    const fastPay = () => {
        const lastPays = [];
        for (let i = account.payHistory.length - 1; i > account.payHistory.length - 4; --i) {
            lastPays.push(account.payHistory[i]);
        }

        return lastPays.map(pay => (
            <div className={classes.fastPay}>
                <Button className={classes.btn} variant="contained" color="primary">
                    {`$${pay.price}`}
                </Button>
            </div>
        ))
    }

    const contactTitle = "Contact Information";
    const contactSubtitle = "More detailed description";
    const contactInformationActionList = () => {
        return (
            <div className={classes.content}>
                <div className={classes.actions}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Divider/>
                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Phone"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${phone}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Email"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${email}`}/>
                            <ArrowForwardIosIcon color={"action"}/>
                        </ListItem>
                        <Divider/>
                    </List>
                </div>
            </div>
        )
    };

    const devicesTitle = DEVICES;
    const devicesSubtitle = "";
    const devicesActionList = () => {
        return (
            <div className={classes.content}>
                <DevicesTable/>
            </div>
        )
    };

    const fleetTitle = FLEET;
    const fleetSubtitle = "";
    // const fleetSubtitle = "Here you can change information of your fleet";
    const fleetActionList = () => {
        return (
            <div className={classes.content}>
                <SmallDevicesTable20/>
            </div>
        )
    };

    // if(devicePixelRatio) alert(devicePixelRatio);
    // else alert(outerWidth/innerWidth*100);


    return (
        <div className={classes.mainContainer}>
            <div className={classes.personalData}>
                <div className={classes.personalDataItem}>
                    {informationBlock(classes.personalDataContentLeft, personalTitle, personalSubtitle, personalInformationActionList)}
                </div>
                <div className={classes.personalDataItem}>
                    {informationBlock(classes.personalDataContentRight, devicesTitle, devicesSubtitle, devicesActionList)}
                    {informationBlock(classes.personalDataContentRight, fleetTitle, fleetSubtitle, fleetActionList)}
                </div>
            </div>
            <div className={classes.substrate}/>
        </div>
    );
}