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
import styles from "../../../store/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "15vw",
		minWidth: 170,
		maxWidth: 300,

		marginTop: "8vw",
		marginLeft: "10vh",

		backgroundColor: theme.palette.background.paper,
	},

	active: {
		fontFamily: styles.fontFamily,
		fontWeight: 500,

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
			<ListItem
				key={`drawerItems-${title}`}
				className={`${classes.active} ${i === account.selectedItemIndex ? "isActive" : "noActive"}`}
				button
				onClick={() => handleSelectItem(i)}
			>
				<ListItemIcon>
					<Icon>
						{icon}
					</Icon>
				</ListItemIcon>

				<ListItemText classes={{primary: classes.active}}  primary={title} />
			</ListItem>
		)
	});

	return (
		<div className={classes.root}>
			<List component="nav" aria-label="main mailbox folders">
				{drawerItems}
			</List>
		</div>
	);
})