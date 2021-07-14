import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik, Form, Formik} from "formik";
import {useHistory} from "react-router-dom";

import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    textField: {
        backgroundColor: "#e5e5e5",
    },
    link: {
        color: "#e5e5e5",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SigninForm = () => {
    const classes = useStyles();
    const history = useHistory();

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const WithMaterialUI = () => {
        const formik = useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: validationSchema,
            onSubmit: (values) => {
                // alert(JSON.stringify(values, null, 2));
                if (postUser(values)) history.push("/ports");
            },
        });

        return (
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        inputProps={{className: classes.textField}}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        inputProps={{className: classes.textField}}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid container justify="flex-end">
                            <Link href="#" variant="body2" className={classes.link}>
                                Forgot password?
                            </Link>
                        </Grid>
                        {/*<Grid item>*/}
                        {/*    <Link href="#" variant="body2" className={classes.link}>*/}
                        {/*        {"Don't have an account? Sign Up"}*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                    </Grid>
                </form>
            </div>
        );
    };

    const postUser = async (values) => {
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

            return true;
        } catch (error) {
            console.log('Ошибка');
            console.error('Ошибка: ', error);
            return false;
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {WithMaterialUI()}
            </div>
        </Container>
    );
}