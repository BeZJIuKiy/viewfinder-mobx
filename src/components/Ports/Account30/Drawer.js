import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {observer} from "mobx-react-lite";
import account from "../../../store/account";
import {Icon} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "14vw",
        minWidth: 170,
        maxWidth: 300,

        marginTop: "8vh",

        backgroundColor: theme.palette.background.paper,
    },

    active: {
        "&.isActive": {
            color: "#333",
        },

        "&.noActive": {
            color: "#aaa",
        }
    },
}));

export const Drawer = observer(() => {
    const classes = useStyles();

    const handleSelectItem = (index) => {
        account.setSelectedItem(index);
    }

    const drawerItems = account.drawerItems.map(({id, icon, title}, i) => {
        return (
            <div key={title}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem
                        className={`${classes.active} ${i === account.selectedItemIndex ? "isActive" : "noActive"}`}
                        button
                        onClick={() => handleSelectItem(i)}
                    >
                        <ListItemIcon>
                            <Icon>
                                {icon}
                            </Icon>
                        </ListItemIcon>

                        <ListItemText

                            primary={title}
                        />
                    </ListItem>
                </List>
            </div>
        )
    });

    return (
        <div className={classes.root}>
            {drawerItems}
        </div>
    );
})