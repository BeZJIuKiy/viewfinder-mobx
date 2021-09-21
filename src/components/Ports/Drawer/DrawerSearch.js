import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
import ports from "../../../store/ports";


const useStyles = makeStyles((theme) => ({
	autoComplete: {
		// width: 290,
		width: "99%",
		backgroundColor: "#fff",
		borderRadius: 5,

		"@media(max-width: 425px)": {
			width: "98%",
		},
	},

	test: {
		fontFamily: `"Quicksand", sans-serif`,
		fontWeight: 500,
	}
}))

export const DrawerSearch = ({data, search, label, secretTitle}) => {
	const classes = useStyles();

	const {width} = useWindowDimensions();

	const [value, setValue] = useState("");

	// console.log(ports.searchQuery[secretTitle]?.find(el => Number.isInteger(el.id)))

	useEffect(() => {
		setValue("");
		ports.setSearchQuery(secretTitle, []);
	}, [ports.selectedObjects.port])

	const handleChange = (event, values) => {
		setValue(values ? values.description : "");

		ports.setSearchQuery(secretTitle, values ? [values] : []);
	}

	const handleChangeInput = (e) => {
		setValue(e.target.value);
	}

	return (
		<Autocomplete
			id={`drawer--search--${secretTitle}`}
			className={`${classes.autoComplete}`}
			classes={{input: classes.test, listbox: classes.test}}
			inputValue={value}
			options={data}
			getOptionLabel={(option) => option[search]}
			clearOnEscape={true}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						label={width <= 425 ? "Search" : label}
						variant="outlined"
						onChange={handleChangeInput}
					/>
				)
			}}
			onChange={handleChange}
		/>
	);
}