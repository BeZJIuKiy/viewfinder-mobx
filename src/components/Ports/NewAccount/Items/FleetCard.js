import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
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
import ErrorIcon from '@material-ui/icons/Error';
import Collapse from "@material-ui/core/Collapse";
import {Button, Dialog, Grid, Hidden, Input, Paper, Tooltip} from "@material-ui/core";
import account from "../../../../store/account";
import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";
import {useHexToRgba} from "../../../../useHooks/useHexToRgba";
import {DeleteShipDialog} from "./DeleteShipDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 310,
        // minWidth: 345,
        maxWidth: 345,
        overflowY: "auto",
    },
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
    selectImage: {
        display: "flex",
        flexGrow: 1,
        marginTop: theme.spacing(2),
        justifyContent: "center",
        overflowX: "auto",
    },
}));

export const FleetCard = observer(({ship, isEdit = false, isDown = false, closeCard = () => {}}) => {
    const classes = useStyles();
    const template = {...ship, images: [...ship.images]};

    const {port, camera, cardData} = ports.selectedObjects;

    const [selectedImage, setSelectedImage] = useState(null);
    const [expanded, setExpanded] = React.useState(isDown);
    const [isRead, setRead] = React.useState(!isEdit);
    const [isOpen, setOpen] = React.useState(false);
    const [localCardData, setLocalCardData] = React.useState(template);
    const [errorFields, setErrorFields] = React.useState({});

    useEffect(() => {
        setLocalCardData(template);
    }, [isRead]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    const handleEditShipData = () => {
        setExpanded(true);
        setRead(false);
    }
    const handleChangeShipData = (e, key) => {
        setLocalCardData({...localCardData, [key]: e.target.value})
        setErrorFields({...errorFields, [key]: false});
    }
    const handleOpenDeleteDialog = () => {
        setOpen(true);

        // const {isFromEvent, portId, cameraId, eventId} = localCardData.fromEvent;
        //
        // account.deleteShip(ship.id);
        // if (isFromEvent) ports.changeEvent(portId, cameraId, clearEvent(portId, cameraId, eventId));
    }
    const handleCloseDeleteDialog = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        const {isFromEvent, portId, cameraId, eventId} = localCardData.fromEvent;

        let isError = false;
        const errorField = {};

        for (const key in localCardData) {
            // if (localCardData[key]?.length || key === "id" || key === "fromEvent") continue;
            if (localCardData[key]?.length || Number.isInteger(localCardData[key]) || key === "fromEvent" || key === "images") continue;
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

        if (isFromEvent) {
            ports.changeEvent(portId, cameraId, editedEvent(portId, cameraId, eventId));
        }

        closeCard();
        account.changeShip(ship, localCardData);
    }
    const handleCancel = () => {
        setRead(true);
        setLocalCardData(cardData?.name ? account.findShip(cardData.imo) : template);
        setErrorFields({});
        closeCard();
    }
    const handleCloseDialog = () => {
        setRead(true);
        setExpanded(false);
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
    const selectImage = () => {
        return (
            <div className={classes.selectImage}>
                <input type="file" name="myImage" onChange={handleSelectImage}/>
            </div>
        )
    }

    const confirmBtn = (text = "test", type = "default", action) => {
        return (
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className={`${classes.confirmBtn}`}>
                    <Button
                        className={`${classes.btn} ${type}`}
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

    const changeFleetCard = () => {
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
    const deleteFleetCard = () => {
        const title = "Click for Delete this ship from Your fleet";
        const color = "default";

        return (
            <Tooltip
                enterDelay={delay}
                enterNextDelay={delay}
                title={<span style={{fontSize: 16}}>{`${title}`}</span>}
            >
                <IconButton aria-label="edit" onClick={handleOpenDeleteDialog} color={color}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        )
    }
    const editedEvent = (portId, cameraId, eventId) => {
        const portIndex = ports.data.findIndex(({id}) => id === portId);
        const cameraIndex = ports.data[portIndex].cameras.findIndex(({id}) => id === cameraId);
        const event = ports.data[portIndex].cameras[cameraIndex].events.find(({id}) => id === eventId);

        return ({
            ...event,
            imo: localCardData.imo,
            mmsi: localCardData.mmsi,
            name: localCardData.name,
            callSign: localCardData.callSign,
            typeVessel: localCardData.vesselTypeDetailed,
        })
    }

    const handleSelectImage = async (event) => {
        const base64 = await convertToBase64(event.target.files[0]);

        setSelectedImage(base64);
        setLocalCardData({...localCardData, images: [base64]});
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = (() => {
                resolve(fileReader.result.replace("data:image/jpeg;base64,", ""));
            })
            fileReader.onerror = ((error) => {
                reject(error);
            })
        })
    }

    const delay = 500;

    const img = selectedImage ? selectedImage : ship?.images[0];

    return (
        <>
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

                    className={`${classes.cardHeader} ${cardData?.typeError?.toLowerCase()}`}
                    title={ship.name || "Ship not found"}
                    subheader={ship.vesselTypeDetailed || "Unknown ship type"}
                />
                <CardMedia
                    className={classes.media}
                    image={`data:image/png;base64,${img}`}
                    // image={`data:image/png;base64,${ship?.images[0]}`}
                    title={ship.name || "No ship name"}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Status: ${ship.status || "Unknown"}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Do you want to add this ship to your fleet?
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {changeFleetCard()}
                    {deleteFleetCard()}
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
                            {selectImage()}
                        </Grid>

                        <div className={`${classes.containerConfirmBtn} ${isRead ? "hide" : "show"}`}>
                            <Grid container justify={"center"}>
                                {confirmBtn("cancel", "cancel", handleCancel)}
                                {confirmBtn("ok", "ok", handleConfirm)}
                            </Grid>
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
            <DeleteShipDialog ship={ship} isOpen={isOpen} handleClose={handleCloseDeleteDialog}
                              btnStyles={classes.btn}/>
        </>
    );
})