import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AccordionFromTable} from "./Account30/Items/Accordion";
import account from "../../store/account";
import ports from "../../store/ports";

const useStyles = makeStyles({});

export const Test = () => {
	const allFleetShort = () => {
		return account.myFleet.map((vessel) => ({
				id: vessel.id,
				"IMO": vessel.imo,
				"Name": vessel.name,
				"Vessel Type Detailed": vessel.vesselTypeDetailed,
			})
		)
	};
	const allFleetFull = () => {
		return account.myFleet.map((vessel) => ({
				id: vessel.id,
				"IMO": vessel.imo,
				"Name": vessel.name,
				"Vessel Type Generic": vessel.vesselTypeGeneric,
				"Vessel Type Detailed": vessel.vesselTypeDetailed,
				"Status": vessel.status,
				"MMSI": vessel.mmsi,
				"Call Sign": vessel.callSign,
				"Flag": vessel.flag,
				"Year Built": vessel.yearBuilt
			})
		)
	};

	const allDevicesShort = () => {
		const devices = [];
		ports.data.forEach(({cameras}) => {
			cameras.forEach(camera => {
				devices.push({
					id: camera.id,
					"Country": camera.country,
					"City": camera.city,
					"Camera Name": camera.description,
				});
			})
		})

		return devices;
	};
	const allDevicesFull = () => {
		const devices = [];
		ports.data.forEach(({cameras}) => {
			cameras.forEach(camera => {
				devices.push({
					id: camera.id,
					"Country": camera.country,
					"City": camera.city,
					"Camera Name": camera.description,
					"Type": camera.type,
					"PTZ/STATIC": camera.move,
					"Viewing Angle": camera.viewingAngle,
					"Coordinates": `${camera.coordinates[0]}°, ${camera.coordinates[1]}°`
				});
			})
		})

		return devices;
	};


	return (
		<div>
			<AccordionFromTable tableData={allFleetFull()} header={"IMO"}/>
			{/*<AccordionFromTable tableData={allFleetShort()} header={"IMO"}/>*/}
			{/*<AccordionFromTable tableData={allDevicesShort()} header={"Country"}/>*/}
		</div>
	);
}