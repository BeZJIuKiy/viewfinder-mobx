import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {observer} from "mobx-react-lite";
import account from "../../../store/account";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Drawer = observer(() => {
    const classes = useStyles();

    const handleSelectItem = (index) => {
        account.setSelectedItem(index);
    }

    const drawerItems = account.drawerItems.map((item, i) => {
        return (
            <div key={item}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button
                              onClick={() => handleSelectItem(i)}
                    >
                        <ListItemText primary={item}/>
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