import React, {useEffect, useState} from 'react';
import {Header} from './Header/Header';
import {Drawer} from './Drawer/Drawer';
import YaMap from './YaMap/YaMap';
import './ports.css';
import {NewMap} from './NewMap/NewMap';
import {useWindowDimensions} from "../../useHooks/useWindowDimensions";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => {
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    console.log(scrollHeight);
    // console.log(window.screen.availHeight);

    return ({
        main: {
            width: "100%",
            height: scrollHeight,
        },

        mobileDrawer: {
            width: "100%",

            display: "flex",

            position: "absolute",

            // top: "100%",
            // left: "100%",
            bottom: 0,
            left: 0,
            zIndex: 1,

            // transform: "translate(-100%, -100%)",
            // overflowY: "hidden",
        },
        mobileDrawerTest: {
            // width: "100%",
        },
        map: {
            display: "flex",

            position: "absolute",
            top: 70,
            left: 320,
            zIndex: 1,

            "@media(max-width: 425px)": {
                top: 72,
                left: 10,
            },
        }
    })
})

export const Ports = () => {
    const classes = useStyles();

    const { height, width } = useWindowDimensions();

    const [mapVisible, setmapVisible] = useState(true);
    const addtype = ["Yamap", "NewMap"];

    const handlerMapChange = () => setmapVisible(!mapVisible);
    const isMobile = (width <= 425);
    const drawer = isMobile ? "" : <Drawer isMobile={isMobile} />;
    const mobileDrawer = isMobile ? <Drawer isMobile={isMobile} /> : "";

    console.log(width, height)

    return (
        <div className={classes.main}>
            <Header />
            <div className="searcher">
                {drawer}
                <YaMap isVisible={mapVisible} />
                <NewMap isVisible={!mapVisible} />
            </div>

            <div className={classes.mobileDrawer}>
                {mobileDrawer}
            </div>

            <div className={`${classes.map}`}>
                <select
                    onChange={handlerMapChange}
                    className="browser-default custom-select" >{
                        addtype.map((address, key) => <option value={key} key={key}>{address}</option>)
                    }
                </select >
            </div>
        </div>
    )
}