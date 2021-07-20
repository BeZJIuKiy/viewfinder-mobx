import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import account from "../../../../store/account";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

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

export const PersonalInformation = () => {
    const classes = useStyles();
    const {avatar, firstName, secondName, dateOfBirth, sex, company, status} = account.personalInformation;
    const {phone, email} = account.contactInformation;

    const personalInformationBlock = (title, subTitle, content) => (
        <div className={classes.container}>
            <div className={classes.mainTitle}>{title}</div>
            <div className={classes.mainSubtitle}>{subTitle}</div>
            {content()}
        </div>
    );

    const personalTitle = account.selectedItem;
    const personalSubtitle = "Some text";
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
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Date Of Birth"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${dateOfBirth}`}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Sex"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${sex}`}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Company"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${company}`}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Account status"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${status}`}/>
                        </ListItem>
                        <Divider/>
                    </List>
                </div>
            </div>
        )
    };

    const contactTitle = "Contact Information";
    const contactSubtitle = "Some text 2";
    const contactInformationActionList = () => {
        return (
            <div className={classes.content}>
                <div className={classes.actions}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Divider/>
                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Phone"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${phone}`}/>
                        </ListItem>

                        <Divider/>

                        <ListItem button>
                            <ListItemText className={classes.actionItemName} primary={"Email"}/>
                            <ListItemText className={classes.actionItemAction} primary={`${email}`}/>
                        </ListItem>
                        <Divider/>
                    </List>
                </div>
            </div>
        )
    };

    return (
        <div>
            {personalInformationBlock(personalTitle, personalSubtitle, personalInformationActionList)}
            {personalInformationBlock(contactTitle, contactSubtitle, contactInformationActionList)}
        </div>
    );
}