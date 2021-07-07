const initialState = {
	demoUser: {
		email: 'testLogIn@testLogIn.com',
		password: 'testPassword',
	}
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {

		default: return state;
	}
}