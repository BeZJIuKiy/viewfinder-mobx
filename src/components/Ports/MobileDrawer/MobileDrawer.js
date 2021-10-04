import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import {observer} from "mobx-react-lite";
import styles from "../../../store/styles";

const useStyles = makeStyles({
	list: {
		width: styles.drawerWidth,
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
	search: {
		"&.show": {
			width: "100%",

			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			marginBottom: 10,
		},

		"&.hide": {
			display: "none",
		},
	}
});

export const MobileDrawer = observer(({drawer}) => {
	const classes = useStyles();

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;

		setState({...state, [anchor]: open});
	};
	const anchor = 'right';

	return (
		<React.Fragment key={anchor}>
			<Button onClick={toggleDrawer(anchor, true)}>
				<ListItemIcon><MenuIcon className={classes.menuIcon}/></ListItemIcon>
			</Button>
			<Drawer
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
				classes={{
					paper: drawer?.style,
				}}
			>
				<div
					className={clsx(classes.list, {
						[classes.fullList]: anchor === 'top' || anchor === 'bottom',
					})}
					role="presentation"
					// onClick={toggleDrawer(anchor, false)}
					// onKeyDown={toggleDrawer(anchor, false)}
				>
					{drawer?.component}
				</div>
			</Drawer>
		</React.Fragment>
	);
})