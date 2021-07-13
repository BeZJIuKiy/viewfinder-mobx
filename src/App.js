import {BrowserRouter, Route} from "react-router-dom";
import {Ports} from "./components/Ports/Ports.jsx"
// import { SignIn } from './components/Auth/SinginIn/SinginIn';
// import { Auth } from './components/Auth/Auth';
import {Account} from './components/Ports/Account/Account';
import {Events} from './components/Ports/Events/Events';
import {Canvas} from "./components/Ports/Events/Canvas";
import {Auth_2_0} from "./components/Auth/Auth_2.0";
import {Signin_2_0} from "./components/Auth/SinginIn/Signin_2.0";


function App() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Auth_2_0}/>
            <Route path='/signin' component={Signin_2_0}/>
            <Route path='/ports' component={Ports}/>
            <Route path='/account' component={Account}/>
            <Route path='/events' component={Events}/>
            <Route path='/canvas' component={Canvas}/>
            {/*<Route path='/events' render={() => <Events /> } /> так можно*/}
        </BrowserRouter>
    );
}

export default App;
