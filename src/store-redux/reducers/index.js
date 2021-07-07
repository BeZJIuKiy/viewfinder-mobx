import {combineReducers} from "redux";
import {portsReducer} from "./portsReducer";
import {accountReducer} from "./accountReducer";
import {authReducer} from "./authReducer";
import {headerReducer} from "./headerReducer";

export const rootReducer = combineReducers({
	ports: portsReducer,
	account: accountReducer,
	auth: authReducer,
	header: headerReducer,
})