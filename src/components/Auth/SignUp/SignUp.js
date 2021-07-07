import React from 'react';
import { useHistory } from "react-router-dom";
import './signUp.css';
import '../auth.css';
import enter from '../SinginIn/image/singIn.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom/';

export const SignUp = () => {
    // let history = useHistory();

    const sendMsg = async (values) => {
        const url = 'http://localhost:8000/api/auth/sign_up';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            // console.log('Успешно: ', JSON.stringify(json));
        } catch (error) {
            console.log('Ошибка');
            console.error('Ошибка: ', error);
        }
    }

    return (
        <div className='singup__body'>
            <div className='singup__container'>
                <div className='singup__header'>
                    <div className='singup__header__img'>
                        <img src={enter} alt='' />
                    </div>
                    <div className='singup__header__title'>
                        Sign up
                </div>
                </div>


                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.firstName) {
                            errors.firstName = 'Required';
                        } else if (!/^[a-zA-Z]{2,}$/i.test(values.firstName)) {
                            errors.firstName = 'Invalid First Name';
                        }

                        if (!values.lastName) {
                            errors.lastName = 'Required';
                        } else if (!/^[a-zA-Z]{2,}$/i.test(values.lastName)) {
                            errors.lastName = 'Invalid Last Name';
                        }

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
                    onSubmit={(values) => {
                        console.log('onSubmit');
                        sendMsg(values);
                        history.push('/ports');         // Переход на ports
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='singup__form'>
                            <div className='singup__form__items'>
                                <div className='singup__form__item teeeest'>
                                    <Field className='singup__input'
                                        placeholder="First Name *"
                                        type="firstName" name="firstName" />

                                    <ErrorMessage className='singup__error'
                                        name="firstName" component="div" />
                                </div>

                                <div className='singup__form__item teeeest'>
                                    <Field className='singup__input'
                                        placeholder="Last Name *"
                                        type="lastName" name="lastName" />

                                    <ErrorMessage className='singup__error'
                                        name="lastName" component="div" />
                                </div>
                            </div>


                            <div className='singup__form__item'>
                                <Field className='singup__input'
                                    placeholder="Email *"
                                    type="email" name="email" />

                                <ErrorMessage className='singup__error'
                                    name="email" component="div" />
                            </div>

                            <div className='singup__form__item'>
                                <Field className='singup__input'
                                    placeholder="Password *"
                                    type="password" name="password" />

                                <ErrorMessage className='singup__error'
                                    name="password" component="div" />
                            </div>

                            <br />

                            <button
                                className='btn btn--primary signUp__btn'
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Sign Up
                    </button>
                        </Form>
                    )}
                </Formik>

                <div className='singup__footer'>
                    <NavLink className='singup__footer__item'
                        to='/signin'>
                        {'Already have an account? Sign in'}
                    </NavLink>
                </div>
            </div>
        </div>
    )
};