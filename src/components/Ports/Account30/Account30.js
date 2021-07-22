import React from 'react';
import {Header} from "../Header/Header";
import {Drawer} from "./Drawer";
import {observer} from "mobx-react-lite";
import account, {DEVICES, FLEET, PAYMENTS, PERSONAL_INFORMATION} from "../../../store/account";
import {makeStyles} from "@material-ui/core/styles";
import {PersonalInformation} from "./Items/PersonalInformation";
import {Devices} from "./Items/Devices";
import {Fleet} from "./Items/Fleet";
import {Payments} from "./Items/Payments";
import {PersonalInformation20} from "./Items/PersonalInformation20";

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
        // margin: "0 auto",
        marginRight: "auto",
        // height: "calc(100vh - 65px)",
        display: "flex",
        // justifyContent: "center",
    },
}));

export const Account30 = observer(() => {
    const classes = useStyles();

    const {selectedItem} = account;
    if (!!!selectedItem) account.setSelectedItem(0);

    const components = () => {
        switch (selectedItem) {
            case PERSONAL_INFORMATION: {
                return <PersonalInformation20/>;
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