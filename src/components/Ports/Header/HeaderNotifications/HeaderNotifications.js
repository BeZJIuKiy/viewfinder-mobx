import React from 'react';
import Popover from "@material-ui/core/Popover";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import header from "../../../../store/header";
import ports from "../../../../store/ports";
import Divider from "@material-ui/core/Divider";
import {observer} from "mobx-react-lite";
import styles from "../../../../store/styles";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import {PopoverItem} from "./PopoverItem";

const useStyles = makeStyles((theme) => {
	const colorMain = "#ddd";
	const bgMainTitle = "#4a4a4a";
	// const bgMainTitle = "#696969";

	const colorMainHover = "#eee";
	const bgMainTitleHover = "#2e2e2e";
	// const bgMainTitleHover = "#4e4e4e";

	return({
		root: {
			width: '100%',
			maxWidth: 360,
			maxHeight: 680,

			// backgroundColor: theme.palette.background.paper,
			background: "transparent",
			position: 'relative',
			overflow: 'auto',
			boxShadow: "none",

			borderRadius: 5,

			fontFamily: styles.fontFamily,

			"@media(max-width: 425px)": {
				maxWidth: "90%",
			},

			"@media(max-width: 320px)": {
				maxWidth: 288,
			},

			"&::-webkit-scrollbar": {
				display: "none",
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
			padding: 0,
			// background: "transparent",
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
			background: bgMainTitle,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,
		},
		title: {
			fontSize: 18,
			fontWeight: 600,
			color: colorMain,
		},
		subTitle: {
			fontSize: 14,
			fontWeight: 400,
			color: colorMain,
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
	})
})

export const HeaderNotifications = observer(() => {
	const classes = useStyles();

	const {data} = ports;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
				<div className={classes.header}>
					<div className={`${classes.title}`}>Notifications</div>
					<div className={`${classes.subTitle}`}>You have <b>{header.allNewNote}</b> unread messages</div>
				</div>

				<List className={classes.list} subheader={<li/>}>
					{data.map(({id, city, cameras}, index) => <PopoverItem key={`Popover--Item--${id+city.length+cameras.length+index}`} portId={id} city={city} cameras={cameras}/>)}
				</List>
			</Popover>
		</span>
	);
});