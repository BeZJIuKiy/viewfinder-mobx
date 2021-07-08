import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite'
import './canvas.scss'
import { useParams } from 'react-router-dom'
import Polygons from "./chageFigure/Polygons";
import canvasState from "../../../store/canvasState";
import ports from "../../../store/ports";


export const Canvas = observer(() => {
    const canvasRef = useRef();
    const iframeRef = useRef();
    const params = useParams();

    const [width, setWidth] = useState(canvasState.size.width);
    const [height, setHeight] = useState(canvasState.size.height);

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
                setWidth(800);
                setHeight(450);

                canvasState.pointCoefficient = canvasState.size.width / 800;
                console.log('1.778');
                break;
            }
        }
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        displayResolution(width/height);
    }, []);

    useEffect(() => {
            const socket = new WebSocket('ws://localhost:5000/');

            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);

            new Polygons(canvasRef.current, socket, params.id);
    }, [ports.selectedObjects.camera]);

    return (
        <div className="canvas">
            <div className="canvas_draw">
                <iframe
                    src="https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1"
                    width={width} height={height} title="YouTube video player"
                    ref={iframeRef}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
                <canvas ref={canvasRef} width={width} height={height} />
                {/*<canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={width} height={height} />*/}
            </div>
        </div>
    )
})