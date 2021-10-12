import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import ports from "../../../../store/ports";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from "@material-ui/core/Collapse";
import {Button, Dialog, Grid, Hidden, Input, Paper} from "@material-ui/core";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import account from "../../../../store/account";
import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 310,
		// minWidth: 345,
		maxWidth: 345,
		overflowY: "auto",

	},
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
}));
export const ShipCard = observer(({isOpen, btnStyles, handleClose}) => {
	const classes = useStyles();
	const template = {...account.templateShipData, vesselTypeDetailed: ports.selectedObjects.cardData?.typeVessel};

	const {cardData} = ports.selectedObjects

	const [expanded, setExpanded] = React.useState(false);
	const [isRead, setRead] = React.useState(true);
	const [localCardData, setLocalCardData] = React.useState(template);
	const [errorFields, setErrorFields] = React.useState({});

	useEffect(() => {
		setLocalCardData(template);
	}, [isOpen])

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const handleEditShipData = () => {
		setExpanded(true);
		setRead(false);
	}
	const handleChangeShipData = (e, key) => {
		setLocalCardData({...localCardData, [key]: e.target.value})
		setErrorFields({...errorFields, [key]: false})
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
		account.addShipInMyFleet(localCardData);
	}
	const handleCancel = () => {
		setRead(true);
		setLocalCardData(template);
		setErrorFields({});
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
	const handleCloseDialog = () => {
		setRead(true);
		setExpanded(false);
		setErrorFields({});
		handleClose();
	}

	return (
		<Dialog
			PaperComponent={PaperComponent}
			open={isOpen}
			onClose={handleCloseDialog}
			aria-labelledby="draggable-dialog-title"
			aria-describedby="simple-modal-description"
		>
			<Card className={classes.root}>
				<CardHeader
					// avatar={
					// 	<Avatar aria-label="recipe" className={classes.avatar}>
					// 		R
					// 	</Avatar>
					// }
					// action={
					// 	<IconButton aria-label="settings">
					// 		<MoreVertIcon />
					// 	</IconButton>
					// }
					// title="Shrimp and Chorizo Paella"
					// subheader="September 14, 2016"

					title={cardData?.typeVessel || "Ship not found"}
					subheader={cardData?.date}
					style={{cursor: 'move'}}
					id={DRAGGABLE_TESTING}
				/>
				<CardMedia
					className={classes.media}
					image={`data:image/png;base64,${cardData?.imageLink}`}
					title={cardData?.typeVessel}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{cardData?.description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					{/*<IconButton aria-label="add to fleet">*/}
					{/*	<AddIcon/>*/}
					{/*</IconButton>*/}
					<IconButton aria-label="edit" onClick={handleEditShipData} color={isRead ? "default" : "primary"}>
						<EditIcon/>
					</IconButton>
					{/*<IconButton aria-label="delete">*/}
					{/*	<DeleteIcon/>*/}
					{/*</IconButton>*/}
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
		</Dialog>
	);
})