import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ports from "../../../../store/ports";
import React from "react";
import {AccountTable} from "./AccountTable";

const useStyles = makeStyles((theme) => ({
	smallTable: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		minHeight: "100%",
	},

	title: {
		textAlign: "center",
		fontWeight: "500",
		fontSize: 24,
	}
}))
export const FullTableDevices = observer(() => {
	const classes = useStyles();

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

	return (
		<div className={classes.smallTable}>
			<div className={classes.title}>Title</div>
			<AccountTable secretTitle={"Personal information: Full Devices"} rowsData={devices}
			              search={"Title"} searchLabel={"Devices Name"}/>
		</div>
	)
})