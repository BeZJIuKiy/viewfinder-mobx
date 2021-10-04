import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Icon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Divider from "@material-ui/core/Divider";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../store/styles";

const useStyles = makeStyles((theme) => ({
	listItemText: {
		fontFamily: styles.fontFamily,
		fontWeight: 500,
	},
}));

export const DrawerItems = observer(({icon, description, notes, onClick}) => {
	const classes = useStyles();

	return (
		<>
			<ListItem button onClick={onClick}>
				<ListItemIcon>
					<Icon>
						<img src={icon} height={25} width={25} alt=""/>
					</Icon>
				</ListItemIcon>
				<ListItemText classes={{primary: classes.listItemText}} primary={description}/>

				<NavLink to="/events">
					<IconButton aria-label="show 17 new notifications" color="default">
						<Badge badgeContent={notes} color="secondary">
							<NotificationsIcon/>
						</Badge>
					</IconButton>
				</NavLink>
			</ListItem>
			<Divider/>
		</>
	)
});