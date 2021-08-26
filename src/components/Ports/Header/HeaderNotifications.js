import React from 'react';
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import EmailIcon from "@material-ui/icons/Email";
import TelegramIcon from "@material-ui/icons/Telegram";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {NavLink} from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import header from "../../../store/header";
import ports from "../../../store/ports";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 300,

		"@media(max-width: 425px)": {
			maxWidth: "90%",
		},

		"@media(max-width: 320px)": {
			maxWidth: 288,
		},
	},
	listSection: {
		backgroundColor: 'inherit',
	},
	ul: {
		backgroundColor: 'inherit',
		padding: 0,
	},

	item: {
		transition: "background-color 0.2s",

		"&.critical": {
			backgroundColor: "#ee8989",

			"&:hover": {
				backgroundColor: "#d32f2f"
			},
		},

		"&.warning": {
			backgroundColor: "#facc88",

			"&:hover": {
				backgroundColor: "#ffb74d"
			},
		},

		"&:hover": {
			backgroundColor: "#e5e5e5"
		},
	},
	navLink: {
		color: "#444",
		textDecoration: "none",

		"&.critical": {
			color: "#fff",
		},
	},
}))

export const HeaderNotifications = () => {
	const classes = useStyles();

	const {data} = ports;
	const {allNewNote} = header;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const notificationList = () => {
		return (
			<List className={classes.root} subheader={<li/>}>
				{data.map(({id, city, cameras}, portIndex) => {
					return (
						<li key={`section-${id}`} className={classes.listSection}>
							<ul className={classes.ul}>
								<Divider/>
								<ListSubheader>{`Port in ${city}`}</ListSubheader>
								<Divider/>
								{cameras.map((camera, cameraIndex) =>
									camera.events.filter((event) => event.newEvent)
										.map((event) => {
											return (
												<ListItem
													key={`item-${id}-${camera.id}-${event.id}`}
													className={`${classes.item} ${event.typeError.toLowerCase()}`}
												>
													<NavLink className={`${classes.navLink} ${event.typeError.toLowerCase()}`} to={"/events"}>
														<ListItemText
															primary={`${event.date} ${event.time} ${camera.description}`}
															onClick={() => handleSelectItem(id, camera.id)}/>
													</NavLink>
												</ListItem>
											)
										})
								)}
							</ul>
						</li>
					)
				})}
			</List>
		)
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSelectItem = (portIndex, cameraIndex) => {
		ports.setSelectedPort(portIndex);
		ports.setSelectedCamera(cameraIndex);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<span>
			<IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
				<Badge badgeContent={allNewNote} color="secondary">
					<NotificationsIcon className='header__icons'/>
				</Badge>
			</IconButton>

			<Popover
				classes={{paper: classes.root}}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				{notificationList()}
			</Popover>
		</span>
	);
};