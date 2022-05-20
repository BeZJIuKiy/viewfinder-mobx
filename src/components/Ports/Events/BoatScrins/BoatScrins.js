import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import {useWindowDimensions} from "../../../../useHooks/useWindowDimensions";
import ports from '../../../../store/ports';
import eventsState from '../../../../store/eventsState';
import header from '../../../../store/header';
import { ImageTitle } from '../ImageTitle';
import { ShipCard } from '../ShipCard/ShipCard';
import { useHexToRgba } from '../../../../useHooks/useHexToRgba';
import styles from "./BoatScrins.module.css";

const useStyles = makeStyles((theme) => ({
    testImage: {
        maxHeight: window.innerHeight * eventsState.maxHeight,
        // maxHeight: "100%",

        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,

        "&.toMany": {
            overflowY: "auto",
            overflowX: "hidden",
            // -webkit-overflow-scrolling:touch;
            '-webkit-overflow-scrolling': "touch",
        }
    },

    icon: {
        color: 'white',
    },
    image: {
        cursor: 'pointer',
    },
    dangerEvent: {
        position: "absolute",

        top: 3,
        right: 3,
        zIndex: 1,

        "&.show": {
            display: "flex",
        },

        "&.hide": {
            display: "none",
        }
    },
    iconButton: {
        background: useHexToRgba("#eee", 0.1),
    },

    tooltipTitle: {
        fontSize: 16
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
}));

const BoatScrins = observer(() => {
    const classes = useStyles();
    const testImageRef = useRef();

    const {port, camera, event, shipImage} = ports.selectedObjects;
    const windowHeight = useWindowDimensions().height

    const portIndex = ports.data.findIndex(({id}) => id === port.id);
    const camIndex = ports.data[portIndex].cameras.findIndex(({id}) => id === camera.id);
    const events = ports.data[portIndex].cameras[camIndex].events

    const [isOpenShipCard, setOpenShipCard] = useState(false);
    const [isToMany, setToMany] = useState(false);

    useEffect(() => {
        setToMany(testImageRef.current.offsetHeight >= windowHeight * eventsState.maxHeight);
    }, [testImageRef.current, useWindowDimensions().height, header.allNewNote, camera.id]);

    const handleClick = (id) => {
        ports.setImageId(id);
        ports.setCard(id);
        ports.setVisibleSelectedImage(true);
    }
    const handleDoubleClick = (id) => {
        ports.setImageId(id);
        ports.setCard(id);
        ports.setVisibleSelectedImage(true);
        setOpenShipCard(true);
    }
    const handleCloseShipCard = () => {
        setOpenShipCard(false);
    }

    const dangerEvent = (isDanger) => {
        const delay = 500;

        return (
            <div className={`${classes.dangerEvent} ${isDanger ? "show" : "hide"}`}>
                <Tooltip
                    enterDelay={delay}
                    enterNextDelay={delay}
                    title={<span className={classes.tooltipTitle}>{`This object Marked as Dangerous`}</span>}
                >
                    <IconButton className={classes.iconButton} aria-label="dangerous-event">
                        <ErrorIcon color={"secondary"}/>
                    </IconButton>
                </Tooltip>
            </div>
        )
    }

    const boatImage = events.map(({id, name, imageLink, typeVessel, isDanger}) => {
        const title = name ? `${name}` : `${typeVessel} - unknown`;


        return (
            <GridListTile
                key={id}
                cols={2}
                rows={2}
                onClick={() => handleClick(id)}
                onDoubleClick={() => handleDoubleClick(id)}
            >
                <img className={classes.image} src={`data:image/png;base64,${imageLink}`} alt={typeVessel}/>
                <ImageTitle title={`${title}`}/>
                {dangerEvent(isDanger)}
            </GridListTile>
        )
    });

    // const isToMany = data.length > 2 ? "toMany" : "";

    return (
        <div className={`${classes.testImage} ${isToMany ? "toMany" : ""}`} ref={testImageRef}>
            <GridList cellHeight={70} spacing={1}>
                {boatImage}
            </GridList>
            <ShipCard isOpen={isOpenShipCard} btnStyles={classes.btn} handleClose={() => handleCloseShipCard()}/>
        </div>
    );
})

export default BoatScrins;