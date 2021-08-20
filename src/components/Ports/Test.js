import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AccordionFromTable} from "./Account30/Items/Accordion";
import account from "../../store/account";
import ports from "../../store/ports";
import canvasState from "../../store/canvasState";

const useStyles = makeStyles({});

// export const Test = () => {
// 	const allFleetShort = () => {
// 		return account.myFleet.map((vessel) => ({
// 				id: vessel.id,
// 				"IMO": vessel.imo,
// 				"Name": vessel.name,
// 				"Vessel Type Detailed": vessel.vesselTypeDetailed,
// 			})
// 		)
// 	};
// 	const allFleetFull = () => {
// 		return account.myFleet.map((vessel) => ({
// 				id: vessel.id,
// 				"IMO": vessel.imo,
// 				"Name": vessel.name,
// 				"Vessel Type Generic": vessel.vesselTypeGeneric,
// 				"Vessel Type Detailed": vessel.vesselTypeDetailed,
// 				"Status": vessel.status,
// 				"MMSI": vessel.mmsi,
// 				"Call Sign": vessel.callSign,
// 				"Flag": vessel.flag,
// 				"Year Built": vessel.yearBuilt
// 			})
// 		)
// 	};
//
// 	const allDevicesShort = () => {
// 		const devices = [];
// 		ports.data.forEach(({cameras}) => {
// 			cameras.forEach(camera => {
// 				devices.push({
// 					id: camera.id,
// 					"Country": camera.country,
// 					"City": camera.city,
// 					"Camera Name": camera.description,
// 				});
// 			})
// 		})
//
// 		return devices;
// 	};
// 	const allDevicesFull = () => {
// 		const devices = [];
// 		ports.data.forEach(({cameras}) => {
// 			cameras.forEach(camera => {
// 				devices.push({
// 					id: camera.id,
// 					"Country": camera.country,
// 					"City": camera.city,
// 					"Camera Name": camera.description,
// 					"Type": camera.type,
// 					"PTZ/STATIC": camera.move,
// 					"Viewing Angle": camera.viewingAngle,
// 					"Coordinates": `${camera.coordinates[0]}°, ${camera.coordinates[1]}°`
// 				});
// 			})
// 		})
//
// 		return devices;
// 	};
//
//
// 	return (
// 		<div>
// 			<AccordionFromTable tableData={allFleetFull()} header={"IMO"}/>
// 			{/*<AccordionFromTable tableData={allFleetShort()} header={"IMO"}/>*/}
// 			{/*<AccordionFromTable tableData={allDevicesShort()} header={"Country"}/>*/}
// 		</div>
// 	);
// }

export const Test = () => {
	ports.setSelectedPort(0);
	ports.setSelectedCamera(0);

	const getPoints = () => {
		try {
			const url = "http://192.168.250.183:8080/api/positions";
			// const url = "https://jsonplaceholder.typicode.com/users";
			fetch(url)
				.then(response => response.json())
				.then(data => console.log(data));

		} catch (e) {
			console.log(e)
		}
	};
	const postPoints = async () => {
		// const pointsToSend = this.polygons.map((polygon) =>
		const pointsToSend = canvasState.test.get(ports.selectedObjects.camera.id).map((polygon) =>
			polygon.getPoints().map((point) => ({
				...point, x: point.x * canvasState.pointCoefficient, y: point.y * canvasState.pointCoefficient
			}))
		);

		console.log(pointsToSend);

		try {
			const url = "http://192.168.250.183:8080/api/positions";

			// const response = await fetch(url, {
			// 	method: "POST", // *GET, POST, PUT, DELETE, etc.
			// 	mode: "cors", // no-cors, *cors, same-origin
			// 	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			// 	credentials: "same-origin", // include, *same-origin, omit
			// 	headers: {
			// 		"Content-Type": "application/json"
			// 		// 'Content-Type': 'application/x-www-form-urlencoded',
			// 	},
			// 	redirect: "follow", // manual, *follow, error
			// 	referrerPolicy: "no-referrer", // no-referrer, *client
			// 	body: JSON.stringify(pointsToSend), // body data type must match "Content-Type" header
			// })
		} catch (e) {
			console.log(e)
		}
	}

	postPoints();
	// getPoints();

	return <div>123</div>
}