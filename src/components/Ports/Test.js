import React from 'react';
import {AccountTable} from "./Account30/Items/AccountTable";
import account from "../../store/account";
import ports from "../../store/ports";
import {makeStyles} from "@material-ui/core/styles";
import {SignIn} from "../Auth/SinginIn/SinginIn";

const useStyles = makeStyles((theme) => ({
	main: {
		backgroundColor: "red",

		'@media(max-width: 320px)' : {
			// margin: "0px 10px",
		}
	},
}))

export const Test = () => {
	const classes = useStyles();

	const allFleetFull = () => {
		return account.myFleet.map((vessel) => ({
				id: vessel.id,
				"IMO": String(vessel.imo),
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

	fetch('http://192.168.250.183:8080/api/boats')
		.then(response => response.json())
		.then(data => console.log(data));

	return (
		<div className={classes.main}>
			{/*<AccountTable rowsData={allFleetFull()} title={"Fleet"} search={"IMO"} secretTitle={"Test: full Fleet"}/>*/}
			{/*<AccountTable rowsData={allDevicesShort()} title={"Devices"} search={"Camera Name"} secretTitle={"Test: short Devices"}/>*/}
			{/*<AccountTable rowsData={allFleetShort()} title={"Fleet"} search={"IMO"} secretTitle={"Test: short Fleet"}/>*/}

			<SignIn/>
		</div>
	);
};
