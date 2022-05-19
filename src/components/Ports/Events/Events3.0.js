import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Header } from "../Header/Header";
import { TestImage } from "./TestImage";
import { Canvas } from "./Canvas";
import { BoatEvents } from "./BoatEvents";
import { Hidden } from "@material-ui/core";
import { DrawControl } from "./CameraControlPanel/DrawControl";
import ports from "../../../store/ports";
import { OtherCameras } from "./OtherCameras";
import { ShipScreen } from "./ShipScreen";
import { observer } from "mobx-react-lite";
import styles from "../../../store/styles";
import canvasState from "../../../store/canvasState";
import { DrawerSearch } from "../Drawer/DrawerSearch";
import List from "@material-ui/core/List";
import { DrawerItems } from "../Drawer/DrawerItems";
import header from "../../../store/header";
import { OtherCamerasMobileDrawer } from "./OtherCamerasMobileDrawer";
import { AccountTable } from "../NewAccount/Items/AccountTable";
import { DetectedAreasList } from "./ChangeFigure/DetectedAreasList";
import eventsState from "../../../store/eventsState";

const useStyles = makeStyles((theme) => ({
    event: {
        flexGrow: 1,
        minHeight: "100%",

        color: "#ddd",
        fontFamily: styles.fontFamily,
        fontWeight: 500,

        // background: "rgba(51,51,51,0.5)",

        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        position: "relative",
    },
    gridContainer: {
        minHeight: "100%",

        flexGrow: 1,
        margin: 0,
    },

    gridItem: {
        "&.drawControl": {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },

    secondGridContainer: {
        minHeight: "100%",
        margin: 0,

        "&.drawControl": {
            "&.show": {
                display: "flex",
            },

            "&.hide": {
                display: "none",
            },
        },
        "&.tableEvents": {},
        "&.fourthPart": {
            overflowY: "auto",
        },
    },

    types: {
        width: "100%",
        height: "100%",

        textAlign: "center",
        margin: "0 auto",

        alignItems: "center",

        "&.drawControl": {
            marginLeft: -4,
        },

        position: "relative",

        "&.show": {
            display: "block",
        },
        "&.hide": {
            display: "none",
        },
    },
    correctingPosition: {
        paddingTop: styles.headerHeight,
        marginRight: 24,
    },
    container: {},
}));

export const Events30 = observer(() => {
    const classes = useStyles();

    const {
        selectedObjects: {
            port,
            camera,
            event,
            shipImage: { isVisible: imageVisible, id: imageId },
        },
    } = ports;

    const gridContainerItem = (
        component,
        classPrefix = "",
        divClassPrefix = ""
    ) => {
        return (
            <Grid
                container
                className={`${classes.secondGridContainer} ${classPrefix}`}
            >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${classes.types} ${divClassPrefix}`}>
                        {component}
                    </div>
                </Grid>
            </Grid>
        );
    };
    const mainCamera = () => {
        return (
            <Grid
                container
                className={`${classes.secondGridContainer} mainCamera`}
            >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${classes.types} ${imageVisible ? "hide" : "show"}`}>
                        <Canvas />
                    </div>

                    <div className={`${classes.types} ${imageVisible ? "show" : "hide"}`}>
                        <ShipScreen />
                    </div>
                </Grid>
            </Grid>
        );
    };
    const twoComponents = (
        firstComponent,
        secondComponent,
        isComparison,
        classPrefix = ""
    ) => {
        return (
            <Grid
                container
                className={`${classes.secondGridContainer} ${classPrefix}`}
            >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div
                        className={`${classes.types} ${isComparison ? "hide" : "show"}`}
                    >
                        {firstComponent}
                    </div>

                    <div
                        className={`${classes.types} ${isComparison ? "show" : "hide"}`}
                    >
                        {secondComponent}
                    </div>
                </Grid>
            </Grid>
        );
    };

    if (!Number.isInteger(camera.id)) {
        ports.setSelectedCamera(ports.data[0].cameras[0].id);
    }

    return (
        <div className={`${classes.event}`}>
            <Header
                mobileDrawer={{ component: <OtherCamerasMobileDrawer /> }}
            />
            <Container maxWidth="xl" className={classes.container}>
                <div className={classes.correctingPosition}>
                    <Grid
                        container
                        spacing={3}
                        justify={"center"}
                        className={classes.gridContainer}
                    >
                        <Hidden smDown>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                {gridContainerItem(<TestImage />)}
                            </Grid>
                        </Hidden>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            {mainCamera()}
                            {/*{gridContainerItem(imageVisible ? <ShipScreen/> : <Canvas/>)}*/}
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                {/*{gridContainerItem(<OtherCameras/>)}*/}
                                {twoComponents(
                                    <OtherCameras />,
                                    <DetectedAreasList />,
                                    eventsState.isVisibleCameraCanvas
                                )}
                            </Grid>
                        </Hidden>

                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
								className={`${classes.gridItem} drawControl`}
                            >
                                {gridContainerItem(<DrawControl />, "drawControl", "drawControl")}
                            </Grid>
                        </Hidden>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {gridContainerItem(<BoatEvents />)}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
});
