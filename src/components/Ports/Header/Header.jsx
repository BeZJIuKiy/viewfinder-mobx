import React, {useEffect, useState} from 'react';
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
import {HeaderNotifications} from "./HeaderNotifications/HeaderNotifications";
import {MobileDrawer} from "../MobileDrawer/MobileDrawer";
import boat1_04 from "../Events/images/b1-04.jpg";
import connects from "../../../store/connects";
import styles from "../../../store/styles";
import account from "../../../store/account";

const useStyles = makeStyles((theme) => {
	const {miniAvatar} = header

	return ({
		test: {
			height: styles.headerHeight,
			// minHeight: styles.headerHeight,
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

			fontFamily: styles.fontFamily,

			"@media(max-width: 425px)": {
				// margin: 0,
			},
		},
		mobileDrawer: {
			display: "none",

			[theme.breakpoints.down("sm")]: {
				display: "flex",

				marginRight: -30,
				paddingLeft: 5,
			},
		},
	})
});

export const Header = observer(({mobileDrawer}) => {
	const classes = useStyles();

	const {data, selectedObjects: {port, camera, event}} = ports;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [notifications, setNotifications] = React.useState([]);
	const [pageName, setPageName] = React.useState("");

	const [handleInterval, setHandleInterval] = useState(false);


	useEffect(() => {
		/* Set Events from Server */
		// setHandleInterval(
		// 	setInterval(() => {
		// 		getPoints(connects.urlEvents);
		// 	}, 1000)
		// )
	}, []);


	useEffect(() => {
		// getNewNotifications();
	}, [notifications]);
	useEffect(() => {
		setPortNotes();
		if (port.id >= 0) setCameraNotify();

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
	const setCameraNotify = () => {
		port.cameras.forEach(({id, events}, i) => {
			const notify = (events.filter(({newEvent}) => newEvent)).length;
			header.addNewCamerasNotifications(id, notify);
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
	const getNewNotifications = () => {
		ports.setEvents(notifications.map(note => {
			return ({
				id: note.id,
				imo: note.imo,
				mmsi: note.mmsi,
				date: note.createdAt,
				callSign: note.callSign,
				typeError: 'Regular',
				typeVessel: note.name,
				country: note.country,
				imageLink: note.img,
				newEvent: true,
				isDander: false,
				description: 'Nothing interesting, keep moving on',
			})
		}))
	}
	const getPoints = async (url) => {
		try {
			await fetch(url)
				.then(response => response.json())
				.then(data => {
					const cameraEvents = ports.data[0].cameras[0].events.length;
					if (cameraEvents !== data.length) {
						setNotifications(data);
					}
				});
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
				>
					ViewFinder
				</NavLink>

				{/*<NavLink className={`${classes.btnHome}`} to="/test">*/}
				{/*	Test*/}
				{/*</NavLink>*/}

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
							onClick={() => account.setSelectedItem()}
						>
							<span className={`${classes.accountIcon}`}/>
						</IconButton>
					</NavLink>

				</div>

				<span className={classes.mobileDrawer}>
					<MobileDrawer drawer={mobileDrawer}/>
				</span>
			</Toolbar>
			{renderMenu()}
		</AppBar>
	);
});