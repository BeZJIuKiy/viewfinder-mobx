import {makeAutoObservable} from "mobx";

class auth {
	demoUser = {
		email: 'testLogIn@testLogIn.com',
		password: 'testPassword',
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export default new auth();