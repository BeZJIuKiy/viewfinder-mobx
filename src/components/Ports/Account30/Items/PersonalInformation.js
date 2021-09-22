import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import account, {DEVICES, FLEET, PERSONAL_INFORMATION} from "../../../../store/account";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Badge from "@material-ui/core/Badge";
import {NavLink} from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {FleetTable} from "../../Account/DataTable/FleetTable";
import {DevicesTable} from "../../Account/DataTable/DevicesTable";
import {SmallDevicesTable20} from "../../Account/DataTable/SmallFleetTable20";


import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {observer} from "mobx-react-lite";
import {AccountTable} from "./AccountTable";
import ports from "../../../../store/ports";
import {useWindowDimensions} from "../../../../useHooks/useWindowDimensions";
import {AccordionFromTable} from "./Accordion";
import styles from "../../../../store/styles";


const useStyles = makeStyles((theme) => {
	const {avatar} = account.personalInformation;

	return ({
		root: {
			width: "100%",

			marginTop: 10,

			"@media(max-width: 425px)": {
				alignItems: "flex-start",
			},
		},
		heading: {
			fontSize: theme.typography.pxToRem(11),
			flexBasis: '33.33%',
			flexShrink: 0,

			fontFamily: styles.fontFamily,
			fontWeight: 600,
			color: theme.palette.text.secondary,
			textTransform: "uppercase",

			margin: "auto 0",
		},
		secondaryHeading: {
			marginLeft: "-12%",

			fontFamily: styles.fontFamily,
			fontWeight: 600,
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.primary,

			"@media(max-width: 425px)": {
				marginLeft: "-10%",
			},
		},
		desktopPersonalInfo: {
			width: "100%",

			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			textAlign: "left",

			"@media(max-width: 425px)": {
				display: "none",
			},
		},
		accordion: {
			width: "100%",
		},
		mainContainer: {
			height: "calc(100% - 20px)",

			margin: "20px 0",
			position: "relative",

			"@media(max-width: 425px)": {
				margin: 0,
			},
		},
		substrate: {
			position: "absolute",

			width: "100%",
			height: "100%",

			top: "50%",
			left: "50%",
			zIndex: -1,
			transform: "translate(-50%, -50%)",

			backgroundColor: "#ddd",
			borderRadius: 10,

			opacity: 0.7,
		},
		personalData: {
			display: "flex",
			flexGrow: 1,

			"@media(max-width: 425px)": {
				flexDirection: "column",
			},
		},
		personalDataItem: {
			flexDirection: "column",
			flexGrow: 1,

			"@media(max-width: 425px)": {
				// margin: "10px 0px",
			},
		},
		personalDataContentLeft: {
			minWidth: 580,
			height: "calc(100% - 20px)",

			margin: "20px 10px 20px 20px",
			padding: "10px 40px",
			backgroundColor: "#fff",
			borderRadius: 10,

			textAlign: "center",

			"@media(max-width: 425px)": {
				minWidth: 0,
				padding: 10,
				margin: "20px 20px 10px 20px",
			},
		},
		personalDataContentRight: {
			margin: "20px 20px 0px 10px",
			padding: "10px 40px",
			backgroundColor: "#fff",
			borderRadius: 10,

			textAlign: "center",

			"@media(max-width: 425px)": {
				margin: "10px 20px 20px 20px",
				padding: 10,
			},
		},
		mainTitle: {
			fontWeight: 500,
			fontSize: "1.5vw",

			"@media(max-width: 425px)": {
				display: "none",
				fontSize: "7vw",
			},
		},
		mainSubtitle: {
			fontSize: "1.0vw",

			"@media(max-width: 425px)": {
				display: "none",
				fontSize: "4vw",
			},
		},
		content: {
			display: "flex",
			flexDirection: "column",

			marginTop: 15,
			alignItems: "center",

			"&.right": {
				maxHeight: "340px",
				overflowY: "auto",
			},
		},
		avatar: {
			width: "12vw",
			height: "100%",

			minWidth: 150,
			minHeight: 200,
			margin: "5px 0px",
		},
		actions: {
			width: "100%",
		},
		actionItemName: {
			width: "10vw",
			minWidth: 100,
			maxWidth: 200,

			fontSize: 11,
			textTransform: "uppercase",
			color: "#777",
		},
		actionItemAction: {
			width: "100%",
			color: "#444",
		},
		quickPay: {
			width: "100%",

			display: "flex",
			justifyContent: "center",

			"@media(max-width: 320px)": {
				width: "100%"
			},
		},
		btn: {
			width: "5vw",
			margin: "0px 3px",
			fontFamily: styles.fontFamily,
			fontWeight: 500,

			"@media(max-width: 425px)": {
				margin: "0px 2px",
			},

			"@media(max-width: 320px)": {
				// display: "none",
			},
		},

		mobilePersonalInfo: {
			display: "none",
			width: "100%",

			"@media(max-width: 425px)": {
				display: "flex",

				"&.editBtn": {
					justifyContent: "center",
				},
			},
		},
		mobilePersonalInfoAvatar: {
			display: "flex",

			minWidth: 130,
			minHeight: 130,

			borderRadius: "50%",

			backgroundImage: `url(${avatar})`,
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
		editBtn: {
			width: "90vw",
			marginTop: 30,
			fontFamily: styles.fontFamily,

			fontSize: "4vw",
			color: "#f5f5f5",
			fontWeight: 500,
			border: "none",
			borderRadius: 7,
			backgroundColor: "#00a4d4",

			"&:hover": {
				border: "none",
				backgroundColor: "#00a4d4",
			},
		},

		text: {
			fontFamily: styles.fontFamily,
			fontWeight: 500,
		},
	})
});

export const PersonalInformation = observer(() => {
	/* STYLES */
	const classes = useStyles();


	/* STORE */
	const {avatar, name, company, status, balance, phone, email} = account.personalInformation;
	const {width} = useWindowDimensions();

	/* HOOKS */
	const [expanded, setExpanded] = React.useState(false);

	/* USE EFFECTS */

	/* FUNCTIONS */
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const informationBlock = (workClass, title, subTitle, content) => {
		return (
			<div className={`${workClass}`}>
				<div className={classes.mainTitle}>{title}</div>
				<div className={classes.mainSubtitle}>{subTitle}</div>
				{content()}
			</div>
		);
	};
	const persInfoAccordion = () => {
		const personalInfo = [];

		for (const key in account.personalInformation) {
			if (key === "avatar" || key === "firstName" || key === "secondName") continue;

			personalInfo.push(
				<Accordion key={`personalInfo-${key}`} className={classes.accordion} expanded={expanded === key} onChange={handleChange(key)}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<Typography className={classes.heading} component={'span'}>{key}</Typography>
						<Typography
							className={classes.secondaryHeading}
							component={'span'}
						>
							{key === "name"
								? `${name.first} ${name.last}`
								: account.personalInformation[key]}
						</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<Typography className={classes.text} component={'span'}>
							{persInfoAccordionActions(key)}
						</Typography>
					</AccordionDetails>
				</Accordion>
			)
		}

		return personalInfo;
	};
	const persInfoAccordionActions = (name) => {
		switch (name) {
			case "name": {
				return (
					<div>
						change first and last name
					</div>
				)
			}

			case "company": {
				return (
					<div>
						change company name
					</div>
				)
			}

			case "phone": {
				return (
					<div>
						change phone number
					</div>
				)
			}

			case "email": {
				return (
					<div>
						change email
					</div>
				)
			}

			default: {
				return "";
			}
		}
	}

	const personalInfoMobile = () => {
		return (
			<div className={classes.mobilePersonalInfoData}>
				<div className={`${classes.mobilePersonalInfoDataItem} name`}>{name.first} {name.last}</div>
				<div className={classes.mobilePersonalInfoDataItem}>{company}</div>
				<div className={`${classes.mobilePersonalInfoDataItem} filed`}>COUNTRY: <span className={`${classes.mobilePersonalInfoDataItem} data`}>${balance}</span></div>
				<div className={`${classes.mobilePersonalInfoDataItem} filed`}>
					Status: <span className={`${classes.mobilePersonalInfoDataItem} data`}>{status}</span>
				</div>
			</div>
		)
	};

	const personalTitle = PERSONAL_INFORMATION;
	const personalSubtitle = "Here you can change personal information";
	const mobilePersonalInfoAvatar = <div className={classes.mobilePersonalInfoAvatar}/>
	const personalInformationActionList = () => {
		return (
			<div className={classes.root}>

				<div className={classes.desktopPersonalInfo}>
					<img className={classes.avatar} src={avatar} alt="user avatar"/>
					{persInfoAccordion()}
					<Accordion expanded={expanded === "Quick pay"} onChange={handleChange("Quick pay")}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon/>}
							aria-controls="panel4bh-content"
							id="panel4bh-header"
						>
							<Typography className={classes.heading}>Quick pay</Typography>
							<Typography component={'span'} className={classes.secondaryHeading}>{quickPay()}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography className={classes.text}>
								Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
								vitae egestas augue. Duis vel est augue.
							</Typography>
						</AccordionDetails>
					</Accordion>
				</div>

				<div className={classes.mobilePersonalInfo}>
					{mobilePersonalInfoAvatar}
					{personalInfoMobile()}
				</div>

				<div className={`${classes.mobilePersonalInfo} editBtn`}>
					<Button className={classes.editBtn} variant="outlined" color="primary">
						Edit Profile
					</Button>
				</div>

			</div>
		);
	};

	const lastPayments = () => {
		const lastPays = [];
		for (let i = account.payHistory.length - 1; i > account.payHistory.length - 4; --i) {
			lastPays.push(account.payHistory[i]);
		}

		return lastPays.map((pay) => (
			<div>
				<ListItem button>
					<ListItemText className={classes.actionItemName} primary={"Last payment"}/>
					<ListItemText className={classes.actionItemAction} primary={`${pay.date} ${pay.price}`}/>
					<ArrowForwardIosIcon color={"action"}/>
				</ListItem>
				<Divider/>
			</div>
		));
	};
	const quickPay = () => {
		const lastPays = [];
		for (let i = account.payHistory.length - 1; i > account.payHistory.length - 4; --i) {
			lastPays.push(account.payHistory[i]);
		}

		return (
			<div className={classes.quickPay}>
				{lastPays.map(pay => (
					<Button
						className={classes.btn}
						key={`quickPay-btn-${pay.price}`}
						variant="contained"
						color="primary"
					>
						{`$${pay.price}`}
					</Button>
				))}
			</div>
		)
	};

	const contactTitle = "Contact Information";
	const contactSubtitle = "More detailed description";
	const contactInformationActionList = () => {
		return (
			<div className={classes.content}>
				<div className={classes.actions}>
					<List component="nav" aria-label="main mailbox folders">
						<Divider/>
						<ListItem button>
							<ListItemText className={classes.actionItemName} primary={"Phone"}/>
							<ListItemText className={classes.actionItemAction} primary={`${phone}`}/>
							<ArrowForwardIosIcon color={"action"}/>
						</ListItem>

						<Divider/>

						<ListItem button>
							<ListItemText className={classes.actionItemName} primary={"Email"}/>
							<ListItemText className={classes.actionItemAction} primary={`${email}`}/>
							<ArrowForwardIosIcon color={"action"}/>
						</ListItem>
						<Divider/>
					</List>
				</div>
			</div>
		)
	};

	const devicesTitle = DEVICES;
	const devicesSubtitle = "";
	const allDevicesShort = () => {
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

		return devices;
	};
	const devicesActionList = () => {
		return (
			<div className={`${classes.content} right`}>
				{width <= 425
					? <AccordionFromTable tableData={allDevicesShort()} header={"Country"}/>
					: <AccountTable secretTitle={"Personal information: short Devices"} rowsData={allDevicesShort()}
					                search={"Title"} searchLabel={"Devices Name"}/>}
			</div>
		)
	};

	const fleetTitle = FLEET;
	const fleetSubtitle = "";
	const allFleetShort = () => {
		return account.myFleet.map((vessel) => ({
				id: vessel.id,
				"IMO": vessel.imo,
				"Name": vessel.name,
				"Type": vessel.vesselTypeDetailed,
			})
		)
	};
	const fleetActionList = () => {
		return (
			<div className={`${classes.content} right`}>
				{width <= 425
					? <AccordionFromTable tableData={allFleetShort()} header={"IMO"}/>
					: <AccountTable secretTitle={"Personal information: short Fleet"} rowsData={allFleetShort()}
					                search={"IMO"} searchLabel={"Fleet IMO"}/>}
			</div>
		)
	};

	return (
		<div className={classes.mainContainer}>
			<div className={classes.personalData}>
				<div className={classes.personalDataItem}>
					{informationBlock(classes.personalDataContentLeft, personalTitle, personalSubtitle, personalInformationActionList)}
				</div>
				<div className={classes.personalDataItem}>
					{informationBlock(classes.personalDataContentRight, devicesTitle, devicesSubtitle, devicesActionList)}
					{informationBlock(classes.personalDataContentRight, fleetTitle, fleetSubtitle, fleetActionList)}
				</div>
			</div>
			<div className={classes.substrate}/>
		</div>
	);
})