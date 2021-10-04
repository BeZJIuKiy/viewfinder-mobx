import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../../store/styles";
import {observer} from "mobx-react-lite";
import account from "../../../../store/account";
import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: 10,
	},
	desktopPersonalInfo: {
		width: "100%",

		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		textAlign: "left",
	},
	avatar: {
		width: "16vw",
		// width: "100%",
		height: "100%",

		minWidth: 150,
		minHeight: 200,
		margin: "10px 0px",
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
	},
	text: {
		fontFamily: styles.fontFamily,
		fontWeight: 500,
	},
	accordion: {
		width: "100%",
		background: "inherit",
	},
	quickPay: {
		width: "100%",

		display: "flex",
		justifyContent: "center",
		background: "inherit",
	},
	btn: {
		width: "5vw",
		margin: "0px 3px",
		fontFamily: styles.fontFamily,
		fontWeight: 500,
	},

	title: {
		textAlign: "center",
		fontWeight: "500",
		fontSize: 24,
	}
}))
export const PersonalInformation = observer(() => {
	const classes = useStyles();

	const {avatar, name} = account.personalInformation;

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const persInfoAccordion = () => {
		const personalInfo = [];

		for (const key in account.personalInformation) {
			if (key === "avatar" || key === "firstName" || key === "secondName") continue;

			personalInfo.push(
				<Accordion key={`personalInfo-${key}`} className={classes.accordion} expanded={expanded === key}
				           onChange={handleChange(key)}>
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
	const quickPay = () => {
		const lastPays = [];
		for (let i = account.payHistory.length - 1; i > account.payHistory.length - 4; --i) {
			lastPays.push(account.payHistory[i]);
		}

		return (
			<div className={classes.quickPay}>
				{lastPays.map((pay, i) => (
					<Button
						className={classes.btn}
						key={`quickPay-btn-${pay.price}--${i * 10 * pay.price.length}`}
						variant="contained"
						color="primary"
					>
						{`$${pay.price}`}
					</Button>
				))}
			</div>
		)
	};

	const title = "Personal Information";

	return (
		<div className={classes.root}>
			<div className={classes.title}>{title}</div>
			<div className={classes.desktopPersonalInfo}>
				<img className={classes.avatar} src={avatar} alt="user avatar"/>
				{persInfoAccordion()}
				<Accordion className={classes.accordion} expanded={expanded === "Quick pay"}
				           onChange={handleChange("Quick pay")}>
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
		</div>
	)
})