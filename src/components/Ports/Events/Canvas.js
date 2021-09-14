import React, {useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite'
// import './canvas.scss'
import {useParams} from 'react-router-dom'
import Polygons from "./chageFigure/Polygons";
import canvasState from "../../../store/canvasState";
import ports from "../../../store/ports";
import {makeStyles} from "@material-ui/core/styles";
import backgroundImage320px from "../../Auth/images/background320px.jpg";
import {CameraControlPanel} from "./CameraControlPanel/CameraControlPanel";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
// import JSMpeg from "../../../../public/jsmpeg/jsmpeg.min"

const useStyles = makeStyles((theme) => {
    const {camera} = ports.selectedObjects

    return ({
        main: {
            width: "100%",
            height: "100%",
        },
        canvasDraw: {
            width: "100%",
            height: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            position: "relative",
        },
        cameraControlPanel: {
            position: "absolute",
            left: "50%",
            bottom: 10,
            zIndex: 1,

            transform: "translate(-50%, 0)",

            "&.show": {
                zIndex: 2,
            },
            "&.hide": {
                zIndex: -2,
            }
        },
        canvas: {
            background: "none",

            position: "absolute",
            top: "50%",
            left: "50%",
            // bottom: 0,
            // right: 0,
            display: "block",
            transform: "translate(-50%, -50%)",

            "&.show": {
                zIndex: 2,
            },
            "&.hide": {
                zIndex: -2,
            }
        },
        forPreview: {
            width: 800,
            height: 450,

            // backgroundImage: `url(${camera.link})`,
            backgroundImage: `url(${camera.previewLink})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
    })
});

export const Canvas = observer(() => {
    const canvasRef = useRef();
    const iframeRef = useRef();
    const params = useParams();
    const classes = useStyles();

    const windowSize = useWindowDimensions();

    const [width, setWidth] = useState(canvasState.size.width);
    const [height, setHeight] = useState(canvasState.size.height);
    const [ratio, setRatio] = useState({width: 1, height: 1});

    const displayResolution = (result) => {
        switch (Number(result.toFixed(3))) {
            case 1.25: {
                setWidth(800);
                setHeight(640);
                canvasState.pointCoefficient = canvasState.size.width / 800;
                console.log('1.25');
                break;
            }
            case 1.333: {
                setWidth(800);
                setHeight(600);
                canvasState.pointCoefficient = canvasState.size.width / 800;
                console.log('1.333');
                break;
            }
            case 1.5: {
                setWidth(720);
                setHeight(480);
                canvasState.pointCoefficient = canvasState.size.width / 720;
                console.log('1.5');
                break;
            }
            case 1.6: {
                setWidth(800);
                setHeight(500);
                canvasState.pointCoefficient = canvasState.size.width / 800;
                console.log('1.6');
                break;
            }
            case 1.667: {
                setWidth(800);
                setHeight(480);
                canvasState.pointCoefficient = canvasState.size.width / 800;
                console.log('1.667');
                break;
            }
            case 1.778: {
                // 2160p: 3840 x 2160
                // 1440p: 2560 x 1440
                // 1080p: 1920 x 1080
                // 720p: 1280 x 720
                // 480p: 854 x 480
                // 360p: 640 x 360
                // 240p: 426 x 240

                setRatio({
                    width: 16,
                    height: 9
                });

                // setWidth(800);
                // setHeight(450);
                //
                // canvasState.setPointCoefficient(canvasState.size.width / 800);
                // console.log('1.778');
                break;
            }
        }
    }

    useEffect(() => {
        // console.log(ratio);
        // console.log(iframeRef.current?.scrollWidth, iframeRef.current?.scrollHeight);

        const coefficient = iframeRef.current?.scrollWidth / ratio.width;
        const w = coefficient * ratio.width;
        const h = coefficient * ratio.height;

        // canvasState.setPointCoefficient((canvasState.size.width / w).toFixed(3))
        canvasState.setPointCoefficient(canvasState.size.width / w)

        setWidth(w);
        setHeight(h);

        canvasState.setCanvasReSize(w, h);
        // console.log(canvasState.canvasReSize.coefficient);

        // console.log(w, h, (w / h).toFixed(3), canvasState.pointCoefficient);

    }, [iframeRef.current?.offsetWidth, windowSize.width, ratio]);

    // useEffect(() => {
    //     console.log(11111);
    // }, [canvasState.canvasReSize.newSize.width]);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        displayResolution(width / height);
    }, []);
    useEffect(() => {
        // const socket = new WebSocket('ws://localhost:5000/');

        // canvasState.setSocket(socket);
        canvasState.setSocket("");
        canvasState.setSessionId(params.id);

        new Polygons(canvasRef.current, "", params.id);
        // new Polygons(canvasRef.current, socket, params.id);
    }, [width, ports.selectedObjects.camera]);

    return (
        <div className={classes.main}>
            <div className={classes.canvasDraw}>
                <iframe
                    src={ports.selectedObjects.camera.link}
                    width={"100%"} height={"100%"}
                    // width={width} height={height}
                    title="YouTube video player"
                    ref={iframeRef}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

                {/*<canvas id={"canvasTest"} style={{width: 800, height: 450}}/>*/}

                {/*<div className={classes.forPreview}/>*/}

                <canvas
                    className={`${classes.canvas} ${canvasState.isVisibleCameraCanvas ? "show" : "hide"}`}
                    ref={canvasRef} width={width} height={height}
                />

                <span
                    className={`${classes.cameraControlPanel} ${canvasState.isVisibleCameraCanvas ? "hide" : "show"}`}><CameraControlPanel/></span>
            </div>
        </div>
    )
})