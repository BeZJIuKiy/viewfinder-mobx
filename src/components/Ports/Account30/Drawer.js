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
        width: '20vw',
        minWidth: 170,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
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
                    <ListItem button
                              onClick={() => handleSelectItem(i)}
                              selected={i === account.selectedItemIndex}
                    >
                        <ListItemIcon>
                            <Icon>
                                {icon}
                            </Icon>
                        </ListItemIcon>

                        <ListItemText primary={title}/>
                    </ListItem>
                </List>
                <Divider/>
            </div>
        )
    });

    return (
        <div className={classes.root}>
            {drawerItems}
        </div>
    );
})