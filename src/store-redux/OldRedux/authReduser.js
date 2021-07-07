let initialState = {
    demo: {
        signInData: {
            email: 'testLogIn@testLogIn.com',
            password: 'testPassword'
        }
    }
}

export const authReduser = (state = initialState, action) => {
    return state;
}