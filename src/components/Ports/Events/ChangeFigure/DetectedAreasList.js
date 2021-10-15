import {makeStyles} from "@material-ui/core/styles";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import {observer} from "mobx-react-lite";
import ports from "../../../../store/ports";
import React, {useEffect, useState} from "react";
import canvasState from "../../../../store/canvasState";
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	MenuItem,
	Select,
	TextField
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ZONE_TYPE_DEFAULT, ZONE_TYPE_IN_OUT, ZONE_TYPE_PARKING, ZONE_TYPE_RESTRICTED_AREA} from "./Polygon";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import eventsState from "../../../../store/eventsState";
import styles from "../../../../store/styles";
import Polygons from "./Polygons";
import {DeletePolygonDialog} from "./DeletePolygonDialog";

const useStyles = makeStyles((theme) => ({
	detectedAreasList: {
		display: "flex",
		flexDirection: "column",

		maxHeight: window.innerHeight * eventsState.maxHeight,
		overflowY: "auto",
	},
	listSubheader: {
		lineHeight: 1,

		"&.edit": {
			paddingTop: 10,
		},
	},
	listItemText: {
		cursor: "pointer",

		color: "#444",
		fontFamily: styles.fontFamily,
		flexGrow: 1,

		"&.show": {
			display: "flex",
		},

		"&.hide": {
			display: "none",
		},
	},
	listItemIcon: {
		"&.show": {
			display: "flex",
		},

		"&.hide": {
			display: "none",
		},
	},

	iconButton: {
		padding: "5px 5px",

		"&.confirmBtn": {
			padding: 8,
		}
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

	textField: {
		"&.show": {
			display: "flex",
		},

		"&.hide": {
			display: "none",
		},
	},

	checkCircleIcon: {
		color: useHexToRgba("#080", 1),
	},
}))
export const DetectedAreasList = observer(() => {
	const classes = useStyles();

	const [test, setTest] = useState(new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId))
	const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({})

	const {port, camera, event, cardData} = ports.selectedObjects;

	const [tempAreaData, setTempAreaData] = useState({});

	useEffect(() => {
		canvasState.saveDataTest[camera.id]?.forEach((area) => {
			setTempAreaData({
				[area.id]: {
					name: area.getName(),
					type: area.getAttributeType(),
					isEdit: false,
				}
			});

			setOpenDeleteDialog({
				[area.id]: false
			})
		});



		test.setPolygon(canvasState.saveDataTest[camera.id]);
	}, [camera.id, canvasState.isPolygonChanged]);
	useEffect(() => {
		if (eventsState.isCreatePolygon === false) return;

		canvasState.saveDataTest[camera.id]?.forEach((area) => {
			setTempAreaData({
				[area.id]: {
					name: area.getName(),
					type: area.getAttributeType(),
					isEdit: false,
				}
			});
		})
	}, [eventsState.isCreatePolygon]);

	const handleStartEditArea = (area) => {
		setTempAreaData({
			...tempAreaData,
			[area.id]: {
				name: area.getName(),
				type: area.getAttributeType(),
				isEdit: true,
			}
		});
	}
	const handleDeleteArea = (area) => {
		setOpenDeleteDialog({...isOpenDeleteDialog, [area.id]: true})
	}

	const handleChangeNameArea = (e, area) => {
		setTempAreaData({
			...tempAreaData,
			[area.id]: {...tempAreaData[area.id], name: e.target.value}
		});
	}
	const handleChangeTypeArea = (event, area) => {
		setTempAreaData({
			...tempAreaData,
			[area.id]: {...tempAreaData[area.id], type: event.target.value}
		});
	};

	const handleSaveAreaData = (area) => {
		setTempAreaData({
			...tempAreaData,
			[area.id]: {...tempAreaData[area.id], isEdit: false,}
		});

		canvasState.saveDataTest[camera.id][area.id].setName(tempAreaData[area.id].name);
		canvasState.saveDataTest[camera.id][area.id].setAttributeType(tempAreaData[area.id].type);

		test.drawPolygons();
	}
	const handleRestoreAreaData = (area) => {
		setTempAreaData({
			...tempAreaData,
			[area.id]: {
				...tempAreaData[area.id],
				name: area.getName(),
				type: area.getAttributeType(),
				isEdit: false,
			}
		});
	}

	const handleHighlightArea = (area, index) => {
		test.setCurPolygon(index);
		test.setPolygon(test.showCenterPoint());
		test.polygonSelection();
	}
	const handleSelectArea = (index) => {
		test.setCurPolygon(index);
		test.setPolygon(test.showCenterPoint());
		test.polygonSelection();
	}
	const handleLeaveArea = (area, index) => {
		test.drawPolygons();
	}

	const handleCloseDeleteDialog = (area) => {
		// setOpenDeleteDialog(false);
		console.log("handleCloseDeleteDialog")
		console.log(area)
		setOpenDeleteDialog({...isOpenDeleteDialog, [area.id]: false})
	}


	const currentAreaData = (area, index) => {
		const name = area.getName();
		const type = area.getAttributeType();
		const isOffBtn = eventsState.isCreatePolygon

		return (
			<ListItem>
				<ListItemText
					className={`${classes.listItemText}`}
					onClick={() => handleSelectArea(index)}
				>
					{name}
					<ListSubheader className={`${classes.listSubheader}`}>
						{`Area type: ${type}`}
					</ListSubheader>
				</ListItemText>
				<ListItemIcon className={`${classes.listItemIcon}`}>
					<IconButton
						className={classes.iconButton}
						aria-label="AreaEditIcon"
						disabled={isOffBtn}
						onClick={() => handleStartEditArea(area)}
					>
						<EditIcon color={`${isOffBtn ? "disabled" : "primary"}`}/>
					</IconButton>
					<IconButton
						className={classes.iconButton}
						aria-label="AreaDeleteIcon"
						onClick={() => handleDeleteArea(area)}
						disabled={isOffBtn}
					>
						<DeleteIcon color={`${isOffBtn ? "disabled" : "action"}`}/>
					</IconButton>
					<DeletePolygonDialog
						area={area}
						index={index}
						isOpen={isOpenDeleteDialog[area.id]}
						handleClose={() => handleCloseDeleteDialog(area)}
						btnStyles={classes.btn}
					/>
				</ListItemIcon>
			</ListItem>
		)
	}
	const editAreaData = (area) => {
		return (
			<ListItem component={"div"}>
				<ListItemText className={`${classes.listItemText}`}>
					<TextField
						className={`${classes.textField}`}
						label={"Input Area Name"}
						variant={"standard"}
						value={tempAreaData[area.id].name}
						onChange={(e) => handleChangeNameArea(e, area)}
					/>
					<ListSubheader className={`${classes.listSubheader} ${tempAreaData[area.id].isEdit ? "edit" : ""}`}>
						{`Area type: `}
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							variant={"standard"}
							value={tempAreaData[area.id].type}
							label={`Select Area Type`}
							onChange={e => handleChangeTypeArea(e, area)}
						>
							<MenuItem value={ZONE_TYPE_DEFAULT}>{`${ZONE_TYPE_DEFAULT}`}</MenuItem>
							<MenuItem value={ZONE_TYPE_IN_OUT}>{`${ZONE_TYPE_IN_OUT}`}</MenuItem>
							<MenuItem value={ZONE_TYPE_PARKING}>{`${ZONE_TYPE_PARKING}`}</MenuItem>
							<MenuItem value={ZONE_TYPE_RESTRICTED_AREA}>{`${ZONE_TYPE_RESTRICTED_AREA}`}</MenuItem>
						</Select>
					</ListSubheader>
				</ListItemText>
				<ListItemIcon className={`${classes.listItemIcon}`}>
					<IconButton
						className={`${classes.iconButton} confirmBtn`}
						aria-label="AreaEditIcon"
						onClick={() => handleSaveAreaData(area)}
						disabled={eventsState.isCreatePolygon}
					>
						<CheckCircleIcon className={`${classes.checkCircleIcon}`} fontSize={"large"}/>
					</IconButton>
					<IconButton
						className={`${classes.iconButton} confirmBtn`}
						aria-label="AreaDeleteIcon"
						onClick={() => handleRestoreAreaData(area)}
						disabled={eventsState.isCreatePolygon}
					>
						<CancelIcon color={"secondary"} fontSize={"large"}/>
					</IconButton>
				</ListItemIcon>
			</ListItem>
		)
	}

	return (
		<List className={classes.detectedAreasList}>
			{canvasState.saveDataTest[camera.id]?.map((area, index) => {
				return (
					<div key={`Detected-Areas-List-${index}`}>
						{tempAreaData[area.id]?.isEdit ? editAreaData(area) : currentAreaData(area, index)}
						<Divider/>
					</div>
				)
			})}
		</List>
	)
})