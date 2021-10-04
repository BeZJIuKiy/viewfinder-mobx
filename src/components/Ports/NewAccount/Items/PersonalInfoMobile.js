import {makeStyles} from "@material-ui/core/styles";
import account from "../../../../store/account";
import {observer} from "mobx-react-lite";
import Button from "@material-ui/core/Button";
import React from "react";

const useStyles = makeStyles((theme) => ({
	personalInfoMobile: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	mobilePersonalInfo: {
		display: "flex",
		width: "100%",
		alignItems: "center",
	},
	mobilePersonalInfoAvatar: {
		display: "flex",

		width: 130,
		height: 130,
		minWidth: 130,
		minHeight: 130,

		borderRadius: "50%",

		backgroundImage: `url(${account.personalInformation.avatar})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	},
	mobilePersonalInfoData: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",

		width: "100%",
		textAlign: "left",
		paddingLeft: 20,
		margin: "0 5px",

		overflowX: "auto",
	},
	mobilePersonalInfoDataItem: {
		fontSize: "4vw",
		fontWeight: 500,

		"&.name": {
			fontSize: "5vw",
			fontWeight: 700,
		},

		"&.filed": {
			color: "#666",
			fontSize: "2.8vw",
			textTransform: "uppercase",
		},
		"&.data": {
			color: "#333",
			fontWeight: 700,
			textTransform: "uppercase",
		},
	},

	btn: {
		width: "80%",
		marginBottom: theme.spacing(1),
	},
}))
export const PersonalInfoMobile = observer(() => {
	const classes = useStyles();
	const {name, company, status, balance} = account.personalInformation;

	return (
		<div className={classes.personalInfoMobile}>
			<div className={classes.mobilePersonalInfo}>
				<div className={classes.mobilePersonalInfoAvatar}/>
				<div className={classes.mobilePersonalInfoData}>
					<div className={`${classes.mobilePersonalInfoDataItem} name`}>{name.first} {name.last}</div>
					<Button className={classes.btn} variant="outlined" color="default">
						Edit Profile
					</Button>
					<div className={classes.mobilePersonalInfoDataItem}>{company}</div>
					<div className={`${classes.mobilePersonalInfoDataItem} filed`}>COUNTRY: <span
						className={`${classes.mobilePersonalInfoDataItem} data`}>${balance}</span></div>
					<div className={`${classes.mobilePersonalInfoDataItem} filed`}>
						Status: <span className={`${classes.mobilePersonalInfoDataItem} data`}>{status}</span>
					</div>
				</div>
			</div>

		</div>
	)
});