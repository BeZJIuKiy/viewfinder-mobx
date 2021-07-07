import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Ports } from "./components/Ports/Ports.jsx"
import { SignIn } from './components/Auth/SinginIn/SinginIn';
import { Auth } from './components/Auth/Auth';
import { Account } from './components/Ports/Account/Account';
import { Events } from './components/Ports/Events/Events';

function App() {
	return (
		<BrowserRouter>
			<Route exact path='/' render={() =>
				<Auth state={props.state.authPage} />
			} />
			<Route path='/signin' component={SignIn} />

			<Route path='/ports' render={() => (
				<Ports
					state={props.state.portsPage}
					headerData={props.state.portsPage.header}
					events={props.state.events}
					dispatch={props.dispatch}
				/>
			)} />

			<Route path='/account' render={() => (
				<Account
					stateHeader={props.state.portsPage.header}
					// notification={props.state.events.length}
					notification={0}
					stateAccount={props.state.accountPage}
					stateDevices={props.state.portsPage.ports.data}
				/>
			)} />

			<Route path='/events' render={() => (
				<Events
					portsData={props.state.portsPage.ports.data}

					stateHeader={props.state.portsPage.header}
					notification={0}
					// notification={props.state.events.length}
					currentPortData={props.state.portsPage.currentData}
					dispatch={props.dispatch}
				/>
			)} />
		</BrowserRouter>
	);
}

export default App;
