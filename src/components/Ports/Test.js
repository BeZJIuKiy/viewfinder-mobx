import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundImage from "../Auth/images/backgroundNew.jpg"
import {observer} from "mobx-react-lite";
import {OtherCamerasMobileDrawer} from "./Events/OtherCamerasMobileDrawer";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ports from "../../store/ports";
import {ShipCard} from "./Events/ShipCard";

const useStyles = makeStyles((theme) => ({
	test: {
		// width: "100%",
		// height: "100%",

		minWidth: "100%",
		minHeight: "100%",
	},

	container: {
		// display: "flex",
		// height: 500,
		// color: "white",
		// fontSize: "2.6em",
		// flexFlow: "column wrap",    // Расположение в виде колонок

		// display: "flex",
		// flexWrap: "wrap",
		// padding: 0,
		// margin: 0,
		// listStyle: "none",

		display: "flex",
		// flexFlow: "row wrap",
		maxWidth: 1200,
		marginTop: 10,
		margin: "0 auto",
	},

	item01: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",


		"&.one": {
			backgroundColor: "#508694",
			marginRight: 10,
			flexBasis: "100%",
			order: 1, // Первый блок
		},

		"&.two": {
			backgroundColor: "#BB844C",
			marginBottom: 10,
			flex: "1 1 0",
			order: 2, // Второй блок
		},

		"&.three": {
			backgroundColor: "#929D79",
			flex: "1 1 0",
			order: 3, // Третий блок
		},

		"&.four": {
			backgroundColor: "#929D79",
			flexBasis: "100%",
			margin: "0 10px",
			order: 4, // Четвертый блок
		},

		"&.five": {
			backgroundColor: "#929D79",
			marginBottom: 10,
			flex: "1 1 0",
			order: 5, // Пятый блок
		},

		"&.six": {
			backgroundColor: "#929D79",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Шестой блок
		},

		"&.seven": {
			backgroundColor: "#929D79",
			// marginTop: 10,
			flex: "1 1 0",
			order: 7, // Седьмой блок
		},
	},
	item02: {
		flex: "1 1 0",

		padding: 100,
		background: "#f0f0f0",
		borderRadius: 5,
		margin: "1rem",
		textAlign: "center",
	},

	item03: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 200,
		backgroundColor: "#508694",

		borderRadius: 16,
		boxShadow: "0 0 2px 0 rgba(145, 158, 171, 0.24),0 16px 32px -4px rgba(145, 158, 171, 0.24)",

		"&.one": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 1, // Первый блок
		},

		"&.two": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 2, // Первый блок
		},

		"&.three": {
			height: 200,

			backgroundColor: "#508694",
			marginRight: 10,
			flex: "1 1 0",
			order: 3, // Первый блок
		},

		"&.four": {
			height: 200,

			backgroundColor: "#508694",
			marginBottom: 10,
			flex: "1 1 0",
			order: 4, // Первый блок
		},

		"&.five": {
			// width: 1000,
			height: 300,

			backgroundColor: "#333",
			marginBottom: 10,
			// flexBasis: "80%",

			// flex: "1 1 80%",
			order: 5, // Первый блок
		},

		"&.six": {
			height: 200,

			backgroundColor: "#508694",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Первый блок
		},
		"&.eight": {
			height: 300,

			backgroundColor: "#e5e5e5",
			marginBottom: 10,
			flex: "1 1 0",
			order: 6, // Первый блок
		},
	},

	container01: {
		display: "flex",
		flexFlow: "column wrap",
	},
	item04: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		"&._01": {
			backgroundColor: "red",
			flexBasis: "100%",
			marginRight: 10,
			order: 1,
		},

		flexGrow: 1,
		flexShrink: 1,
		flexBasis: "100%",
		"&._02": {
			backgroundColor: "#777",
			flex: "1 1 0",
			marginBottom: 5,
			order: 2,
		},

		"&._03": {
			backgroundColor: "gold",
			flex: "1 1 0",
			marginTop: 5,
			order: 3,
		},

		"&._04": {
			backgroundColor: "blue",
			flexBasis: "100%",
			marginLeft: 10,
			order: 4,
		},
	},

	container02: {
		display: "flex",
		flexWrap: "wrap",
	},
	item05: {
		padding: 100,
		backgroundColor: "gold",
		textAlign: "center",

		"&.five": {
			height: 150,
			backgroundColor: "red",
		},

		"&.six": {
			height: 250,
			backgroundColor: "blue",
		},
	},


	main: {
		width: "100%",
		height: "100%",

		display: "flex",
		fontFamily: `"Quicksand", sans-serif`,

		backgroundImage: `url(${backgroundImage})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	},
	leftHalf: {
		width: "50%",

		position: "relative",
		background: "rgba(51, 51, 51, 0.7)",

		"@media(max-width: 425px)": {
			width: "100%",
		}
	},
	gridContainer: {
		// textAlign: "center",

		position: "absolute",
		top: "50%",
		left: "0px",
		zIndex: 1,

		transform: "translate(0, -50%)",
	},
	gridItem: {
		fontFamily: `"Quicksand", sans-serif`,

		color: "#ddd",
		borderColor: "none",
		fontSize: 24,

		// marginBottom: theme.spacing(2),

		"&.title": {
			textAlign: "center",
			fontSize: 52,
			fontWeight: 300,
		},

		"&.demo": {
			width: "100%",
			// width: "10vw",
			maxWidth: "200px",
			marginLeft: "auto",
			backgroundColor: "#9e2b4b",

			"&:hover": {
				backgroundColor: "#e22157",
			}
		},

		"&.login": {
			width: "100%",
			// width: "10vw",
			maxWidth: "200px",
			marginRight: "auto",
			backgroundColor: "#3d4772",

			"&:hover": {
				backgroundColor: "#374fb9",
			}
		},
	},
}));
export const Test = observer(() => {
	const classes = useStyles();
	const gridTest = () => {
		return (
			<div className={classes.container}>
				<div className={`${classes.item01} one`}>First</div>
				<div className={`${classes.item01} two`}>Second</div>
				<div className={`${classes.item01} three`}>Third</div>
				<div className={`${classes.item01} four`}>Fourth</div>
				<div className={`${classes.item01} five`}>Fifth</div>
				<div className={`${classes.item01} six`}>Sixth</div>
				<div className={`${classes.item01} seven`}>Seventh</div>

				<div className={`${classes.item02}`}>1</div>
				<div className={`${classes.item02}`}>2</div>
				<div className={`${classes.item02}`}>3</div>

				<div className={`${classes.item03} one`}>1</div>
				<div className={`${classes.item03} two`}>2</div>
				<div className={`${classes.item03} three`}>3</div>
				<div className={`${classes.item03} four`}>4</div>

				<div className={`${classes.item03} five`}>5</div>
				<div className={`${classes.item03} six`}>6</div>
			</div>
		)
	}

	return (
		<div className={classes.test}>
			<ShipCard/>
		</div>
	)
})