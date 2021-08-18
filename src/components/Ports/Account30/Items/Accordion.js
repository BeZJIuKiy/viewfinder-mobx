import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import account from "../../../../store/account";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	accordion: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(11),

		// flexBasis: '25%',
		flexShrink: 0,
		fontWeight: 500,

		// marginLeft

		color: theme.palette.text.secondary,
		textTransform: "uppercase",

		margin: "auto 0",
	},
	secondaryHeading: {
		marginLeft: "12%",
		flexBasis: '100%',
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.primary,

		textAlign: "left",

		"@media(max-width: 425px)": {
			// marginLeft: "-10%",
		},
	},

	detailed: {
		width: '100%',
		display: "flex",
		position: "relative",
	},
	detailedFirst: {
		width: "19vw",
		// marginLeft: theme.spacing(2),
		margin: "3px 0",
		textAlign: "left",
	},
	detailedSecond: {
		width: "45vw",
		// width: "100%",
		margin: "auto 0",
		marginLeft: theme.spacing(2),

		textAlign: "left",
	},
	substrate: {
		display: "flex",
		content: "",

		width: "100%",
		height: "1px",

		backgroundColor: "#e5e5e5",

		position: "absolute",
		bottom: 2,
		left: 0,
		zIndex: 1,

		// "&:last-child": {
		// 	display: "none",
		// },
	},
}));

export const AccordionFromTable = observer(({tableData, header}) => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const secondaryTableData = (row) => {
		const fullRow = [];
		const allKeys = [];

		for (const key in row) {
			if (key === header || key === "id") continue;
			allKeys.push(key);
		}

		for (const key in row) {
			if (key === header || key === "id") continue;

			const last = allKeys[allKeys.length-1] === row[key]

			fullRow.push(
				<div className={classes.detailed} key={`id-${header}-${key}`}>
					<div className={classes.detailedFirst}>{key}:</div>
					<div className={classes.detailedSecond}>{row[key]}</div>
					{last ? "" : <div className={classes.substrate}/>}
				</div>
			);
		}

		return fullRow;
	}

	return (
		tableData.map((row, index) => {
			return (
				<Accordion key={`accordion-from-table-${header}-${index}`} className={classes.accordion} expanded={expanded === index} onChange={handleChange(index)}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<Typography className={classes.heading} component={'div'}>{header}</Typography>
						<Typography
							className={classes.secondaryHeading}
							component={'div'}
						>
							{row[header]}
						</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<Typography component={'span'}>
							{secondaryTableData(row)}
						</Typography>
					</AccordionDetails>
				</Accordion>
			)
		})
	)
})