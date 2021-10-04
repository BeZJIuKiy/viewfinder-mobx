import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import account from "../../../../store/account";
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
export const SmallTableFleet = observer(() => {
	const classes = useStyles();

	const fleet = account.myFleet.map((vessel) => ({
			id: vessel.id,
			"IMO": vessel.imo,
			"Name": vessel.name,
			"Type": vessel.vesselTypeDetailed,
		})
	)

	return (
		<div className={classes.smallTable}>
			<div className={classes.title}>Title</div>
			<AccountTable secretTitle={"Personal information: Short Fleet"} rowsData={fleet}
			              search={"IMO"} searchLabel={"Search IMO"}/>
		</div>
	)
})