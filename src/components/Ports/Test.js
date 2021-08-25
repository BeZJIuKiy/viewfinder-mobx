import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import YaMap from "./YaMap/YaMap";
import {Drawer} from "./Drawer/Drawer";
import {Header} from "./Header/Header";

const useStyles = makeStyles({
	header: {
		width: "100%",
	},

	content: {
		display: "flex",
	},

	contentItem: {
		flexGrow: 2,

		"&.map": {
			flexGrow: 5,
		}
	},
});

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
	const classes = useStyles();

	return (
		<div>
			<Header/>
			<div className={classes.content}>
				<div className={`${classes.contentItem}`}><Drawer/></div>
				<div className={`${classes.contentItem} map`}><YaMap isVisible={true}/></div>
			</div>
		</div>
	)
}