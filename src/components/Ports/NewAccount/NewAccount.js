import {makeStyles, useTheme} from "@material-ui/core/styles";
import account, {DEVICES, FLEET, PAYMENTS, PERSONAL_INFORMATION} from "../../../store/account";
import {observer} from "mobx-react-lite";
import Button from "@material-ui/core/Button";
import styles from "../../../store/styles";
import React, {useEffect, useRef} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ports from "../../../store/ports";
import {Card, CardActions, CardContent, CardHeader, Container, Hidden, Link} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {StarBorder} from "@material-ui/icons";
import {useHexToRgba} from "../../../useHooks/useHexToRgba";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Header} from "../Header/Header";
import Drawer from "@material-ui/core/Drawer";
import {PersonalInfoMobile} from "./Items/PersonalInfoMobile";
import {PersonalInformation} from "./Items/PersonalInformation";
import {SmallTableDevices} from "./Items/SmallTableDevices";
import {FullTableDevices} from "./Items/FullTableDevices";
import {SmallTableFleet} from "./Items/SmallTableFleet";
import {FullTableFleet} from "./Items/FullTableFleet";
import {Payments} from "./Items/Payments";

const useStyles = makeStyles((theme) => {
	// const bgcDrawer = "#444";
	// const textColorDrawer = "#999";
	// const textColorDrawerSelectedItem = "#ddd";
	//
	// const bgcMainContent = "#444";
	// const bgcGridItem = "#f5f5f5";

	const bgcDrawer = "#eee";
	const textColorDrawer = "#777";
	const textColorDrawerSelectedItem = "#333";

	const bgcMainContent = "#e1e1e1";
	const bgcGridItem = "#f5f5f5";

	return ({
		root: {
			minHeight: "100vh",
			background: useHexToRgba(bgcMainContent, 0.7),

			backgroundAttachment: "fixed",
			backgroundPosition: 'center',
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: styles.drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${styles.drawerWidth}px)`,
				marginLeft: styles.drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			zIndex: 1,
			width: styles.drawerWidth,
			background: useHexToRgba(bgcDrawer),
		},
		content: {
			flexGrow: 1,
		},
		adjustmentPosition: {
			paddingLeft: styles.drawerWidth,

			[theme.breakpoints.down('xs')]: {
				paddingLeft: 0,
			},
		},
		list: {
			overflowX: "hidden",
		},
		listItem: {
			"&.isActive": {
				paddingRight: 0,

				"&::after": {
					content: `"1"`,
					width: 3,
					height: "40px",
					display: "inline-block",

					color: "transparent",

					borderTopLeftRadius: 3,
					borderBottomLeftRadius: 3,

					// background: hexToRgba(firstColor, 0.8),
					background: useHexToRgba(textColorDrawerSelectedItem, 0.8),
				},
			},
		},

		listItemText: {
			fontFamily: styles.fontFamily,
			fontWeight: 400,
			color: textColorDrawer,

			"&.isActive": {
				fontWeight: 500,

				// color: firstColor,
				color: textColorDrawerSelectedItem,
			},
		},

		listItemIcon: {
			color: textColorDrawer,

			"&.isActive": {
				// color: firstColor,
				color: textColorDrawerSelectedItem,
			},
		},

		gridContainerMain: {
			margin: 0,
			padding: 0,
			marginLeft: theme.spacing(-1),

		},

		gridContainerItem: {
			margin: 0,
			padding: 0,
			minHeight: "100%",
			marginLeft: theme.spacing(-2),
		},

		gridItem: {
			minHeight: "100%",
			padding: theme.spacing(1),
			borderRadius: 5,
			background: useHexToRgba(bgcGridItem, 1),


			"&.first": {
				[theme.breakpoints.down('md')]: {
					marginBottom: theme.spacing(-3),
				},
			},
		},
	})
});
export const NewAccount = observer(() => {
	const classes = useStyles();
	const mainContentRef = useRef();
	const theme = useTheme();
	const {width} = useWindowDimensions();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [content, setContent] = React.useState([]);

	useEffect(() => {
		switch (account.selectedItem) {
			case PERSONAL_INFORMATION: {
				const left = [
					{prefix: "first", component: width > 600 ? <PersonalInformation/> : <PersonalInfoMobile/>,},
				]
				const right = [
					{prefix: "", component: <SmallTableDevices/>},
					{prefix: "", component: <SmallTableFleet/>},
				]

				setContent([left, right]);
				break;
			}
			case DEVICES: {
				const center = [
					{prefix: "", component: <FullTableDevices/>},
				]

				setContent([center]);
				break;
			}
			case FLEET: {
				const center = [
					{prefix: "", component: <FullTableFleet/>},
				]

				setContent([center]);
				break;
			}
			case PAYMENTS: {
				const center = [
					{prefix: "", component: <Payments/>},
				]

				setContent([center]);
				break;
			}
			default:
				setContent([]);
		}
	}, [width, account.selectedItemIndex])
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		})
	}, [mainContentRef.current?.offsetHeight]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleClick = (text, index) => {
		account.setSelectedItem(index);
	}

	const drawer = (
		<div>
			<div className={classes.toolbar}/>
			<List className={classes.list}>
				{account.drawerItems.map((item, index) => {
					const isActive = account.selectedItem === item.title ? "isActive" : "";
					return (
						<ListItem
							key={`${item.title}--${index * 18 + item.title.length * 15}`}
							className={`${classes.listItem} ${isActive}`}
							button
							onClick={() => handleClick(item.title, index)}
						>
							<ListItemIcon
								className={`${classes.listItemIcon} ${isActive}`}>{item.icon}</ListItemIcon>
							<ListItemText primary={`${item.title}`}
							              classes={{primary: `${classes.listItemText} ${isActive}`}}/>
						</ListItem>
					)
				})}
			</List>
			<Divider/>
		</div>
	);

	const gridContent = () => {
		return (
			<div className={classes.adjustmentPosition}>
				<Container maxWidth={"xl"}>
					<Grid container spacing={3} className={classes.gridContainerMain}>
						{content?.map((item, index) => {
							const lg = 12 / content.length || 1;
							const xl = 12 / content.length || 1;

							return (
								<Grid item xs={12} sm={12} md={12} lg={lg} xl={xl}
								      key={`Grid--Content--${lg + index * 10 + xl + index * 20 + lg}--${item.length * 100}`}>
									{gridContentItem(item)}
								</Grid>
							)
						})}
					</Grid>
				</Container>
			</div>
		);
	}
	const gridContentItem = (components = []) => {
		return (
			<Grid container spacing={3} className={classes.gridContainerItem}>
				{components.map(({prefix, component}, index) =>
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}
					      key={`gridContentItem--${index}--${prefix}--${index * 16 + prefix.length * 10 + index * prefix.length}`}>
						<div className={`${classes.gridItem} ${prefix}`}>
							{component}
						</div>
					</Grid>
				)}
			</Grid>
		)
	}

	return (
		<div className={classes.root}>
			<CssBaseline/>
			<Header mobileDrawer={{component: drawer, style: classes.drawerPaper}}/>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content} ref={mainContentRef}>
				<div className={classes.toolbar}/>
				{gridContent()}
			</main>
		</div>
	);
})