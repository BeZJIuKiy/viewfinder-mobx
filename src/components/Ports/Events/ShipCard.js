import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {observer} from "mobx-react-lite";
import React from "react";
import ports from "../../../store/ports";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from "@material-ui/core/Collapse";
import {Grid} from "@material-ui/core";

const useShopCardStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));
export const ShipCard = observer(() => {
	const classes = useShopCardStyles();
	const [expanded, setExpanded] = React.useState(false);
	const {cardData} = ports.selectedObjects

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const content = (title, data) => {
		return (
			<>
				<Grid item xs={4} sm={4} md={4} lg={4} xl={4}>{title}:</Grid>
				<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>{data}</Grid>
			</>
		)
	}

	// const test = "data:image/png;base64," + ports.data[0].cameras[0].events[1].imageLink;

	return (
		<Card className={classes.root}>
			<CardHeader
				// avatar={
				// 	<Avatar aria-label="recipe" className={classes.avatar}>
				// 		R
				// 	</Avatar>
				// }
				// action={
				// 	<IconButton aria-label="settings">
				// 		<MoreVertIcon />
				// 	</IconButton>
				// }
				// title="Shrimp and Chorizo Paella"
				// subheader="September 14, 2016"

				title={cardData.typeVessel}
				subheader={cardData.date}
			/>
			<CardMedia
				className={classes.media}
				image={`data:image/png;base64,${cardData.imageLink}`}
				title={cardData.typeVessel}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{cardData.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to fleet">
					<AddIcon/>
				</IconButton>
				<IconButton aria-label="edit">
					<EditIcon/>
				</IconButton>
				<IconButton aria-label="delete">
					<DeleteIcon/>
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Grid container>
						{content("Type", cardData.typeVessel)}
						{content("Date", cardData.date)}
						{content("IMO", cardData.imo)}
						{content("MMSI", cardData.mmsi)}
						{content("Call Sign", cardData.callSign)}
					</Grid>
					{/*<Typography paragraph>Method:</Typography>*/}
					{/*<Typography paragraph>*/}
					{/*	Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10*/}
					{/*	minutes.*/}
					{/*</Typography>*/}
					{/*<Typography paragraph>*/}
					{/*	Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high*/}
					{/*	heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly*/}
					{/*	browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken*/}
					{/*	and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and*/}
					{/*	pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add*/}
					{/*	saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.*/}
					{/*</Typography>*/}
					{/*<Typography paragraph>*/}
					{/*	Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook*/}
					{/*	without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to*/}
					{/*	medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook*/}
					{/*	again without stirring, until mussels have opened and rice is just tender, 5 to 7*/}
					{/*	minutes more. (Discard any mussels that don’t open.)*/}
					{/*</Typography>*/}
					{/*<Typography>*/}
					{/*	Set aside off of the heat to let rest for 10 minutes, and then serve.*/}
					{/*</Typography>*/}
				</CardContent>
			</Collapse>
		</Card>
	);
})