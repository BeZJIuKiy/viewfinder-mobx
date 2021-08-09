import React from 'react';
import {AccountTable} from "./Account30/Items/AccountTable";
import account from "../../store/account";
import ports from "../../store/ports";

export const Test = () => {
	const allDevices = () => {
		ports.data.forEach(({cameras}) => {

		})
	};

	return (
		<div>
			<AccountTable rowsData={account.myFleet}/>
			<AccountTable rowsData={account.myFleet}/>
		</div>
	);
};