import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import backgroundImage from "./images/backgroundNew.jpg"
import Button from "@material-ui/core/Button";
import auth from "../../store/auth";
import {Form, Formik} from "formik";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    main: {
        width: "100wh",
        height: "100vh",

        display: "flex",

        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        fontFamily: "Roboto",

        position: "relative",
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
    },

    mainSubstrateRight: {
        width: "50%",
        height: "100%",

        backgroundColor: "#333",
        opacity: 0.2,

        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
    },

    mainTitle: {
        color: "white",
        fontSize: "4vw",
        fontWeight: 500,
        userSelect: "none",
        // marginBottom: "1vw",
    },

    mainItem: {
        width: "50%",
        textAlign: "center",

        position: "absolute",
        top: "50%",
        left: "25%",
        transform: "translate(-50%, -25%)",
        zIndex: 2,
    },

    mainForm: {
        display: "flex",
        flexDirection: "column",
        // height: "80%",
        justifyContent: "center",
        alignItems: "center",

        position: "relative",
    },

    mainFormBorderSubstrate: {
        width: "40%",
        height: "100%",
        padding: "10px 30px",
        borderRadius: 5,

        backgroundColor: "#555",
        opacity: 0.7,

        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: -1,

        transform: "translate(-50%, -50%)",
    },

    mainFormBorder: {
        width: "50%",

        // backgroundColor: "#444",
        // opacity: 0.7,

        // borderRadius: 5,
        color: "white",

        padding: "10px 30px",
    },

    mainFormTitle: {
        fontSize: "2.5vw",
        textAlign: "left",
    },

    mainFormText: {
        marginBottom: "6%",
        fontSize: "1.2vw",
    },

    mainFormBtn: {
        marginTop: 10,
        display: "flex",
        justifyContent: "space-around",
    },
}))

export const Auth_2_0 = () => {
    const classes = useStyles();
    const history = useHistory();

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
            console.log('Ошибка');
            // console.error('Ошибка: ', error);
        }
    }

    const demoBtn = () =>
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
                        variant="contained"
                        color="secondary"
                        style={{fontSize: "1.5vw", width: "10vw"}}
                        type={"submit"}
                        disabled={isSubmitting}
                    >
                        DEMO
                    </Button>
                </Form>
            )}
        </Formik>

    const goToSignIn = () =>
        <Button
            variant="contained"
            color="primary"
            style={{fontSize: "1.5vw", width: "10vw"}}
            onClick={() => history.push('/signin')}
        >
            Log in
        </Button>


    return (
        <div className={classes.main}>
            <div className={classes.mainSubstrateLeft}></div>
            <div className={classes.mainItem}>
                <div className={classes.mainTitle}>ViewFinder</div>
                <div className={classes.mainForm}>
                    {/*<div className={classes.mainFormBorderSubstrate}></div>*/}
                    <div className={classes.mainFormBorder}>
                        {/*<div className={classes.mainFormTitle}>ViewFinder</div>*/}
                        <div className={classes.mainFormText}>текст текст текст много текста</div>
                        <div className={classes.mainFormBtn}>
                            {demoBtn()}
                            {goToSignIn()}
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.mainSubstrateRight}></div>
            <div className={classes.mainItem}></div>
        </div>
    );
};