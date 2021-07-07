import React from 'react';
import {Header} from '../Header/Header';
import './account.css'
import Button from '@material-ui/core/Button';
import {DevicesTable} from './DataTable/DevicesTable';
import {FleetTable} from './DataTable/FleetTable';
import {observer} from "mobx-react-lite";
import account from "../../../store-mobx/account";


export const Account = observer(() => {
	const {
		userData: {avatar, name, company, phone, email, status},
	} = account;

	return (
		<div className='account'>
			<div>
				<Header/>

				<div className='account__container'>
					<div className='account__body'>
						<div className='account__item'>
							<div className='account__item__title'>Profile</div>
							<div className='account__item__icon'>
								<img src={avatar} alt=''/>
							</div>

							<div className='account__item__info'>
								<div className='account__item__info__user'>
									<div className='account__item__user_nickname'>Name:</div>
									<div className='account__item__company'>Company:</div>
									<div className='account__item__phone'>Phone:</div>
									<div className='account__item__email'>Email:</div>
									<div className='account__item__status'>Status:</div>
								</div>

								{/* <div className='account__item__user__data'> */}
								<div className='account__item__user__data'>
									<div className='account__item__user_nickname'>{name}</div>
									<div className='account__item__company'>{company}</div>
									<div className='account__item__phone'>{phone}</div>
									<div className='account__item__email'>{email}</div>
									<div className='account__item__status'>{status}</div>
								</div>
							</div>
						</div>

						<div className='account__item'>
							<div className='account__item__title'>Balance</div>
							<div className='account__balance'>
								<div className='account__balance__item'>
									<div className="account__item__info__user">My wallet:</div>
									<div className="account__balance__money">0$</div>
								</div>

								<Button
									variant="outlined"
									color="primary"
									onClick={() => alert("Поехали донатить :)")}
								>
									Deposit money
								</Button>
							</div>
						</div>

						<div className='account__item'>
							<div className='account__item__title'>My devices</div>
							<DevicesTable/>
						</div>
					</div>
				</div>
			</div>

			<div className='account__container'>
				<div className='account__footer'>
					<div className='account__footer__events'>
						<FleetTable/>
					</div>
				</div>
			</div>
		</div>
	)
});