import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ports from "../../../store/ports";
import {observer} from "mobx-react-lite";
import {ShipCard} from "./ShipCard/ShipCard";
import {DeleteEventDialog} from "./DeleteEventDialog";
import {useHexToRgba} from "../../../useHooks/useHexToRgba";
import styles from "../../../store/styles";


function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{id: 'typeError', numeric: false, disablePadding: true, label: 'Type'},
	{id: 'date', numeric: false, disablePadding: true, label: 'Date'},
	{id: 'imo', numeric: false, disablePadding: false, label: 'IMO'},
	{id: 'mmsi', numeric: false, disablePadding: false, label: 'MMSI'},
	{id: 'callSign', numeric: false, disablePadding: false, label: 'Call Sign'},
	{id: 'typeVessel', numeric: false, disablePadding: true, label: 'Type Vessel'},
	// {id: 'country', numeric: false, disablePadding: false, label: 'Country'},
	{id: 'description', numeric: false, disablePadding: false, label: 'Description'},
];

function EnhancedTableHead(props) {
	const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{'aria-label': 'select all desserts'}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
				                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
				                </span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
	editIcons: {
		display: 'flex'
	},
	modal: {
		display: "flex",
		position: "relative",
		overflowY: "auto",
	},
	correctCardPosition: {
		position: "absolute",
		top: "20%",
		left: "50%",

		transform: "translate(-50%, 0)",
	},
	btn: {
		width: 116,
		height: 36,

		"&.ok": {
			color: useHexToRgba("#fff", 0.8),
			background: useHexToRgba("#080", 0.8)
		},

		"&.cancel": {
			color: useHexToRgba("#fff", 0.8),
			background: useHexToRgba("#f00", 0.82),
		},
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const {numSelected, selected} = props;
	const {selectedObjects: {port, camera, event, cardData}} = ports;

	const [isOpenShipCard, setOpenShipCard] = useState(false);
	const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false);

	const tableTitle = Number.isInteger(event.id)
		? `ALL EVENTS ${event.typeVessel}`
		: (camera.events.length ? `ALL EVENTS ${camera.description}` : "NO EVENTS");

	const handleOpenShipCard = () => {
		setOpenShipCard(true);
	}
	const handleCloseShipCard = () => {
		setOpenShipCard(false);
	}

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	}
	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	}


	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			<ShipCard isOpen={isOpenShipCard} btnStyles={classes.btn} handleClose={() => handleCloseShipCard()}/>
			<DeleteEventDialog
				isOpen={isOpenDeleteDialog}
				handleClose={() => handleCloseDeleteDialog()}
				selectedId={selected}
				btnStyles={classes.btn}
			/>

			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title}
				            variant="h6"
				            id="tableTitle"
				            component="div"
				>
					{/* Events - ?????? ?????????????????? ?????????????? */}
					{tableTitle}
				</Typography>
			)}

			{numSelected === 1 ? (
				<Tooltip
					title="Add ship"
					onClick={handleOpenShipCard}
				>
					<IconButton aria-label="Add ship">
						<AddCircleIcon color="secondary"/>
					</IconButton>
				</Tooltip>
			) : ('')
			}

			{numSelected >= 1 ? (
				<Tooltip
					title="Delete"
					onClick={() => alert("Delete")}
				>
					<IconButton aria-label="delete" onClick={handleOpenDeleteDialog}>
						<DeleteIcon/>
					</IconButton>
				</Tooltip>
			) : ('')
			}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
		// maxHeight: window.innerHeight * eventsState.maxHeight,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	tableCell: styles.notifyColors,
}));

export const BoatEvents = observer(() => {
	const classes = useStyles();
	const {
		selectedObjects: {
			port, camera, event,
			shipImage: {id: imageId},
		},
	} = ports;

	const portIndex = ports.data.findIndex(({id}) => id === port.id);
	const curCamera = ports.data[portIndex].cameras.find(({id}) => id === camera.id);

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('date');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	// const [dense, setDense] = React.useState(false);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	useEffect(() => {
		ports.setVisibleSelectedImage(false);
		setSelected([]);
	}, [camera.id, camera.events.length]);
	useEffect(() => {
		if (imageId >= 0) {
			setSelected([imageId]);
		} else if (selected.length === 1 && imageId < 0) {
			setSelected([]);
		}
	}, [imageId]);

	// const rows = [];
	// curCamera.events.forEach(row => {
	// 	rows.push({
	// 		id: row.id,
	// 		imo: row.imo,
	// 		mmsi: row.mmsi,
	// 		date: row.date,
	// 		callSign: row.callSign,
	// 		typeError: row.typeError,
	// 		typeVessel: row.typeVessel,
	// 		country: row.country,
	// 		imageLink: row.img,
	// 		description: row.description,
	// 	})
	// });
	const rows = curCamera.events.map(row => ({
			id: row.id,
			imo: row.imo,
			mmsi: row.mmsi,
			date: row.date,
			callSign: row.callSign,
			typeError: row.typeError,
			typeVessel: row.typeVessel,
			country: row.country,
			imageLink: row.img,
			description: row.description,
		})
	);


	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}

		setSelected([]);
	};
	const handleClick = (e, id, index) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		if (newSelected.length === 1) {
			ports.setImageId(newSelected[0]);
			ports.setVisibleSelectedImage(true);
			ports.setCard(newSelected[0]);
		} else {
			ports.setImageId(-1);
			ports.setVisibleSelectedImage(false);
		}

		setSelected(newSelected);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const handleChangeDense = (event) => {
	//   setDense(event.target.checked);
	// };

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					selected={selected}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const {
										id,
										typeError,
										typeVessel,
										date,
										imo,
										mmsi,
										callSign,
										country,
										description
									} = row;
									const isItemSelected = isSelected(id);
									const labelId = `enhanced-table-checkbox-${index}`;
									const notifyType = typeError.toLowerCase();
									// const notifType = `events__type__notification ${typeError.toLowerCase()}`;

									return (
										<TableRow
											hover
											onClick={(e) => handleClick(e, id, (index + page * rowsPerPage))}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{'aria-labelledby': labelId}}
												/>
											</TableCell>

											<TableCell component="th" id={labelId} scope="row" padding="none"
											           align="center"
											           className={`${classes.tableCell} ${notifyType}`}>{typeError}</TableCell>
											<TableCell align="left">{date}</TableCell>
											<TableCell align="left">{imo}</TableCell>
											<TableCell align="left">{mmsi}</TableCell>
											<TableCell align="left">{callSign}</TableCell>
											<TableCell align="left">{typeVessel}</TableCell>
											{/*<TableCell align="left">{country}</TableCell>*/}
											<TableCell align="left">{description}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
									<TableCell colSpan={6}/>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			{/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
		</div>
	);
})