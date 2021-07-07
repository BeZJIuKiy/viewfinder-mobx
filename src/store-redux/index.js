import {createStore} from "redux";
import {rootReducer} from "./reducers";

const saveState = (state) => {
	try {
		// Convert the state to a JSON string
		const serialisedState = JSON.stringify(state);

		// Save the serialised state to localStorage against the key 'app_state'
		window.localStorage.setItem('app_state', serialisedState);
	} catch (error) {
		console.log('Oops, some error');
	}
}

const loadState = () => {
	try {
		const serialisedState = window.localStorage.getItem('app_state');

		if (!serialisedState) return undefined;
		return JSON.parse(serialisedState);
	} catch (error) {
		return undefined;
	};
};

const oldState = loadState();

// export const store-redux = createStore(rootReducer, oldState);
export const store = createStore(rootReducer);

store.subscribe(() => {
	saveState(store.getState());
});