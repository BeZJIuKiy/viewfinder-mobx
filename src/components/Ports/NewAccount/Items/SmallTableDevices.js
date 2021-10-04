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
export const SmallTableDevices = observer(() => {
	const classes = useStyles();

	const devices = [];
	ports.data.forEach(({cameras}) => {
		cameras.forEach(camera => {
			devices.push({
				id: camera.id,
				"Country": camera.country,
				"City": camera.city,
				"Title": camera.description,
			});
		})
	})

	return (
		<div className={classes.smallTable}>
			<div className={classes.title}>Title</div>
			<AccountTable secretTitle={"Personal information: short Devices"} rowsData={devices}
			              search={"Title"} searchLabel={"Devices Name"}/>
		</div>
	)
})