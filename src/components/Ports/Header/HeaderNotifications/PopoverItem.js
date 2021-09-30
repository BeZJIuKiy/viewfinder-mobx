import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import {NavLink} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ports from "../../../../store/ports";
import styles from "../../../../store/styles";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import {IconButton, ListItemIcon, Tooltip} from "@material-ui/core";

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => {
	const colorMain = "#ddd";
	const colorMainHover = "#eee";

	const bgMain = "#4a4a4a";
	const bgMainHover = "#3a3a3a";

	const bgcRegular = "#e0e0e0";
	const bgcWarning = "#facc88";
	const bgcCritical = "#ee8989";

	const bgcRegularHover = "#ccc";
	const bgcWarningHover = "#ffb74d";
	const bgcCriticalHover = "#c2383c";

	return ({
		listSection: {
			marginTop: 8,
			borderRadius: 8,
			borderRight: `1px solid ${bgMain}`,
			borderLeft: `1px solid ${bgMain}`,

		},
		ul: {
			padding: 0,
		},

		item: {
			transition: "background-color 0.2s",
			marginBottom: 1,
			borderRadius: 2,
			position: "relative",

			"&.regular": {
				background: bgcRegular,

				"&:hover": {
					background: bgcRegularHover,
				},
			},
			"&.warning": {
				background: bgcWarning,

				"&:hover": {
					background: bgcWarningHover,
				},
			},
			"&.critical": {
				background: bgcCritical,

				"&:hover": {
					background: bgcCriticalHover,
					color: "#fff",
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

		listItemTextPrimary: {
			fontFamily: styles.fontFamily,
			fontWeight: 500,
		},

		listSubheader: {
			fontFamily: styles.fontFamily,

			"&.header": {
				color: colorMain,

				borderTopLeftRadius: 5,
				borderTopRightRadius: 5,
				background: bgMain,
			},
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
		additionalDescription: {
			display: "flex",
			marginTop: theme.spacing(1),
		},
		listItemIcon: {
			justifyContent: "center",
			alignItems: "center",
			color: "#666",
		},
		btnCorrectPosition: {
			display: "flex",
			justifyContent: "center",
		},
		iconButton: {
			position: "absolute",
			top: "50%",
			right: 0,
			zIndex: 2,

			transform: "translate(0, -50%)",
		},
		btn: {
			width: "100%",
			height: "100%",

			alignItems: "center",
			borderRadius: 0,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,

			fontFamily: styles.fontFamily,

			fontSize: 16,
			fontWeight: 700,
			color: colorMain,
			background: bgMain,
			transform: "color 0.2",

			"&:hover": {
				color: colorMainHover,
				background: bgMainHover,
			},
		}
	})
})

export const PopoverItem = observer(({portId, city, cameras}) => {
	const classes = useStyles();

	const handleSelectItem = (portId, cameraId, eventId) => {
		ports.setSelectedPort(portId);
		ports.setSelectedCamera(cameraId);

		ports.setIsNewNotif(eventId, false);
	}
	const handleCloseNotify = (portId, cameraId, eventId) => {
		// ports.setSelectedPort(portId);
		// ports.setSelectedCamera(cameraId);
		//
		// ports.setIsNewNotif(eventId, false);

		const event = ports.data.find((port) => port.id === portId)
			.cameras.find((camera) => camera.id === cameraId)
			.events.find((event) => event.id === eventId)

		console.log(event)
		// const camera = port.cameras.find((camera) => camera.id === cameraId);

	}
	const selectIcon = (type) => {
		switch (type) {
			case "regular":
				return <AccessTimeIcon/>
			// return <FiberManualRecordIcon/>
			case "warning":
				return <AccessTimeIcon/>
			// return <WarningIcon/>
			case "critical":
				return <AccessTimeIcon/>
			// return <ErrorIcon/>
			default:
				return <FiberManualRecordIcon/>
		}
	}

	const listItem = (portId, camId, description, eventId, date, typeError, eventDescription) => {
		const icon = selectIcon(typeError);
		const delay = 1500;
		return (
			<Tooltip
				key={`item-${portId}-${camId}-${eventId}`}
				enterDelay={delay}
				enterNextDelay={delay}
				title={<span style={{fontSize: 16}}>{eventDescription}</span>}
			>
				<ListItem
					className={`${classes.item} ${typeError}`}
				>
					<NavLink
						className={`${classes.navLink} ${typeError}`}
						to={"/events"}>
						<ListItemText
							classes={{primary: classes.listItemTextPrimary}}
							primary={`${description}`}
							onClick={() => handleSelectItem(portId, camId, eventId)}
						/>
						<div className={classes.additionalDescription}>
							<ListItemIcon className={`${classes.listItemIcon}`}>{icon}</ListItemIcon>
							<span className={classes.listSubheader}>{date}</span>
						</div>
					</NavLink>

					<IconButton className={classes.iconButton} onClick={() => handleCloseNotify(portId, camId, eventId)}>
						<HighlightOffIcon/>
					</IconButton>
				</ListItem>
			</Tooltip>
		)
	}

	return (
		<li key={`section-${portId}`} className={classes.listSection}>
			<ul className={classes.ul}>
				<ListSubheader className={`${classes.listSubheader} header`}>{`Port in ${city}`}</ListSubheader>
				<Divider/>
				{cameras.map((camera) =>
					camera.events.filter((event) => event.newEvent)
						.map(event => listItem(portId, camera.id, camera.description, event.id, event.date, event.typeError.toLowerCase(), event.description))
				)}
				{/*<Divider/>*/}

				<span className={classes.btnCorrectPosition}>
					<Button className={classes.btn} variant={"contained"}>View All</Button>
				</span>
			</ul>
			{/*<Divider/>*/}
		</li>
	);
});