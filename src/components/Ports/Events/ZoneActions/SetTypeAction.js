import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import canvasState from "../../../../store/canvasState";
import {observer} from "mobx-react-lite";
import {DEFAULT, ZONE_TYPE_IN_OUT, ZONE_TYPE_PARKING, ZONE_TYPE_RESTRICTED_AREA} from "../chageFigure/Polygon";
import ports from "../../../../store/ports";
import Polygons from "../chageFigure/Polygons";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 140,
    },

    text: {
        fontWeight: 500,
        textTransform: "uppercase",
    }
}));

export const SetTypeAction = observer(() => {
    const classes = useStyles();
    const [type, setType] = useState("");

    useEffect((e) => {
        if (Number.isInteger(canvasState.currentPolygonNum)) {
            console.log(canvasState.saveDataTest[ports.selectedObjects.camera.id])
            // const curType = canvasState.test.get(ports.selectedObjects.camera.id)[canvasState.currentPolygonNum].getAttributeType();
            const curType = canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum].getAttributeType();
            switch (curType) {
                case ZONE_TYPE_IN_OUT: {
                    setType(ZONE_TYPE_IN_OUT);
                    break;
                }

                case ZONE_TYPE_PARKING: {
                    setType(ZONE_TYPE_PARKING);
                    break;
                }

                case ZONE_TYPE_RESTRICTED_AREA: {
                    setType(ZONE_TYPE_RESTRICTED_AREA);
                    break;
                }

                default: {
                    setType("");
                }
            }
        }
    }, [canvasState.currentPolygonNum])

    const handleChange = (e) => {
        switch (e.target.value) {
            case ZONE_TYPE_IN_OUT: {
                canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum].setAttributeType(ZONE_TYPE_IN_OUT)
                // canvasState.test.get(ports.selectedObjects.camera.id)[canvasState.currentPolygonNum].setAttributeType(ZONE_TYPE_IN_OUT)
                break;
            }

            case ZONE_TYPE_PARKING: {
                canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum].setAttributeType(ZONE_TYPE_PARKING)
                // canvasState.test.get(ports.selectedObjects.camera.id)[canvasState.currentPolygonNum].setAttributeType(ZONE_TYPE_PARKING)
                break;
            }

            case ZONE_TYPE_RESTRICTED_AREA: {
                canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum].setAttributeType(ZONE_TYPE_RESTRICTED_AREA)
                break;
            }

            default: {
                canvasState.saveDataTest[ports.selectedObjects.camera.id][canvasState.currentPolygonNum].setAttributeType("DEFAULT")
            }
        }

        new Polygons(canvasState.canvas, canvasState.socket, canvasState.sessionId);
        setType(e.target.value);
    };

    return (
        <div>
            <FormControl
                className={classes.formControl}
                variant="outlined"
                disabled={!canvasState.isPolygonSelected}
            >
                <InputLabel id="type-action-label">Selected Type</InputLabel>
                <Select
                    className={classes.text}
                    labelId="type-action-label"
                    id="type-action"
                    value={type}
                    onChange={handleChange}
                    label="Selected Type"
                >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    <MenuItem className={classes.text} value={ZONE_TYPE_IN_OUT}>IN/OUT</MenuItem>
                    <MenuItem className={classes.text} value={ZONE_TYPE_PARKING}>PARKING</MenuItem>
                    <MenuItem className={classes.text} value={ZONE_TYPE_RESTRICTED_AREA}>RESTRICTED AREA</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
})
