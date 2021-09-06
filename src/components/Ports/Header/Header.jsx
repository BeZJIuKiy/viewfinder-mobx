import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {NavLink, useHistory} from 'react-router-dom';
import './Header.css';
import {observer} from "mobx-react-lite";
import header from "../../../store/header";
import ports from "../../../store/ports";
import {HeaderNotifications} from "./HeaderNotifications";
import {MobileDrawer} from "../MobileDrawer/MobileDrawer";

const useStyles = makeStyles((theme) => {
	const {miniAvatar} = header

	return ({
		test: {
			// width: "calc(100% - 300px)",
			minHeight: 92,
			flexShrink: 0,
			position: "fixed",
			top: 0,
			left: "auto",
			right: 0,
			zIndex: 1100,
			backgroundColor: '#2d2d2d',

			justifyContent: "center",
		},
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		accountIcon: {
			width: 50,
			height: 50,
			borderRadius: "50%",

			backgroundImage: `url(${miniAvatar})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
		},
		btnHome: {
			fontSize: 22,
			fontWeight: 400,

			margin: 0,
			textDecoration: "none",
			color: "inherit",

			"@media(max-width: 425px)": {
				// margin: 0,
			},
		},
		mobileDrawer: {
			display: "none",

			"@media(max-width: 425px)": {
				display: "flex",

				marginRight: -30,
				paddingLeft: 5,
			},
		},
	})
});

export const Header = observer(() => {
	const classes = useStyles();

	const {allNewNote, portsNewNote, portsNoteTest} = header;
	const {data, selectedObjects: {port, camera, event}} = ports;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [notifications, setNotifications] = React.useState([]);
	const [pageName, setPageName] = React.useState("");


	useEffect(() => {
		/* Set Events from Server */
		// getPoints("http://192.168.250.183:8080/api/boats");
		// ports.setEvents(notifications.map(note => {
		// 	const img = note.img?.length
		// 		? note.img.replace(":", "")
		// 		: note.img;
		//
		// 	return ({
		// 		id: note.id,
		// 		typeError: 'Regular',
		// 		typeVessel: "Unknown",
		// 		location: 'Russia',
		// 		city: 'Saint Petersburg',
		// 		camera: note.name,
		// 		date: 'Unknown',
		// 		time: 'Unknown',
		// 		timezone: 'Unknown',
		// 		imageLink: img,
		// 		newEvent: true,
		// 		description: 'NO DESCRIPTION',
		// 	})
		// }))
	}, [notifications]);

	useEffect(() => {
		setPortNotes();
		if (port.id >= 0) setCameraNotes();

		header.addAllNewNotifications();
	}, [port, camera, event, camera.events]);


	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const setPortNotes = () => {
		data.forEach(({id, cameras}, portIndex) => {
			let num = 0;
			cameras.forEach(({events}) => {
				const temp = (events.filter(({newEvent}) => newEvent === true).length);
				num += temp;
			})
			header.addNewPortsNotifications(id, num);
		})
	};
	const setCameraNotes = () => {
		port.cameras.forEach(({id, events}, i) => {
			const notif = (events.filter(({newEvent}) => newEvent)).length;
			header.addNewCamerasNotifications(id, notif);
		})
	};
	const renderMenu = () => {
		return (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				id={menuId}
				keepMounted
				transformOrigin={{vertical: 'top', horizontal: 'right'}}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				{/* <MenuItem onClick={handleMenuClose}> */}
				{/* <NavLink className={'menu__btn'} to='/profile'>Profile</NavLink> */}
				{/* Profile */}
				{/* </MenuItem> */}
				<MenuItem onClick={handleMenuClose}>
					<NavLink className={'menu__btn'} to='/account'>My account</NavLink>
				</MenuItem>
			</Menu>
		)
	}

	const getPoints = async (url) => {
		try {
			// const url = "http://192.168.250.183:8080/api/positions";
			// const url = "http://192.168.250.183:5001/api/zones";

			await fetch(url)
				.then(response => response.json())
				.then(data => setNotifications(data));

		} catch (e) {
			console.log(e)
		}
	};

	const menuId = 'primary-search-account-menu';
	const isMenuOpen = Boolean(anchorEl);
	// const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


	return (
		<AppBar position="static" classes={{root: classes.test}}>
			<Toolbar>
				<NavLink className={`${classes.btnHome}`}
				         to="/ports"
				         onClick={() => ports.clearSelectedObjects()}
				> ViewFinder
				</NavLink>

				<div className={classes.grow}/>
				<div className={classes.sectionDesktop}>
					<HeaderNotifications/>

					<NavLink to='/account'>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							// onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<span className={`${classes.accountIcon}`}/>
						</IconButton>
					</NavLink>

				</div>

				<span className={classes.mobileDrawer}>
					<MobileDrawer pageName={pageName} data={[]}/>
				</span>
			</Toolbar>
			{renderMenu()}
		</AppBar>
	);
});