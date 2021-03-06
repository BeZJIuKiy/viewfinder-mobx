import React, {useEffect, useRef} from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import {observer} from "mobx-react-lite";
import {Search} from "./Search";
import account from "../../../../store/account";

const useHeaderStyles = makeStyles((theme) => ({
	headerTitle: {
		fontFamily: `"Quicksand", sans-serif`,
		fontWeight: 700,
	},
}));

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

const headCells = (data) => {
	if (data.length === 0) return;
	const arr = [];

	for (const key in data[0]) {
		if (key === "id") continue;

		arr.push({id: key, numeric: false, disablePadding: false, label: key});
	}

	return arr;
}

function EnhancedTableHead(props) {
	const headerClasses = useHeaderStyles();
	const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headData} = props;
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
				{headCells(headData).map((headCell) => (
					<TableCell
						key={`Head--Cells--${headCell.id}`}
						className={headerClasses.headerTitle}
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
		textAlign: "right",
	},
	editIcons: {
		display: 'flex'
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const {numSelected} = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					{/* Events - ?????? ?????????????????? ?????????????? */}
					{props.title}
				</Typography>
			)}

			{numSelected === 1 ? (
				<Tooltip
					title="Change ship"
					onClick={() => alert("Change ship")}
				>
					<IconButton aria-label="Change ship">
						<EditIcon color="primary"/>
					</IconButton>
				</Tooltip>
			) : ('')
			}

			{numSelected >= 1 ? (
				<Tooltip
					title="Delete"
					onClick={() => alert("Delete")}
				>
					<IconButton aria-label="delete">
						<DeleteIcon/>
					</IconButton>
				</Tooltip>
			) : (
				<div className={classes.editIcons}>
					<Tooltip
						title="Change fleet"
						onClick={() => alert("Change fleet")}
					>
						<IconButton aria-label="Change fleet">
							<EditIcon color="primary"/>
						</IconButton>
					</Tooltip>

					<Tooltip
						title="Add ship"
						onClick={() => alert("Add ship")}
					>
						{/* <IconButton aria-label="filter list"> */}
						<IconButton aria-label="Add ship">
							{/* <FilterListIcon /> - ?????? ???????????? */}
							<AddCircleIcon color="secondary"/>
						</IconButton>
					</Tooltip>
				</div>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		position: "relative",

	},
	search: {
		display: "flex",
		position: "absolute",

		top: 4,
		left: 5,
		zIndex: 1,

		"@media(max-width: 425px)": {
			top: 0,
			left: 0,
		},
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		background: "inherit",
	},
	table: {
		// width: "100%",
		minWidth: 500,
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

	text: {
		fontFamily: `"Quicksand", sans-serif`,
		fontWeight: 500,
	},
}));

export const AccountTable = observer(({rowsData, search, title, searchLabel, secretTitle}) => {
	/* USE ELEMENTS */
	const classes = useStyles();
	const tableRef = useRef(null);


	/* HOOKS */
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(true);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	useEffect(() => {
		if (!!tableRef.current?.offsetHeight === false) return;
		// console.log(tableRef.current?.offsetHeight, tableRef.current?.offsetTop);
		tableRef.current.scrollIntoView();
	}, [tableRef.current?.offsetHeight])

	/* FUNCTION */
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
	const handleClick = (event, id) => {
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

		setSelected(newSelected);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};
	const isSelected = (id) => selected.indexOf(id) !== -1;
	const tableRow = (row) => {
		const readyRow = [];
		for (const key in row) {
			if (key === "id") continue;
			readyRow.push(<TableCell className={classes.text} align="left" key={key}>{row[key]}</TableCell>);
		}
		return readyRow;
	}

	/* VARS */
	const isCurrentTableSearch = !!account.searchQuery[secretTitle]?.length;
	const rows = isCurrentTableSearch ? account.searchQuery[secretTitle].map(d => d) : rowsData.map(d => d);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div
			className={classes.root}
			ref={tableRef}
		>
			<div className={classes.search}>
				<Search data={rowsData} search={search} label={`Search ${searchLabel}`} secretTitle={secretTitle}/>
			</div>

			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} title={title}/>
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
							headData={rowsData}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{'aria-labelledby': labelId}}
												/>
											</TableCell>

											{tableRow(row)}
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
					classes={{caption: classes.text, select: classes.text}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			{/*<FormControlLabel*/}
			{/*	control={<Switch checked={dense} onChange={handleChangeDense}/>}*/}
			{/*	label="Dense padding"*/}
			{/*/>*/}
		</div>
	);
});