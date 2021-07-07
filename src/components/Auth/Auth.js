import './auth.css';
import 'fontsource-roboto';
import {NavLink, useHistory} from 'react-router-dom';
import {Form, Formik} from 'formik';
import auth from "../../store-mobx/auth";


export const Auth = () => {
	const history = useHistory();

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
			// console.error('Ошибка: ', error);
		}
	}

	return (
		<div className='auth'>
			<div className={`auth__info`}>
				<div className={`auth__info project__name`}>
					ViewFinder
				</div>

				<div className={`auth__info__contact__us`}>
					<div className={`auth__info__contact__us phone`}>
						Phone:&nbsp;<a href="tel:+71112223344">+X (XXX) XXX-XX-XX</a>
					</div>
					<div className={`auth__info__contact__us email`}>
						Email:&nbsp; <a href="mailto:servise.soft@somemail.com"
						                target="_blanc">servise.soft@somemail.com</a>
					</div>
					<div className={`auth__info__substrate contact__us`}></div>
				</div>
			</div>
			<div className='auth__wrapper'>
				<div className='auth__item'>
					<Formik
						className='formik__demo__submit'
						initialValues={auth.demoUser}
						onSubmit={(values, {setSubmitting}) => {
							sendMsg(values);
							history.push('/ports');
							setSubmitting(false);
						}}
					>

						{({isSubmitting}) => (
							<Form className='auth__demo__submit'>
								<button
									className='btn btn--secondary btn--auth'
									type="submit"
									disabled={isSubmitting}
								>
									DEMO
								</button>
							</Form>
						)}

					</Formik>
				</div>

				<div className='auth__item'>
					<NavLink className='btn btn--primary btn--auth'
					         to='/signin'>Sign in</NavLink>
				</div>
			</div>
		</div>
	);
}