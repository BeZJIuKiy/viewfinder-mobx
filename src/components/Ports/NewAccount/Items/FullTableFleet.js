import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import account from "../../../../store/account";
import {AccountTable} from "../../Account30/Items/AccountTable";
import React from "react";

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
export const FullTableFleet = observer(() => {
	const classes = useStyles();

	const fleet = account.myFleet.map((vessel) => ({
			id: vessel.id,
			"IMO": vessel.imo,
			"Name": vessel.name,
			"Vessel Type Detailed": vessel.vesselTypeDetailed,
			"Status": vessel.status,
			"MMSI": vessel.mmsi,
			"Call Sign": vessel.callSign,
			"Flag": vessel.flag,
			"Year Built": vessel.yearBuilt
		})
	)

	return (
		<div className={classes.smallTable}>
			<div className={classes.title}>Title</div>
			<AccountTable secretTitle={"Personal information: Full Fleet"} rowsData={fleet}
			              search={"IMO"} searchLabel={"Search IMO"}/>
		</div>
	)
})