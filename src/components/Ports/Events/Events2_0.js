import React, {useEffect, useState} from 'react';
import {TestList} from './TestList';
import {TestImage} from './TestImage';
import {BoatEvents} from './BoatEvents';
import {Header} from '../Header/Header';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import './events.css'
import ports from "../../../store/ports";
import header from "../../../store/header";
import {observer} from "mobx-react-lite";
import {Canvas} from "./Canvas";
import canvasState from "../../../store/canvasState";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    mainCameraControl: {
        width: "100%",
        display: "flex",

        "&>:nth-last-child(2)": {
            marginLeft: "auto",
        }
    },

    mainControlItems: {
        margin: "0 5px",

        "&.show": {
            display: "flex",
        },

        "&.hide": {
            display: "none",
        },
    },

    controlBtn: {
        "&.save": {
            backgroundColor: "green",
        },

        "&.cancel": {
            backgroundColor: "red",
        }
    },

}));

export const Events20 = observer(() => {
    const classes = useStyles();

    const {
        selectedObjects: {
            port, camera, event,
            shipImage: {isVisible: imageVisible, id: imageId},
        },
    } = ports;

    const {camerasNewNote} = header;

    if (!Number.isInteger(camera.id)) ports.setSelectedCamera(0);

    const [currentBoat, setCurrentBoat] = useState('');
    const [otherCameras, setOtherCameras] = useState();
    const [selectedEvent, setSelectedEvent] = useState(camera);

    useEffect(() => {
        setCurrentBoat(event.typeVessel);
        ports.setVisibleSelectedImage(false);
        ports.setImageId(-1);
    }, [event]);

    const findImageId = () => {
        const index = camera.events.findIndex(event => event.id === imageId);
        return camera.events[index > -1 ? index : 0];
    }

    useEffect(() => {
        setSelectedEvent(findImageId())
    }, [imageId]);

    const changeSelectedImg = (num) => {
        const id = selectedEvent.id;
        const cameraEvent = currentBoat
            ? camera.events.filter(e => e.typeVessel === currentBoat)
            : camera.events;

        const index = cameraEvent.findIndex((element) => element.id === id);
        const task = (index + num < 0 || index + num === cameraEvent.length);
        const imgNum = task ? index : index + num;

        setSelectedEvent(cameraEvent[imgNum]);
        ports.setImageId(cameraEvent[imgNum].id);
    }

    const otherCameraClick = (i) => {
        ports.setSelectedCamera(i);
    }

    const closeImage = () => {
        ports.setVisibleSelectedImage(false);
        ports.setImageId(-1);
    }

    useEffect(() => {
        setOtherCameras(port.cameras.data.map(({id, description, events, link}, i) => {
            if (id !== camera.id) {
                const notifications = camerasNewNote[i]
                    ? (
                        <IconButton color="inherit" style={{padding: '10px 0 0 5px'}}>
                            <Badge badgeContent={camerasNewNote[i]} color="secondary">
                                <NotificationsIcon color="primary"/>
                            </Badge>
                        </IconButton>
                    )
                    : ("");
                return (
                    <div className='events__live__another__cameras__item' key={id}>
                        <div className="events__live__go__another__camera"
                             onClick={() => otherCameraClick(i)}
                        />

                        <div className={`events__live__another__cameras title`}>
                            {description}
                            {notifications}
                        </div>

                        <iframe
                            width="100%" height="auto"
                            src={link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer;
                                   autoplay;
                                   clipboard-write;
                                   encrypted-media;
                                   gyroscope;
                                   picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )
            }
        }));
    }, [camera]);

    const visible = !!camera.events?.length ? "show" : "hide";
    const eventsTitle = !!camera.events?.length ? "Detected Objects" : "No Detected Objects";

    const width = canvasState.size.width / canvasState.pointCoefficient;
    const height = canvasState.size.height / canvasState.pointCoefficient;

    const btnControlName = canvasState.isVisibleCameraCanvas ? "Control Camera" : "Show Detected Areas";

    return (
        <div className='events'>
            <div>
                <Header/>

                <div className='events__container'>
                    <div className='events__content'>
                        <div className='events__camera'>
                            <div className={`events__camera__item container`}>
                                <div className={`events__camera__item title`}>{eventsTitle}</div>
                                <div className={`events__camera__item events__and__image`}>
                                    <div className={`events__camera__item ${visible}`}>
                                        <TestList/>
                                    </div>
                                    <div className={`events__camera__item ${visible}`}>
                                        <TestImage/>
                                    </div>
                                </div>
                            </div>

                            <div className={`events__live ${imageVisible ? 'hide' : 'show'}`}>
                                <div className='events__live__camera'>
                                    <div className={`events__live__camera__title`}>
                                        Selected Camera
                                    </div>

                                    <div>
                                        <Canvas/>
                                    </div>

                                    <div className={classes.mainCameraControl}>
                                        <div className={classes.mainControlItems}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={canvasState.reVisibleCameraCanvas}
                                            >
                                                {btnControlName}
                                            </Button>
                                        </div>
                                        <div className={`${classes.mainControlItems} ${canvasState.isVisibleCameraCanvas ? "show" : "hide"}`}>
                                            <Button variant="contained" color="secondary">
                                                Create control zones
                                            </Button>
                                        </div>

                                        <div className={classes.mainControlItems}>
                                            <Button className={`${classes.controlBtn} save`} variant="contained">
                                                Save
                                            </Button>
                                        </div>
                                        <div className={classes.mainControlItems}>
                                            <Button className={`${classes.controlBtn} cancel`} variant="contained">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className='events__live__another__cameras'>
                                    <div className={`events__live__camera__title`}>
                                        Other Cameras
                                    </div>
                                    {otherCameras}
                                </div>
                            </div>

                            <div className={`events__image ${imageVisible ? 'show' : 'hide'}`}>
                                <div className='events__image__boat'>
                                    <div className={`events__image__boat title`}>
                                        {`${selectedEvent?.time} ${selectedEvent?.typeVessel}`}
                                    </div>
                                    <div className={`events__image__boat img`}>
                                        <div className={`events__image__boat close`}>
                                            <IconButton
                                                style={{color: 'black'}} aria-label="add an alarm"
                                                onClick={closeImage}
                                            >
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>

                                        <IconButton
                                            style={{color: '#333'}} aria-label="add an alarm"
                                            onClick={() => changeSelectedImg(-1)}
                                        >
                                            <ArrowForwardIosIcon
                                                className={`events__image__boat left__arrow`}
                                                fontSize="large"
                                            />
                                        </IconButton>

                                        <img
                                            style={{width, height, marginBottom: 5}}
                                            src={selectedEvent?.imageLink} alt={""}
                                        />

                                        <IconButton
                                            style={{color: '#333'}} aria-label="add an alarm"
                                            onClick={() => changeSelectedImg(+1)}
                                        >

                                            <ArrowForwardIosIcon fontSize="large"/>
                                        </IconButton>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`events__container`}>
                <div className='events__footer'>
                    <BoatEvents/>
                </div>
            </div>
        </div>
    )
});