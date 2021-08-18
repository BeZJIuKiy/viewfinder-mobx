import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {NavLink} from 'react-router-dom';
import './Header.css';
import {observer} from "mobx-react-lite";
import header from "../../../store/header";
import ports from "../../../store/ports";
import {HeaderNotifications} from "./HeaderNotifications";
import {MobileDrawer} from "../Account30/MobileDrawer";

const useStyles = makeStyles((theme) => {
	const {miniAvatar} = header

	return ({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		accountIcon: {
			width: "40px",
			height: "40px",
			borderRadius: "50%",

			backgroundImage: `url(${miniAvatar})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
		},
		icon: {
			width: 40,
			height: 40,
			borderRadius: "50%",
		},
		mobileDrawer: {
			display: "none",

			"@media(max-width: 425px)": {
				display: "flex",

				marginRight: -20,
			},
		},
	})
});

export const Header = observer(() => {
	const classes = useStyles();

	const {allNewNote, portsNewNote} = header;
	const {data, selectedObjects: {port, camera, event}} = ports;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	useEffect(() => {
		setPortNotes();
		if (port.id >= 0) setCameraNotes();

		header.addAllNewNotifications(portsNewNote);
	}, [port, camera, event]);
	useEffect(() => {
		setPortNotes();
		if (port.id >= 0) setCameraNotes();

		header.addAllNewNotifications(portsNewNote);
	}, []);

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
		data.forEach(({cameras}, portIndex) => {
			let num = 0;
			cameras.forEach(({events}) => {
				const temp = (events.filter(({newEvent}) => newEvent === true).length);
				num += temp;
			})
			header.addNewPortsNotifications(portIndex, num);
		})
	};
	const setCameraNotes = () => {
		port.cameras.forEach(({events}, i) => {
			const notif = (events.filter(({newEvent}) => newEvent)).length;
			header.addNewCamerasNotifications(i, notif);
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


	const menuId = 'primary-search-account-menu';
	const isMenuOpen = Boolean(anchorEl);
	// const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const a = [
		{
			'0':
				{
					ZO: 'NOR',
					GE: 'FPO',
					LT: 'N59.00',
					LG: 'W030.00',
					XT: 'N60.00',
					XG: 'W033.00',
					DU: 5,
					GP: 0,
					FO: 'KROK',
					CA: [Array],
					SS: 'NOR01',
					BD: '2021 08 10',
					BT: '15 45'
				},
			QI: 1,
			AC: 'FIS',
			TM: 'DCA',
			RN: 315,
			MA: 'OLA NORMAN',
			DA: '2021 08 10',
			TI: '15 45'
		},
		{
			'0':
				{
					ZO: 'NOR',
					LT: 'N59.00',
					LG: 'W030.00',
					XT: 'N60.00',
					XG: 'W033.00',
					DU: 5,
					GP: 0,
					FO: 'KROK',
					CA: [Array],
					SS: 'NOR01',
					BD: '2021 08 10',
					BT: '15 45'
				},
			'1':
				{
					ZO: 'NOR',
					LT: 'N59.00',
					LG: 'W030.00',
					XT: 'N60.00',
					XG: 'W033.00',
					DU: 5,
					GP: 0,
					FO: 'KROK',
					CA: [Array],
					SS: 'NOR01',
					BD: '2021 08 10',
					BT: '15 45'
				},
			QI: 2,
			AC: 'STE',
			TM: 'DCA',
			RN: 315,
			MA: 'OLA NORMAN',
			DA: '2021 08 10',
			TI: '15 45'
		}];

	return (
		<div className={classes.grow}>
			<AppBar position="static" style={{background: '#2d2d2d'}}>
				<Toolbar>
					<span className={classes.mobileDrawer}><MobileDrawer/></span>
					<NavLink className={'navButtonsHome'}
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
					<div className={classes.sectionMobile}>
					</div>
				</Toolbar>
			</AppBar>
			{/* {renderNewMenu} */}
			{renderMenu()}
		</div>
	);
});