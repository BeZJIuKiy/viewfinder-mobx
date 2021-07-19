import React from 'react';
import {Header} from "../Header/Header";
import {Drawer} from "./Drawer";
import {observer} from "mobx-react-lite";
import account from "../../../store/account";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex",
        flexDirection: "column"
    },

    content: {
        display: "flex",
        flexDirection: "row"
    }
}));

export const Account20 = observer(() => {
    const classes = useStyles();

    const {selectedItem} = account;

    const components = () => {
        switch (selectedItem) {
            case "Person information": {
                return selectedItem;
            }
            case "Devices": {
                return selectedItem;
            }
            case "Fleet": {
                return selectedItem;
            }
            case "Payments": {
                return selectedItem;
            }
        }
    }

    return (
        <div className={classes.main}>
            <Header />

            <div className={classes.content}>
                <Drawer />
                {components()}
            </div>
        </div>
    );
});