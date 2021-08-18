import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import account from "../../../store/account";
import {Icon} from "@material-ui/core";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	menuIcon: {
		fontSize: 32,
		fill: "#fff",
	},
	active: {
		"&.isActive": {
			color: "#333",
		},

		"&.noActive": {
			color: "#aaa",
		}
	},
});

export const MobileDrawer = () => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({...state, [anchor]: open});
	};

	const handleSelectItem = (index) => {
		account.setSelectedItem(index);
	}

	const drawerItems = (anchor) => account.drawerItems.map(({id, icon, title}, i) => {
		return (
			<div
				className={clsx(classes.list, {
					[classes.fullList]: anchor === 'top' || anchor === 'bottom',
				})}
				role="presentation"
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
			>
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

	const anchor = 'left';

	return (
			<React.Fragment key={anchor}>
				<Button onClick={toggleDrawer(anchor, true)}>
					<ListItemIcon><MenuIcon className={classes.menuIcon}/></ListItemIcon>
				</Button>
				<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
					{drawerItems(anchor)}
				</Drawer>
			</React.Fragment>
	);
}