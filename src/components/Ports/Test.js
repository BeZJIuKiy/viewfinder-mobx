import React from 'react';
import {AccountTable} from "./Account30/Items/AccountTable";
import account from "../../store/account";
import ports from "../../store/ports";

export const Test = () => {
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
	const allFleetShort = () => {
		return account.myFleet.map((vessel) => ({
				id: vessel.id,
				"IMO": vessel.imo,
				"Name": vessel.name,
				"Vessel Type Detailed": vessel.vesselTypeDetailed,
			})
		)
	};

	return (
		<div>
			<AccountTable rowsData={allFleetFull()}/>
			<AccountTable rowsData={allDevicesShort()}/>
			<AccountTable rowsData={allFleetShort()}/>
		</div>
	);
};
