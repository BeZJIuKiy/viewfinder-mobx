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


const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",

		display: "flex",
		flexDirection: "column",

		alignItems: "center",

		textAlign: "left",
	},
	heading: {
		fontSize: theme.typography.pxToRem(11),
		flexBasis: '33.33%',
		flexShrink: 0,
		fontWeight: 500,

		color: theme.palette.text.secondary,
		textTransform: "uppercase",

		margin: "auto 0",
	},
	secondaryHeading: {
		marginLeft: "-12%",

		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.primary,
	},
	accordion: {
		width: "100%",
	},


	container: {
		margin: "20px 0",
		padding: "10px 20px",
		backgroundColor: "#fff",
		borderRadius: 30,
	},

	mainContainer: {
		height: "calc(100% - 20px)",

		margin: "20px 0",
		position: "relative",
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
	},
	personalDataItem: {
		flexDirection: "column",
		flexGrow: 1,
	},
	personalDataContentLeft: {
		height: "calc(100% - 20px)",

		margin: "20px 10px 20px 20px",
		padding: "10px 40px",
		backgroundColor: "#fff",
		borderRadius: 10,

		textAlign: "center",
	},
	personalDataContentRight: {
		margin: "20px 20px 0px 10px",
		padding: "10px 40px",
		backgroundColor: "#fff",
		borderRadius: 10,

		textAlign: "center",
	},

	mainTitle: {
		fontWeight: 500,
		fontSize: "1.5vw",
	},
	mainSubtitle: {
		fontSize: "1.0vw",
	},
	mainText: {},
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
	},
	btn: {
		width: "5vw",
		margin: "0px 3px",
	}
}));

export const PersonalInformation = observer(() => {
	/* STYLES */
	const classes = useStyles();


	/* STORE */
	const {avatar, name, firstName, secondName, company, status, phone, email} = account.personalInformation;
	// const {avatar, firstName, secondName, company, status, phone, email} = account.personalInformation;

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
				<Accordion className={classes.accordion} expanded={expanded === key} onChange={handleChange(key)}>
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
						<Typography component={'span'}>
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
				console.log("default");
				return "";
			}
		}
	}


	const personalTitle = PERSONAL_INFORMATION;
	const personalSubtitle = "Here you can change personal information";
	const personalInformationActionList = () => {
		return (
			<div className={classes.root}>
				<img className={classes.avatar} src={avatar} alt="user avatar"/>

				{persInfoAccordion()}
				{/*<Accordion expanded={expanded === 'Name'} onChange={handleChange('Name')}>*/}
				{/*	<AccordionSummary*/}
				{/*		expandIcon={<ExpandMoreIcon/>}*/}
				{/*		aria-controls="panel1bh-content"*/}
				{/*		id="panel1bh-header"*/}
				{/*	>*/}
				{/*		<Typography className={classes.heading}>Name</Typography>*/}
				{/*		<Typography className={classes.secondaryHeading}>{`${firstName} ${secondName}`}</Typography>*/}
				{/*	</AccordionSummary>*/}

				{/*	<AccordionDetails>*/}
				{/*		<Typography>*/}
				{/*			Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget*/}
				{/*			maximus est, id dignissim quam.*/}
				{/*		</Typography>*/}
				{/*	</AccordionDetails>*/}
				{/*</Accordion>*/}
				{/*<Accordion expanded={expanded === "Company"} onChange={handleChange("Company")}>*/}
				{/*	<AccordionSummary*/}
				{/*		expandIcon={<ExpandMoreIcon/>}*/}
				{/*		aria-controls="panel2bh-content"*/}
				{/*		id="panel2bh-header"*/}
				{/*	>*/}
				{/*		<Typography className={classes.heading}>Company</Typography>*/}
				{/*		<Typography className={classes.secondaryHeading}>{`${company}`}</Typography>*/}
				{/*	</AccordionSummary>*/}

				{/*	<AccordionDetails>*/}
				{/*		<Typography>*/}
				{/*			Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar*/}
				{/*			diam eros in elit. Pellentesque convallis laoreet laoreet.*/}
				{/*		</Typography>*/}
				{/*	</AccordionDetails>*/}
				{/*</Accordion>*/}
				{/*<Accordion expanded={expanded === "Account status"} onChange={handleChange("Account status")}>*/}
				{/*	<AccordionSummary*/}
				{/*		expandIcon={<ExpandMoreIcon/>}*/}
				{/*		aria-controls="panel3bh-content"*/}
				{/*		id="panel3bh-header"*/}
				{/*	>*/}
				{/*		<Typography className={classes.heading}>Account status</Typography>*/}
				{/*		<Typography className={classes.secondaryHeading}>{`${status}`}</Typography>*/}
				{/*	</AccordionSummary>*/}

				{/*	<AccordionDetails>*/}
				{/*		<Typography>*/}
				{/*			Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,*/}
				{/*			vitae egestas augue. Duis vel est augue.*/}
				{/*		</Typography>*/}
				{/*	</AccordionDetails>*/}
				{/*</Accordion>*/}
				{/*<Accordion expanded={expanded === "Phone"} onChange={handleChange("Phone")}>*/}
				{/*	<AccordionSummary*/}
				{/*		expandIcon={<ExpandMoreIcon/>}*/}
				{/*		aria-controls="panel3bh-content"*/}
				{/*		id="panel3bh-header"*/}
				{/*	>*/}
				{/*		<Typography className={classes.heading}>Phone</Typography>*/}
				{/*		<Typography className={classes.secondaryHeading}>{`${phone}`}</Typography>*/}
				{/*	</AccordionSummary>*/}

				{/*	<AccordionDetails>*/}
				{/*		<Typography>*/}
				{/*			Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,*/}
				{/*			vitae egestas augue. Duis vel est augue.*/}
				{/*		</Typography>*/}
				{/*	</AccordionDetails>*/}
				{/*</Accordion>*/}
				{/*<Accordion expanded={expanded === "Email"} onChange={handleChange("Email")}>*/}
				{/*	<AccordionSummary*/}
				{/*		expandIcon={<ExpandMoreIcon/>}*/}
				{/*		aria-controls="panel3bh-content"*/}
				{/*		id="panel3bh-header"*/}
				{/*	>*/}
				{/*		<Typography className={classes.heading}>Email</Typography>*/}
				{/*		<Typography className={classes.secondaryHeading}>{`${email}`}</Typography>*/}
				{/*	</AccordionSummary>*/}

				{/*	<AccordionDetails>*/}
				{/*		<Typography>*/}
				{/*			Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,*/}
				{/*			vitae egestas augue. Duis vel est augue.*/}
				{/*		</Typography>*/}
				{/*	</AccordionDetails>*/}
				{/*</Accordion>*/}


				<Accordion expanded={expanded === "Quick pay"} onChange={handleChange("Quick pay")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						aria-controls="panel4bh-content"
						id="panel4bh-header"
					>
						<Typography className={classes.heading}>Quick pay</Typography>
						<Typography className={classes.secondaryHeading}>{quickPay()}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
							vitae egestas augue. Duis vel est augue.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	};
	// const OLDpersonalInformationActionList = () => {
	// 	return (
	// 		<div className={classes.content}>
	// 			<img className={classes.avatar} src={avatar} alt="123"/>
	//
	// 			<div className={classes.actions}>
	// 				<List component="nav" aria-label="main mailbox folders">
	// 					<Divider/>
	// 					<ListItem button>
	// 						{/*<ListItemText className={classes.actionItemName} primary={"Name"}/>*/}
	//
	// 						<ListItemText className={classes.actionItemName} classes={{primary: classes.actionItemName}}
	// 						              primary={"Name"}/>
	// 						<ListItemText className={classes.actionItemAction} primary={`${firstName} ${secondName}`}/>
	// 						<ArrowForwardIosIcon color={"action"}/>
	// 					</ListItem>
	//
	// 					<Divider/>
	//
	// 					<ListItem button>
	// 						<ListItemText className={classes.actionItemName} classes={{primary: classes.actionItemName}}
	// 						              primary={"Company"}/>
	// 						<ListItemText className={classes.actionItemAction} primary={`${company}`}/>
	// 						<ArrowForwardIosIcon color={"action"}/>
	// 					</ListItem>
	//
	// 					<Divider/>
	//
	// 					<ListItem button>
	// 						<ListItemText className={classes.actionItemName} classes={{primary: classes.actionItemName}}
	// 						              primary={"Account status"}/>
	// 						<ListItemText className={classes.actionItemAction} primary={`${status}`}/>
	// 						<ArrowForwardIosIcon color={"action"}/>
	// 					</ListItem>
	//
	// 					<Divider/>
	//
	// 					{/*{lastPayments()}*/}
	//
	// 					<ListItem button>
	// 						<ListItemText className={classes.actionItemName} classes={{primary: classes.actionItemName}}
	// 						              primary={"Phone"}/>
	// 						<ListItemText className={classes.actionItemAction} primary={`${phone}`}/>
	// 						<ArrowForwardIosIcon color={"action"}/>
	// 					</ListItem>
	//
	// 					<Divider/>
	//
	// 					<ListItem button>
	// 						<ListItemText className={classes.actionItemName} classes={{primary: classes.actionItemName}}
	// 						              primary={"Email"}/>
	// 						<ListItemText className={classes.actionItemAction} primary={`${email}`}/>
	// 						<ArrowForwardIosIcon color={"action"}/>
	// 					</ListItem>
	//
	// 					<Divider/>
	//
	// 					<ListItem button>
	// 						<ListItemText className={classes.actionItemName} classes={{primary: classes.actionItemName}}
	// 						              primary={"Quick pay"}/>
	// 						{quickPay()}
	// 					</ListItem>
	//
	// 					<Divider/>
	// 				</List>
	// 			</div>
	// 		</div>
	// 	)
	// };

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
						key={`${pay.price}`}
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
	const devicesActionList = () => {
		return (
			<div className={`${classes.content} right`}>
				<DevicesTable/>
			</div>
		)
	};

	const fleetTitle = FLEET;
	const fleetSubtitle = "";
	const fleetActionList = () => {
		return (
			<div className={`${classes.content} right`}>
				<SmallDevicesTable20/>
			</div>
		)
	};

	// if(devicePixelRatio) alert(devicePixelRatio);
	// else alert(outerWidth/innerWidth*100);


	return (
		<div className={classes.mainContainer}>
			<div className={classes.personalData}>
				<div className={classes.personalDataItem}>
					{/*{informationBlock(classes.personalDataContentLeft, personalTitle, personalSubtitle, OLDpersonalInformationActionList)}*/}
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