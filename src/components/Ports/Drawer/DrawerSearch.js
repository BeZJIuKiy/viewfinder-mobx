import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
import ports from "../../../store/ports";
import styles from "../../../store/styles";


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

	text: {
		fontFamily: styles.fontFamily,
		fontWeight: 500,
	}
}))

export const DrawerSearch = ({data, search, label, secretTitle}) => {
	const classes = useStyles();

	const {width} = useWindowDimensions();

	const [value, setValue] = useState("");


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
			classes={{input: classes.text, listbox: classes.text}}
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
						InputLabelProps={{
							classes: {root: classes.text}
						}}

						onChange={handleChangeInput}
					/>
				)
			}}
			onChange={handleChange}
		/>
	);
}