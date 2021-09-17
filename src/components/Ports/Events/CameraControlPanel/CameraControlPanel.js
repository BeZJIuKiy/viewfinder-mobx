import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import React, {useEffect, useMemo, useState} from "react";
import {IconButton} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import connects from "../../../../store/connects";
import eventsState from "../../../../store/eventsState";

const useStyles = makeStyles((theme) => ({
	controlCameraButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		// maxWidth: 250,
		maxWidth: 180,
		// padding: 10,

		borderRadius: 5,
		background: "rgba(200, 200, 200, 0.5)",

		"&.show": {
			display: "flex",
		},

		"&.hide": {
			display: "none",
		},
	},
	btn: {
		width: "100%",
	},
	iconButton: {
		padding: 0,
		margin: 0
	},
	arrow: {
		margin: 0,
		padding: 0,

		fontSize: 36,

		"&.up": {
			transform: "rotate(-90deg)",
		},
		"&.left": {
			transform: "rotate(180deg)",
		},
		"&.down": {
			transform: "rotate(90deg)",
		},
		"&.right": {
			transform: "rotate(0)",
		},
	},
	container: {
		maxHeight: 110,

		"&.controlPanel": {
			maxWidth: 110,
		},

		"&.zoom": {
			maxWidth: 50,
		},
	},
	item: {
		textAlign: "center",
	},
}));
export const CameraControlPanel = observer(() => {
	const classes = useStyles();

	const buttons = [
		{
			name: "up",
			variant: "contained",
			color: "primary",
			command: "up",
			icon: <ArrowForwardIosIcon className={`${classes.arrow} up`}/>,
			disabled: false,
			xs: 12,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 12
		},
		{
			name: "left",
			variant: "contained",
			color: "primary",
			command: "left",
			icon: <ArrowForwardIosIcon className={`${classes.arrow} left`}/>,
			disabled: false,
			xs: 4,
			sm: 4,
			md: 4,
			lg: 4,
			xl: 4
		},
		{
			name: "center",
			variant: "contained",
			color: "primary",
			command: "",
			icon: <RadioButtonUncheckedIcon className={`${classes.arrow}`}/>,
			disabled: false,
			xs: 4,
			sm: 4,
			md: 4,
			lg: 4,
			xl: 4
		},
		{
			name: "right",
			variant: "contained",
			color: "primary",
			command: "right",
			icon: <ArrowForwardIosIcon className={`${classes.arrow} right`}/>,
			disabled: false,
			xs: 4,
			sm: 4,
			md: 4,
			lg: 4,
			xl: 4
		},
		{
			name: "down",
			variant: "contained",
			color: "primary",
			command: "down",
			icon: <ArrowForwardIosIcon className={`${classes.arrow} down`}/>,
			disabled: false,
			xs: 12,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 12
		},
	];
	const symbols = [
		{
			name: "plus",
			variant: "contained",
			color: "secondary",
			command: "+",
			icon: <ZoomInIcon className={`${classes.arrow} zoomIn`}/>,
			disabled: false,
			xs: 12,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 12,
		},
		{
			name: "minus",
			variant: "contained",
			color: "secondary",
			command: "-",
			icon: <ZoomOutIcon className={`${classes.arrow} zoomOut`}/>,
			disabled: false,
			xs: 12,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 12,
		},
	];

	const [intervalId, setIntervalId] = useState(null);

	// const PORT = 3000;
	// const PORT = 8080;
	// const HOST = '192.168.250.183';
	//
	// const PORT = 7000;
	// const HOST = 'localhost';
	//
	// const socket = new WebSocket(`ws://${HOST}:${PORT}`);
	// socket.onopen = () => {
	//     console.log("Connect");
	// }
	// socket.onmessage = (message) => {
	//     console.log(message.data)
	// }


	connects.wsCameraControl.onopen = () => {
		console.log("Connect");
	}
	connects.wsCameraControl.onmessage = (message) => {
		console.log(message.data)
	}

	const sendMsg = (command) => {
		try {
			const message = Buffer.from(command, 'utf8')
			// socket.send(message);
			connects.wsCameraControl.send(message);
		} catch (e) {
			console.error(e)
		}
	}
	const handleClickDown = (command) => {
		setIntervalId(setInterval(() => sendMsg(command), 50));
	}
	const handleClickUp = () => {
		clearInterval(intervalId);
	}

	const keyDown = (e) => {
		switch (e.key) {
			case "ArrowUp": {
				sendMsg(buttons[0].command);
				break;
			}
			case "ArrowDown": {
				sendMsg(buttons[4].command);
				break;
			}
			case "ArrowLeft": {
				sendMsg(buttons[1].command);
				break;
			}
			case "ArrowRight": {
				sendMsg(buttons[3].command);
				break;
			}
			case "+": {
				sendMsg(symbols[0].command);
				break;
			}
			case "-": {
				sendMsg(symbols[1].command);
				break;
			}
			case "=": {
				sendMsg("Stop MF");
				break;
			}
			case "q": {
				window.removeEventListener("keydown", keyDown);
				break;
			}
			case "c": {
				sendMsg("stop");
				break;
			}
			default:
				return;
		}
	}
	const iconButton = (newClass, icon, command, disabled = false) => {
		return (
			<IconButton
				className={newClass}
				edge="start"
				onMouseDown={() => handleClickDown(command)}
				onMouseUp={handleClickUp}
				color="inherit"
				aria-label="menu"
				disabled={disabled}
			>
				{icon}
			</IconButton>
		)
	}

	useEffect(() => {
		if (eventsState.isShowControlCameraMove) {
			window.addEventListener("keydown", defaultKeyEvent, false)
			window.addEventListener("keydown", memoizedListener, false);
		} else {
			window.removeEventListener("keydown", defaultKeyEvent, false)
			window.removeEventListener("keydown", memoizedListener, false);
		}
	}, [eventsState.isShowControlCameraMove])
	const handleFocusControlArea = (e) => {
		window.addEventListener("keydown", function (e) {
			if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
				e.preventDefault();
			}
		}, false);

		window.addEventListener("keydown", keyDown);
	}

	const defaultKeyEvent = (e) => {
		if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}
	const memoizedListener = useMemo(() => keyDown, []);

	const gridItems = buttons.map(({name, command, icon, disabled, xs, sm, md, lg, xl}, index) => {
		return (
			<Grid className={classes.item} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}
			      key={`Control--Camera--Button--${name}--${index}`}>
				{iconButton(classes.iconButton, icon, command, disabled)}
			</Grid>
		)
	})

	return (
		<div className={`${classes.controlCameraButton} ${eventsState.isShowControlCameraMove ? "show" : "hide"}`}>
			<Grid container justify={"center"} className={`${classes.container} controlPanel`}>
				{gridItems}
			</Grid>
			<Grid container justify={"flex-start"} className={`${classes.container} zoom`}>
				{symbols.map(({icon, command, xs, sm, md, lg, xl}, index) => {
					return (
						<Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}
						      key={`Control--Camera--Button--${command}--${index}`}
						>
							{iconButton(classes.iconButton, icon, command)}
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
})