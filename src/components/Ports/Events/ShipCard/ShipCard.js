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
import ErrorIcon from '@material-ui/icons/Error';
import Collapse from "@material-ui/core/Collapse";
import {Button, Dialog, Grid, Hidden, Input, Paper, Tooltip} from "@material-ui/core";
import account from "../../../../store/account";
import {DRAGGABLE_TESTING, PaperComponent} from "../../../../useHooks/useDraggable";
import styles from "../../../../store/styles";

const useStyles = makeStyles((theme) => ({
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
export const ShipCard = observer(({isOpen, btnStyles, handleClose}) => {
    const classes = useStyles();
    const template = {...account.templateShipData, vesselTypeDetailed: ports.selectedObjects.cardData?.typeVessel};

    const {port, camera, cardData} = ports.selectedObjects;

    const [expanded, setExpanded] = React.useState(false);
    const [isRead, setRead] = React.useState(true);
    const [localCardData, setLocalCardData] = React.useState({...template, images: []});
    const [errorFields, setErrorFields] = React.useState({});

    useEffect(() => {
        setLocalCardData(cardData?.name ? account.findShip(cardData.imo) : {...template, images: []});
    }, [isOpen])

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
        localCardData.fromEvent.isFromEvent = true;
        localCardData.fromEvent.portId = port.id;
        localCardData.fromEvent.cameraId = camera.id;
        localCardData.fromEvent.eventId = cardData.id;

        let isError = false;
        const errorField = {};

        for (const key in localCardData) {
            const isExceptions = key === "id"
                || key === "fromEvent"
                || key === "mmsi"
                || key === "flag"
                || key === "yearBuilt"
                || key === "callSign";

            if (localCardData[key]?.length || isExceptions) continue;

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
            typeVessel: localCardData.vesselTypeDetailed,
        }
        ports.changeEvent(port.id, camera.id, newEvent)
        account.addShipInMyFleet(localCardData);
    }
    const handleCancel = () => {
        setRead(true);
        setLocalCardData(cardData.name ? account.findShip(cardData.imo) : {...template, images: []});
        setErrorFields({});
    }
    const handleDanger = () => {
        ports.setDangerEvent(port.id, camera.id, cardData.id, isRead ? !cardData.isDanger : false);
    }
    const handleCloseDialog = () => {
        setRead(true);
        setExpanded(false);
        setErrorFields({});
        handleClose();
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

    const changeEvent = () => {
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
    const dangerEvent = () => {
        const isDanger = cardData?.isDanger;

        const firstTitle = "Remove mark Dangerous from the object";
        const secondTitle = "Mark object as Dangerous";
        const warning = "Edit is Active, you can't mark your ship as Dangerous";

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
                    <ErrorIcon color={color}/>
                </IconButton>
            </Tooltip>
        )
    }

    const delay = 500;

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

                    className={`${classes.cardHeader} ${cardData?.typeError?.toLowerCase()}`}
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
                        {`${cardData?.description}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Do you want to add this ship to your fleet?
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/*<IconButton aria-label="add to fleet">*/}
                    {/*	<AddIcon/>*/}
                    {/*</IconButton>*/}
                    {changeEvent()}
                    {dangerEvent()}
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