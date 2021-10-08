import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import backgroundImage from "./images/backgroundNew.jpg"
import backgroundImage320px from "./images/background320px.jpg"
import Button from "@material-ui/core/Button";
import auth from "../../store/auth";
import styles from "../../store/styles";
import {Form, Formik} from "formik";
import {useHistory} from "react-router-dom";
import {ContactUs} from "./ContactUs";
import {useWindowDimensions} from "../../useHooks/useWindowDimensions";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => {
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return ({
		main: {
			width: "100%",
			// height: "100%",
			// minHeight: styles.mainHeight,

			display: "flex",

			backgroundImage: `url(${backgroundImage})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',

			// overflow: "hidden",

			position: "relative",


			'@media(max-width: 425px)': {
				backgroundImage: `url(${backgroundImage320px})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}
		},
		mainSubstrateLeft: {
			width: "50%",
			height: "100%",

			backgroundColor: "#333",
			opacity: 0.7,

			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 1,

			'@media(max-width: 425px)': {
				width: "100%",
			}
		},
		mainTitle: {
			color: "white",
			fontSize: "4vw",
			fontWeight: 300,
			userSelect: "none",

			'@media(max-width: 425px)': {
				fontSize: "14vw",
			}
		},
		mainItem: {
			width: "50%",
			textAlign: "center",

			position: "absolute",
			top: "50%",
			left: "25%",
			transform: "translate(-50%, -25%)",
			zIndex: 2,

			'@media(max-width: 768px)': {
				top: "40%",
			},

			'@media(max-width: 425px)': {
				width: "100%",
				top: "45%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				zIndex: 1,
			}
		},
		mainForm: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",

			position: "relative",
		},
		mainFormBorder: {
			width: "45%",
			color: "white",

			'@media(max-width: 1024px)': {
				width: "28vw",
			},

			'@media(max-width: 768px)': {
				width: "38vw",
			},

			'@media(max-width: 630px)': {
				width: "43vw",
			},

			'@media(max-width: 425px)': {
				width: "90vw",
			},
		},
		mainFormText: {
			marginBottom: "6%",
			fontSize: "1.2vw",

			'@media(max-width: 425px)': {
				fontSize: "4vw",
			}
		},
		mainFormBtn: {
			width: "100%",
			display: "flex",
			justifyContent: "space-around",

			marginTop: 10,
		},
		btn: {
			width: "8vw",
			fontSize: "1.3vw",
			fontFamily: styles.fontFamily,
			fontWeight: 500,
			color: "#ddd",
			borderColor: "none",

			"&.demo": {
				backgroundColor: "#9e2b4b",

				"&:hover": {
					backgroundColor: "#e22157",
				}
			},

			"&.login": {
				backgroundColor: "#3d4772",

				"&:hover": {
					backgroundColor: "#374fb9",
				}
			},

			'@media(max-width: 1024px)': {
				width: "15vw",
				maxWidth: "98px",
				minWidth: "98px",
				fontSize: "1.5vw",
			},

			'@media(max-width: 768px)': {
				width: "15vw",
				maxWidth: "100px",
				fontSize: "2vw",
			},

			'@media(max-width: 425px)': {
				width: "35vw",
				maxWidth: "150px",
				fontSize: "5vw",
			},

			'@media(max-width: 320px)': {
				width: "32vw",
				maxWidth: "150px",
				fontSize: "5vw",
			},
		},
	})
})


export const Auth_2_0 = observer(() => {
	const classes = useStyles();
	const history = useHistory();

	const {height} = useWindowDimensions();

	const sendData = async (values) => {
		const url = 'http://localhost:8000/api/auth/sign_in';

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(values),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const json = await response.json();

			console.log('Успешно: ', JSON.stringify(json));
		} catch (error) {
			console.error('Ошибка');
		}
	}
	const demoBtn = () => {
		return (
			<Formik
				initialValues={auth.demoUser}
				onSubmit={(values, {setSubmitting}) => {
					sendData(values);
					history.push('/ports');
					setSubmitting(false);
				}}
			>
				{({isSubmitting}) => (
					<Form>
						<Button
							className={`${classes.btn} demo`}
							variant="outlined"
							color="secondary"
							type={"submit"}
							disabled={isSubmitting}
						>
							DEMO
						</Button>
					</Form>
				)}
			</Formik>
		)
	}
	const goToSignIn = () => {
		return (
			<Button
				className={`${classes.btn} login`}
				// variant="contained"
				variant="outlined"
				color="primary"
				onClick={() => history.push('/signin')}
			>
				Log in
			</Button>
		)
	}

	return (
		<div className={classes.main} style={{minHeight: height}}>
			<div className={classes.mainSubstrateLeft}/>

			<ContactUs/>

			<div className={classes.mainItem}>
				<div className={classes.mainTitle}>ViewFinder</div>

				<div className={classes.mainForm}>
					<div className={classes.mainFormBorder}>
						<div className={classes.mainFormText}></div>

						<div className={classes.mainFormBtn}>
							{demoBtn()}
							{goToSignIn()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});