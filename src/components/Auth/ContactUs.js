import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "transparent",
		boxShadow: "none",
	},

	contactUs: {
		display: "flex",

		position: "absolute",
		top: "90%",
		left: "25%",
		zIndex: 3,

		transform: "translate(-50%, 0)",

		'@media(max-width: 425px)': {
			// flexDirection: "column",
			top: "80%",
			left: "50%",

			transform: "translate(-50%, 0%)",
		},

		'@media(max-width: 320px)': {},
	},

	icons: {
		fontSize: "2vw",
		transition: "color 0.2s, background-color 0.2s",
		margin: theme.spacing(0.5),

		"&.telegram": {
			color: "white",
			borderRadius: "50%",
			backgroundColor: "#777",
			paddingRight: "5%",

			"&:hover": {
				color: "white",
				backgroundColor: "#0088dd",
			},
		},
		"&.phone": {
			color: "white",
			borderRadius: "50%",
			backgroundColor: "#777",
			padding: 5,

			"&:hover": {
				color: "white",
				backgroundColor: "#0d7c04",
			},
		},
		"&.email": {
			color: "white",
			borderRadius: "50%",
			backgroundColor: "#777",
			padding: 5,

			"&:hover": {
				color: "white",
				backgroundColor: "#d33738",
			},
		},

		'@media(max-width: 1024px)': {
			fontSize: 36,

			"&.telegram": {
				backgroundColor: "#0088dd",
			},
			"&.phone": {
				backgroundColor: "#0d7c04",
			},
			"&.email": {
				backgroundColor: "#d33738",
			},
		},

		'@media(max-width: 768px)': {
			fontSize: 36,

			"&.telegram": {
				backgroundColor: "#0088dd",
			},
			"&.phone": {
				backgroundColor: "#0d7c04",
			},
			"&.email": {
				backgroundColor: "#d33738",
			},
		},

		'@media(max-width: 425px)': {
			fontSize: "10vw",

			"&.telegram": {
				backgroundColor: "#0088dd",
			},
			"&.phone": {
				backgroundColor: "#0d7c04",
			},
			"&.email": {
				backgroundColor: "#d33738",
			},
		},
	},

	popover: {
		color: "gold",
	},

	btn: {
		fontSize: "1.2vw",
		color: "#ccc",
		fontWeight: 900,
		fontFamily: `"Quicksand", sans-serif`,

		backgroundColor: "transparent",
		boxShadow: "none",

		transition: "color 0.2s, background-color 0.2s",

		"&:hover": {
			backgroundColor: "transparent",
			boxShadow: "none",
		},

		'@media(max-width: 1024px)': {
			fontSize: 18,
		},

		'@media(max-width: 768px)': {
			fontSize: 18,
		},

		'@media(max-width: 425px)': {
			fontSize: "4vw",
			fontWeight: 500,
		},
	}
}))

export const ContactUs = () => {
	const classes = useStyles();

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
		<div className={classes.contactUs}>
			<Button className={classes.btn} aria-describedby={id} variant="contained" color="primary"
			        onClick={handleClick}>
				Contact us
			</Button>
			<Popover
				classes={{paper: classes.root}}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<div style={{display: "flex", backgroundColor: "transparent"}}>
					<a href="tel:88002500104">
						<LocalPhoneIcon className={`${classes.icons} phone`}/>
					</a>

					<a href="mailto:lookout@ssoft24.com" target="_blanc">
						<EmailIcon className={`${classes.icons} email`}/>
					</a>

					<a href="https://t.me/BeZJIuKiy" target="_blanc">
						<TelegramIcon className={`${classes.icons} telegram`}/>
					</a>
				</div>
			</Popover>
		</div>
	)
}