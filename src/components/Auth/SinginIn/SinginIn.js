import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import { useHistory } from "react-router-dom";
import './singinIn.css';
import '../auth.css';
import enter from './image/singIn.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom/';

export const SignIn = (props) => {
    // let history = useHistory();

    const sendMsg = async (values) => {
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
            console.error('Ошибка: ', error);
        }
    }

    return (
        <div className='singin__body'>
            <div className='singin__container'>
                <div className='singin__header'>
                    <div className='singin__header__img'>
                        <img src={enter} alt='' />
                    </div>
                    <div className='singin__header__title'>Sign in</div>
                </div>


                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (!/^[A-Z0-9._%+-]{2,}$/i.test(values.password)) {
                            errors.password = 'Invalid password';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        sendMsg(values);
                        // history.push('/ports');      // Переключение на <Ports />
                        alert("Inputed data is correct, but now 'Sign in' is Disabled.")
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='singin__form'>
                            <Field className='singin__form__item'
                                placeholder="Email"
                                type="email" name="email" />
                            <ErrorMessage name="email" component="div" />

                            <Field className='singin__form__item'
                                placeholder="Password"
                                type="password" name="password" />
                            <ErrorMessage name="password" component="div" />

                            <div className='singin__form__remember'>
                                <div className='singin__form__remember__bgc' />
                                <FormControlLabel className='singin__form__remember__text'
                                    control={<Checkbox value="remember" color="default" />}
                                    label="Remember Me"
                                />
                            </div>

                            <button
                                className='btn btn--primary'
                                type="submit"
                                disabled={isSubmitting}>
                                Sign in
                </button>
                        </Form>
                    )}
                </Formik>

                <div className='singin__footer'>
                    <div className='singin__form__remember__bgc singin__form__remember__bgc--footer' />
                    <NavLink className='singin__footer__item'
                        to='#'>
                        {"Forgot your password?"}
                    </NavLink>
                </div>
            </div>
        </div>
    )
};