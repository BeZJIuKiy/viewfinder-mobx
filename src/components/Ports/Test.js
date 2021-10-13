import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundImage from "../Auth/images/backgroundNew.jpg"
import {observer} from "mobx-react-lite";
import {
	Button,
	Dialog,
	Divider,
	Grid,
	Input,
	List,
	ListItem,
	ListItemIcon,
	ListItemText, ListSubheader, TextField,
	Tooltip
} from "@material-ui/core";
import ports from "../../store/ports";
import canvasState from "../../store/canvasState";
import account from "../../store/account";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ErrorIcon from "@material-ui/icons/Error";
import {DRAGGABLE_TESTING, PaperComponent} from "../../useHooks/useDraggable";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from '@material-ui/icons/Delete';
import {red} from "@material-ui/core/colors";
import {useHexToRgba} from "../../useHooks/useHexToRgba";

const useDetectedAreaCardStyles = makeStyles((theme) => ({
	root: {
		width: 310,
		// minWidth: 345,
		maxWidth: 345,
		overflowY: "auto",
	},
	// cardHeader: styles.notifyColors,
	cardHeader: {},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	gridItem: {
		height: "100%",

		display: "flex",
		alignItems: "center"
	},
	containerConfirmBtn: {
		"&.show": {
			display: "block",
		},

		"&.hide": {
			display: "none",
		},
	},

	confirmBtn: {
		display: "flex",
		justifyContent: "center",
		margin: "24px 8px 0px",
	},
	test: {
		borderRadius: 0
	},
}));

export const DetectedAreaCard = observer(({btnStyles}) => {
	const classes = useDetectedAreaCardStyles();
	const template = {...account.templateShipData, vesselTypeDetailed: ports.selectedObjects.cardData?.typeVessel};

	const {port, camera, cardData} = ports.selectedObjects

	const [expanded, setExpanded] = React.useState(false);
	const [isRead, setRead] = React.useState(true);
	const [localCardData, setLocalCardData] = React.useState(template);
	const [errorFields, setErrorFields] = React.useState({});

	useEffect(() => {
		setLocalCardData(cardData?.name ? account.findShip(cardData.imo) : template);
	}, [camera.id])

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const handleEditShipData = () => {
		setExpanded(true);
		setRead(false);
		ports.setDangerEvent(port.id, camera.id, cardData.id, false);
	}
	const handleChangeShipData = (e, key) => {
		setLocalCardData({...localCardData, [key]: e.target.value})
		setErrorFields({...errorFields, [key]: false});
	}

	const handleConfirm = () => {
		// ports.changeEvent(port.id, camera.id, localCardData);
		localCardData.images.push(cardData.imageLink);
		localCardData.status = "Active";

		let isError = false;
		const errorField = {};

		for (const key in localCardData) {
			if (localCardData[key]?.length) continue;
			errorField[key] = true;
			isError = true;
		}

		if (isError) {
			setErrorFields(errorField);
			return;
		} else {
			setErrorFields(errorField);
		}

		setRead(true);

		const newEvent = {
			...cardData,
			imo: localCardData.imo,
			mmsi: localCardData.mmsi,
			name: localCardData.name,
			callSign: localCardData.callSign,
		}
		ports.changeEvent(port.id, camera.id, newEvent)
		account.addShipInMyFleet(localCardData);
	}
	const handleCancel = () => {
		setRead(true);
		setLocalCardData(cardData.name ? account.findShip(cardData.imo) : template);
		setErrorFields({});
	}
	const handleDanger = () => {
		ports.setDangerEvent(port.id, camera.id, cardData.id, isRead ? !cardData.isDanger : false);
	}

	const content = (title, data = "", key) => {
		return (
			<>
				<Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
					<div className={classes.gridItem}>
						{title}:
					</div>
				</Grid>
				<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
					<Input
						value={data}
						readOnly={isRead}
						disabled={isRead}
						onChange={(e) => handleChangeShipData(e, key)}
						error={!!errorFields[key]}
						placeholder={!!errorFields[key] ? "Required field" : ""}
					/>
				</Grid>
			</>
		)
	}
	const confirmBtn = (text = "test", color = "default", action) => {
		return (
			<Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
				<div className={`${classes.confirmBtn}`}>
					<Button
						className={`${btnStyles} ${color}`}
						variant={"contained"}
						fullWidth
						onClick={action}
					>
						{text}
					</Button>
				</div>
			</Grid>
		)
	}

	const changeDetectedArea = () => {
		const firstTitle = "Click and change the ship details to add to your fleet";
		const secondTitle = `Change the ship data and click on "Add Ship" or click "Cancel"`;

		const title = isRead ? firstTitle : secondTitle;
		const color = isRead ? "default" : "primary";

		return (
			<Tooltip
				enterDelay={delay}
				enterNextDelay={delay}
				title={<span style={{fontSize: 16}}>{`${title}`}</span>}
			>
				<IconButton aria-label="edit" onClick={handleEditShipData} color={color}>
					<EditIcon/>
				</IconButton>
			</Tooltip>
		)
	}
	const deleteDetectedArea = () => {
		const isDanger = cardData?.isDanger;

		const firstTitle = "Remove mark Dangerous from the object";
		const secondTitle = "Mark object as Dangerous";
		const warning = "Edit is Active, you can't mark your ship is Dangerous";

		const title = isDanger
			? firstTitle
			: isRead ? secondTitle : warning;
		const color = isDanger ? "secondary" : "action";

		return (
			<Tooltip
				enterDelay={delay}
				enterNextDelay={delay}
				title={<span style={{fontSize: 16}}>{title}</span>}
			>
				<IconButton aria-label="dangerous" onClick={handleDanger}>
					<DeleteIcon color={color}/>
				</IconButton>
			</Tooltip>
		)
	}

	const delay = 500;

	return (
		<Card className={classes.root}>
			<CardHeader
				className={`${classes.cardHeader} ${cardData.typeError?.toLowerCase()}`}
				title={cardData?.typeVessel || "Ship not found"}
				subheader={cardData?.date}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{`${cardData?.description}`}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{changeDetectedArea()}
				{deleteDetectedArea()}
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
					disabled={!isRead}
				>
					<ExpandMoreIcon/>
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Grid container>
						{content("Ship Name", localCardData.name, "name")}
						{content("IMO", localCardData.imo, "imo")}
						{content("MMSI", localCardData.mmsi, "mmsi")}
						{content("Ship Type", localCardData.vesselTypeDetailed, "vesselTypeDetailed")}
						{content("Call Sign", localCardData.callSign, "callSign")}
						{content("Flag", localCardData.flag, "flag")}
						{content("Year Built", localCardData.yearBuilt, "yearBuilt")}
					</Grid>

					<div className={`${classes.containerConfirmBtn} ${isRead ? "hide" : "show"}`}>
						<Grid container justify={"center"}>
							{confirmBtn("cancel", "cancel", handleCancel)}
							{confirmBtn("add ship", "ok", handleConfirm)}
						</Grid>
					</div>
				</CardContent>
			</Collapse>
		</Card>
	);
})

const useDetectedAreasListStyles = makeStyles((theme) => ({
	detectedAreasList: {
		display: "flex",
		flexDirection: "column",
	},
	listItemText: {
		flexGrow: 1,

	},

	btn: {
		width: 116,
		height: 36,

		"&.ok": {
			color: useHexToRgba("#fff", 0.8),
			background: useHexToRgba("#080", 0.8)
		},

		"&.cancel": {
			color: useHexToRgba("#fff", 0.8),
			background: useHexToRgba("#f00", 0.82),
		},
	},
}))
const DetectedAreasList = observer(() => {
	const classes = useDetectedAreasListStyles();

	const {port, camera, event, cardData} = ports.selectedObjects;

	const areas = () => {
		return canvasState.saveDataTest[camera.id]?.map((area, index) => {
			// area.setName("Test " + index);
			const name = area.getName();
			const type = area.getAttributeType();

			return (
				<>
					<ListItem key={`Detected-Areas-List-${index}`}>
						<ListItemText className={classes.listItemText}>
							{name}
							<ListSubheader style={{lineHeight: 1}}>{`Area type: ${type}`}</ListSubheader>
							{/*<TextField label={"123"} variant={"outlined"} value={name}/>*/}
						</ListItemText>
						<ListItemIcon>
							<IconButton aria-label="DeleteIcon">
								<EditIcon color={"action"}/>
								<DeleteIcon color={"primary"}/>
								<DeleteIcon color={"secondary"}/>
							</IconButton>
						</ListItemIcon>
					</ListItem>
					<Divider/>
				</>
			)
		})
	}

	return (
		<List className={classes.detectedAreasList}>
			{areas()}
		</List>
	)
})

const useStyles = makeStyles((theme) => ({
	test: {
		// width: "100%",
		// height: "100%",

		minWidth: "100%",
		minHeight: "100%",
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
export const Test = observer(() => {
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
			</div>
		)
	}

	return (
		<div className={classes.test}>
			<DetectedAreasList/>
		</div>
	)
})