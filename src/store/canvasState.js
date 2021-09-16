import {makeAutoObservable} from "mobx";
import {makePersistable} from "mobx-persist-store";

class CanvasState {
    canvas = null;
    socket = null;
    sessionId = null;

    userName = "alex";

    /* To EVENTS */
    // isVisibleCameraCanvas = false;
    // isCreatePolygon = false;
    // zoneAction = "";

    tempPolygons = [];

    size = {
        /* Test 1.25 5:4 */
        // width: 800,
        // height: 640,

        /* Test 1.333 4:3 */
        // width: 1600,
        // height: 1200,
        // width: 800,
        // height: 600,

        /* Test 1.5 3:2 */
        // width: 720,
        // height: 480,

        /* Test 1.6 16:10 */
        // width: 800,
        // height: 500,

        /* Test 1.667 5:3 */
        // width: 800,
        // height: 480,

        /* Test 1.778 16:9 */
        // width: 1280,
        // height: 720,
        // width: 800,
        // height: 450,
        width: 1920,
        height: 1080,
    }

    pointCoefficient = 1;

    /* Размеры элемента Canvas */
    canvasReSize = {
        coefficient: {
            width: 1,
            height: 1,
        },

        oldSize: {
            width: 1,
            height: 1,
        },

        newSize: {
            width: 1,
            height: 1,
        },
    }

    username = "";

    readyRectCounter = 0;
    isPolygonSelected = false;
    currentPolygonNum = null;

    saveDataTest = {};

    constructor() {
        // makeAutoObservable(this);

        makeAutoObservable(this, {}, {autoBind: true});

        // makePersistable(this, {
        //     name: "CanvasStore",
        //     properties: [
        //         // "canvas",
        //         // "socket",
        //         // "sessionId",
        //         "userName",
        //         "isVisibleCameraCanvas",
        //         "isCreatePolygon",
        //         "zoneAction",
        //         "tempPolygons",
        //         "size",
        //         "pointCoefficient",
        //         "canvasSize",
        //         "username",
        //         "readyRectCounter",
        //         "isPolygonSelected",
        //         "currentPolygonNum",
        //         "saveDataTest",
        //         // "test",
        //     ],
        //     storage: window.localStorage
        // });

        // console.log(ports)
        // if (ports.selectedObjects.camera.id)
    }

    setCanvasReSize = (width, height) => {
        this.canvasReSize.oldSize.width = this.canvasReSize.newSize.width;
        this.canvasReSize.oldSize.height = this.canvasReSize.newSize.height;

        this.canvasReSize.newSize.width = width;
        this.canvasReSize.newSize.height = height;


        this.canvasReSize.coefficient.width = this.canvasReSize.newSize.width / this.canvasReSize.oldSize.width;
        this.canvasReSize.coefficient.height = this.canvasReSize.newSize.height / this.canvasReSize.oldSize.height;

        for (const id in this.saveDataTest) {
            this.saveDataTest[id].forEach((polygon) => {
                const points = polygon.getPoints();
                const newPoints = [];

                for (let i = 0; i < points.length; ++i) {
                    newPoints.push({
                        id: points[i].id,
                        x: points[i].x * this.canvasReSize.coefficient.width,
                        y: points[i].y * this.canvasReSize.coefficient.height,
                    })
                }

                polygon.setPoints(newPoints);
            })
        }
    }


    /* To EVENTS */
    // setVisibleCameraCanvas = (isVisible) => {
    //     this.isVisibleCameraCanvas = isVisible;
    // }
    // reVisibleCameraCanvas = () => {
    //     this.isVisibleCameraCanvas = !this.isVisibleCameraCanvas;
    // }
    //
    // setCreatePolygon = (isVisible) => {
    //     this.isCreatePolygon = isVisible;
    // }
    // reCreatePolygon = () => {
    //     this.isCreatePolygon = !this.isCreatePolygon;
    // }
    //
    // setZoneAction = (action) => {
    //     this.zoneAction = action;
    // }


    setSessionId(id) {
        this.sessionId = id;
    }

    setSocket(socket) {
        this.socket = socket;
    }

    setUsername(username) {
        this.username = username;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    incReadyRectCounter() {
        ++this.readyRectCounter;
    }

    setPolygonInCamera = (id) => {
        if (Number.isInteger(this.saveDataTest[id]?.length)) return;
        this.saveDataTest[id] = [];

        // if (this.test.has(id)) return;
        //
        // const polygons = [];
        // this.test.set(id, polygons);
    }

    addPolygon(camId, polygon) {
        this.saveDataTest[camId].push(polygon);
    }

    changePolygon(camId, index, polygon) {
        this.saveDataTest[camId].splice(index, 1, polygon);
    }

    setPolygonSelect = (isSelect) => {
        this.isPolygonSelected = isSelect;
    }

    setCurrentPolygonNum = (number) => {
        this.currentPolygonNum = number;
    }

    setPointCoefficient = (coefficient) => {
        this.pointCoefficient = coefficient;
    }

    deletePolygon(camId, index) {
        this.saveDataTest[camId].splice(index, 1);

        // const polygons = this.test.get(camId);
        // polygons.splice(index, 1);
    }

}

export default new CanvasState();