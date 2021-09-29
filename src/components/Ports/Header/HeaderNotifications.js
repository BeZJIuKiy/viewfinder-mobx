import React, {useEffect, useState} from 'react';
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
import {observer} from "mobx-react-lite";
import styles from "../../../store/styles";
import {Typography} from "@material-ui/core";
import {useHexToRgba} from "../../../useHooks/useHexToRgba";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		maxHeight: 680,

		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',

		fontFamily: styles.fontFamily,

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

	icon: {
		fontSize: 28,
	},
	list: {
		backgroundColor: theme.palette.background.paper,
	},
	listItemTextPrimary: {
		fontFamily: styles.fontFamily,
		fontWeight: 500,
	},

	listSubheader: {
		fontFamily: styles.fontFamily,
	},

	header: {
		padding: theme.spacing(2),
	},
	title: {
		fontSize: 18,
		fontWeight: 600,
		color: "#444",
	},
	subTitle: {
		fontSize: 14,
		fontWeight: 400,
		color: "#666",
	},
	btnCorrectPosition: {
		display: "flex",
		justifyContent: "center",
	},
	btn: {
		width: 140,
		marginTop: theme.spacing(1),

		fontFamily: styles.fontFamily,

		color: "#ddd",
		fontWeight: 700,
		background: useHexToRgba("#444", 0.8),
		transform: "color 0.2",

		"&:hover": {
			color: "#fff",
			background: useHexToRgba("#222", 0.8),
		},
	}
}))

export const HeaderNotifications = observer(() => {
	const classes = useStyles();

	const {data} = ports;

	const [anchorEl, setAnchorEl] = React.useState(null);

	// useEffect(() => {
	// 	console.log("useEffect")
	// 	header.checkNewNotifications();
	// }, [ports.selectedObjects.camera.events]);
	// }, [ports.data[0].cameras[0].events.length]);

	const notificationList = () => {
		return (
			<div>
				<div className={classes.header}>
					<div className={`${classes.title}`}>Notifications</div>
					<div className={`${classes.subTitle}`}>You have <b>{header.allNewNote}</b> unread messages</div>
				</div>

				<Divider/>

				<List className={classes.list} subheader={<li/>}>
					{data.map(({id, city, cameras}) => {
						return (
							<li key={`section-${id}`} className={classes.listSection}>
								<ul className={classes.ul}>
									<Divider/>
									<ListSubheader className={classes.listSubheader}>{`Port in ${city}`}</ListSubheader>
									<Divider/>
									{cameras.map((camera) =>
										camera.events.filter((event) => event.newEvent)
											.map((event) => {
												return (
													<ListItem
														key={`item-${id}-${camera.id}-${event.id}`}
														className={`${classes.item} ${event.typeError.toLowerCase()}`}
													>
														<NavLink
															className={`${classes.navLink} ${event.typeError.toLowerCase()}`}
															to={"/events"}>
															<ListItemText
																classes={{primary: classes.listItemTextPrimary}}
																primary={`${event.date} ${camera.description}`}
																onClick={() => handleSelectItem(id, camera.id, event.id)}/>
														</NavLink>
													</ListItem>
												)
											})
									)}
									<Divider/>

									<span className={classes.btnCorrectPosition}>
										<Button className={classes.btn} variant={"contained"}>View All</Button>
									</span>
								</ul>
							</li>
						)
					})}
				</List>
			</div>
		)
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSelectItem = (portId, cameraId, eventId) => {
		ports.setSelectedPort(portId);
		ports.setSelectedCamera(cameraId);

		ports.setIsNewNotif(eventId, false);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<span>
			<IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
				<Badge badgeContent={header.allNewNote} color="secondary">
					<NotificationsIcon className={classes.icon}/>
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
});