import * as PortsActionCreators from "./ports"
import * as AuthActionCreators from "./auth"
import * as HeaderActionCreators from "./header"

export default {
	...PortsActionCreators,
	...AuthActionCreators,
	...HeaderActionCreators,
}