import React from 'react';
import {Header} from "../Header/Header";
import {Drawer} from "./Drawer";
import {observer} from "mobx-react-lite";
import account, {DEVICES, FLEET, PAYMENTS, PERSONAL_INFORMATION} from "../../../store/account";
import {makeStyles} from "@material-ui/core/styles";
import {Devices} from "./Items/Devices";
import {Fleet} from "./Items/Fleet";
import {Payments} from "./Items/Payments";
import {PersonalInformation} from "./Items/PersonalInformation";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex",
        flexDirection: "column",
    },

    content: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },

    component: {
        width: "70vw",
        marginRight: "auto",
        display: "flex",
    },
}));

export const Account30 = observer(() => {
    const classes = useStyles();

    const {selectedItem} = account;

    const components = () => {
        switch (selectedItem) {
            case PERSONAL_INFORMATION: {
                return <PersonalInformation/>;
            }
            case DEVICES: {
                return <Devices/>;
            }
            case FLEET: {
                return <Fleet/>;
            }
            case PAYMENTS: {
                return <Payments/>;
            }
        }
    }

    if (!!!selectedItem) account.setSelectedItem(0);

    return (
        <div className={classes.main}>
            <Header/>

            <div className={classes.content}>
                <Drawer/>
                <div className={classes.component}>
                    {components()}
                </div>
            </div>
        </div>
    );
});