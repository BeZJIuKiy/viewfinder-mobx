import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import YaMap from "./YaMap/YaMap";
import {Drawer} from "./Drawer/Drawer";
import {Header} from "./Header/Header";
import Grid from "@material-ui/core/Grid";
import {Box, Card, Container, Hidden} from "@material-ui/core";
import {Clusterer, Map, YMaps} from "react-yandex-maps";
import backgroundImage from "../Auth/images/backgroundNew.jpg"
import Button from "@material-ui/core/Button";
import test from "../../store/test";
import {observer} from "mobx-react-lite";
import dgram from "dgram";

const useStyles = makeStyles((theme) => ({
	test: {
		width: "100%",
		height: "100%",
	},

	container: {
		// display: "flex",
		// height: 500,
		// color: "white",
		// fontSize: "2.6em",
		// flexFlow: "column wrap",    // Расположение в виде колонок

		// display: "flex",
		// flexWrap: "wrap",
		// padding: 0,
		// margin: 0,
		// listStyle: "none",

		display: "flex",
		// flexFlow: "row wrap",
		maxWidth: 1200,
		marginTop: 10,
		margin: "0 auto",
	},

	item01: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",


		"&.one": {
			backgroundColor: "#508694",
			marginRight: 10,
			flexBasis: "100%",
			order: 1, // Первый блок
		},

		"&.two": {
			backgroundColor: "#BB844C",
			marginBottom: 10,
			flex: "1 1 0",
			order: 2, // Второй блок
		},

		"&.three": {
			backgroundColor: "#929D79",
			flex: "1 1 0",
			order: 3, // Третий блок
		},

		"&.four": {
			backgroundColor: "#929D79",
			flexBasis: "100%",
			margin: "0 10px",
			order: 4, // Четвертый блок
		},

		"&.five": {
			backgroundColor: "#929D79",
			marginBottom: 10,
			flex: "1 1 0",
			order: 5, // Пятый блок
		},

		"&.six": {
			backgroundColor: "#929D79",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Шестой блок
		},

		"&.seven": {
			backgroundColor: "#929D79",
			// marginTop: 10,
			flex: "1 1 0",
			order: 7, // Седьмой блок
		},
	},
	item02: {
		flex: "1 1 0",

		padding: 100,
		background: "#f0f0f0",
		borderRadius: 5,
		margin: "1rem",
		textAlign: "center",
	},

	item03: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 200,
		backgroundColor: "#508694",

		borderRadius: 16,
		boxShadow: "0 0 2px 0 rgba(145, 158, 171, 0.24),0 16px 32px -4px rgba(145, 158, 171, 0.24)",

		"&.one": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 1, // Первый блок
		},

		"&.two": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 2, // Первый блок
		},

		"&.three": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 3, // Первый блок
		},

		"&.four": {
			height: 200,

			backgroundColor: "#508694",
			marginBottom: 10,
			flex: "1 1 0",
			order: 4, // Первый блок
		},

		"&.five": {
			// width: 1000,
			height: 300,

			backgroundColor: "#333",
			marginBottom: 10,
			// flexBasis: "80%",

			// flex: "1 1 80%",
			order: 5, // Первый блок
		},

		"&.six": {
			height: 200,

			backgroundColor: "#508694",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Первый блок
		},
		"&.eight": {
			height: 300,

			backgroundColor: "#e5e5e5",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Первый блок
		},
	},

	container01: {
		display: "flex",
		flexFlow: "column wrap",
	},
	item04: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		"&._01": {
			backgroundColor: "red",
			flexBasis: "100%",
			marginRight: 10,
			order: 1,
		},

		flexGrow: 1,
		flexShrink: 1,
		flexBasis: "100%",
		"&._02": {
			backgroundColor: "#777",
			flex: "1 1 0",
			marginBottom: 5,
			order: 2,
		},

		"&._03": {
			backgroundColor: "gold",
			flex: "1 1 0",
			marginTop: 5,
			order: 3,
		},

		"&._04": {
			backgroundColor: "blue",
			flexBasis: "100%",
			marginLeft: 10,
			order: 4,
		},
	},

	container02: {
		display: "flex",
		flexWrap: "wrap",
	},
	item05: {
		padding: 100,
		backgroundColor: "gold",
		textAlign: "center",

		"&.five": {
			height: 150,
			backgroundColor: "red",
		},

		"&.six": {
			height: 250,
			backgroundColor: "blue",
		},
	},


	main: {
		width: "100%",
		height: "100%",

		display: "flex",
		fontFamily: `"Quicksand", sans-serif`,

		backgroundImage: `url(${backgroundImage})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	},
	leftHalf: {
		width: "50%",

		position: "relative",
		background: "rgba(51, 51, 51, 0.7)",

		"@media(max-width: 425px)": {
			width: "100%",
		}
	},
	gridContainer: {
		// textAlign: "center",

		position: "absolute",
		top: "50%",
		left: "0px",
		zIndex: 1,

		transform: "translate(0, -50%)",
	},
	gridItem: {
		fontFamily: `"Quicksand", sans-serif`,

		color: "#ddd",
		borderColor: "none",
		fontSize: 24,

		// marginBottom: theme.spacing(2),

		"&.title": {
			textAlign: "center",
			fontSize: 52,
			fontWeight: 300,
		},

		"&.demo": {
			width: "100%",
			// width: "10vw",
			maxWidth: "200px",
			marginLeft: "auto",
			backgroundColor: "#9e2b4b",

			"&:hover": {
				backgroundColor: "#e22157",
			}
		},

		"&.login": {
			width: "100%",
			// width: "10vw",
			maxWidth: "200px",
			marginRight: "auto",
			backgroundColor: "#3d4772",

			"&:hover": {
				backgroundColor: "#374fb9",
			}
		},
	},
}));
const useControlCameraButtonStyles = makeStyles((theme) => ({
	controlCameraButton: {
		maxWidth: 250,
		padding: 10
	},
	btn: {
		width: "100%",
	},
}));

const ControlCameraButton = observer(() => {
	// const dgram = require("dgram");
	// const keypress = require('keypress');

	const classes = useControlCameraButtonStyles();
	const buttons = [
		{name: "plus", variant: "contained", color: "secondary", command: "+"},
		{name: "up", variant: "contained", color: "primary", command: "up"},
		{name: "minus", variant: "contained", color: "secondary", command: "-"},
		{name: "left", variant: "contained", color: "primary", command: "left"},
		{name: "down", variant: "contained", color: "primary", command: "down"},
		{name: "right", variant: "contained", color: "primary", command: "right"},
	];

	const [intervalId, setIntervalId] = useState(null);

	// const PORT = 3000;
	const PORT = 8080;
	const HOST = '192.168.250.183';

	const socket = new WebSocket(`ws://${HOST}:${PORT}`);
	socket.onopen = () => {
		console.log("Connect");
	}
	socket.onmessage = (message) => {
		console.log(message.data)
	}

	const post = (command) => {
		console.log(`Посылаю команду: ${command}`);
	}
	const sendMsg = (command) => {
		const message = Buffer.from(command, 'utf8')
		socket.send(message)
	}
	const handleClickDown = (command) => {
		setIntervalId(setInterval(() => sendMsg(command), 50));
	}
	const handleClickUp = () => {
		clearInterval(intervalId);
	}

	const keyState = {name: ""};

	const keyDown = (e) => {
		switch (e.key) {
			case "ArrowUp": {
				// console.log(buttons[1].command);
				// post(buttons[1].command)
				sendMsg(buttons[1].command);

				break;
			}
			case "ArrowDown": {
				// console.log("Нажата ArrowDown");
				sendMsg(buttons[4].command);
				break;
			}
			case "ArrowLeft": {
				// console.log("Нажата ArrowLeft");
				sendMsg(buttons[3].command);
				break;
			}
			case "ArrowRight": {
				// console.log("Нажата ArrowRight");
				sendMsg(buttons[5].command);
				break;
			}
			case "+": {
				// console.log("Нажат +");
				sendMsg(buttons[0].command);
				break;
			}
			case "-": {
				// console.log("Нажата -");
				sendMsg(buttons[2].command);
				break;
			}
			case "=": {
				// console.log("Нажата -");
				sendMsg("Stop MF");
				break;
			}
			case "q": {
				// console.log("Нажата -");
				window.removeEventListener("keydown", keyDown);
				break;
			}
			case "c": {
				// console.log("Нажата -");
				sendMsg("c");
				break;
			}
			default:
				return;
		}
	}
	const keyUp = () => {
		// console.log(intervalId);
		clearInterval(intervalId);
		setIntervalId(null);
	}

	window.addEventListener("keydown", keyDown);
	// window.addEventListener("keyup", keyUp);

	const gridItems = buttons.map(({name, variant, color, command}, index) => {
		return (
			<Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={`Control--Camera--Button--${name}--${index}`}>
				<Button
					className={classes.btn}
					variant={variant}
					color={color}
					onMouseDown={() => handleClickDown(command)}
					onMouseUp={handleClickUp}
				>
					{name}
				</Button>
			</Grid>
		)
	})

	// =================================================


	// client.on("message", (message, remote) => {
	// 	console.log(`UDP message received from: ${remote.address}:${remote.port} - ${message}`);
	// });

	// =================================================

	return (
		<div className={classes.controlCameraButton}>
			<Grid container spacing={1}>
				{gridItems}
			</Grid>
		</div>
	)
})

export const Test = () => {
	const classes = useStyles();
	const gridTest = () => {
		return (
			<div className={classes.container}>
				<div className={`${classes.item01} one`}>First</div>
				<div className={`${classes.item01} two`}>Second</div>
				<div className={`${classes.item01} three`}>Third</div>
				<div className={`${classes.item01} four`}>Fourth</div>
				<div className={`${classes.item01} five`}>Fifth</div>
				<div className={`${classes.item01} six`}>Sixth</div>
				<div className={`${classes.item01} seven`}>Seventh</div>

				<div className={`${classes.item02}`}>1</div>
				<div className={`${classes.item02}`}>2</div>
				<div className={`${classes.item02}`}>3</div>

				<div className={`${classes.item03} one`}>1</div>
				<div className={`${classes.item03} two`}>2</div>
				<div className={`${classes.item03} three`}>3</div>
				<div className={`${classes.item03} four`}>4</div>

				<div className={`${classes.item03} five`}>5</div>
				<div className={`${classes.item03} six`}>6</div>

				{/*<Grid container spacing={3}>*/}
				{/*	<Grid item xs={12} sm={6} md={3}>*/}
				{/*		<div className={`${classes.item03}`}>1</div>*/}
				{/*	</Grid>*/}
				{/*	<Grid item xs={12} sm={6} md={3}>*/}
				{/*		<div className={`${classes.item03}`}>2</div>*/}
				{/*	</Grid>*/}
				{/*	<Grid item xs={12} sm={6} md={3}>*/}
				{/*		<div className={`${classes.item03}`}>3</div>*/}
				{/*	</Grid>*/}
				{/*	<Grid item xs={12} sm={6} md={3}>*/}
				{/*		<div className={`${classes.item03}`}>4</div>*/}
				{/*	</Grid>*/}

				{/*	<Grid item xs={12} sm={6} md={8}>*/}
				{/*		<div className={`${classes.item03} five`}>5</div>*/}
				{/*	</Grid>*/}

				{/*	<Grid item xs={12} sm={6} md={4}>*/}
				{/*		<div className={`${classes.item03}`}>6</div>*/}
				{/*	</Grid>*/}

				{/*	<Grid item xs={12} sm={6} md={8}>*/}
				{/*		<div className={`${classes.item03}`}>7</div>*/}
				{/*	</Grid>*/}
				{/*	<Grid item xs={12} sm={6} md={4}>*/}
				{/*		<div className={`${classes.item03} eight`}>8</div>*/}
				{/*	</Grid>*/}

				{/*	<Grid item xs={12} sm={6} md={4}>*/}
				{/*		<div className={`${classes.item03}`}>9</div>*/}
				{/*	</Grid>*/}
				{/*	<Grid item xs={12} sm={6} md={8}>*/}
				{/*		<div className={`${classes.item03}`}>10</div>*/}
				{/*	</Grid>*/}
				{/*</Grid>*/}
			</div>
		)
	}
	const mainPage = () => {
		return (
			<div className={classes.main}>
				<div className={classes.leftHalf}>
					<Grid className={classes.gridContainer} container justify={"center"}>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<div className={`${classes.gridItem} title`}>ViewFinder</div>
						</Grid>

						<Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
							<Button
								className={`${classes.gridItem} demo`}
								variant="outlined"
								color="secondary"
								type={"submit"}
								// disabled={isSubmitting}
							>
								DEMO
							</Button>
						</Grid>

						<Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
							<Button
								className={`${classes.gridItem} login`}
								// variant="contained"
								variant="outlined"
								color="primary"
							>
								Log in
							</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		)
	}

	return (
		<div className={classes.test}>
			<ControlCameraButton/>
		</div>
	)
}