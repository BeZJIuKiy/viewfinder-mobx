import {BrowserRouter, Route} from "react-router-dom";
import {Ports} from "./components/Ports/Ports.jsx"
import {Auth_2_0} from "./components/Auth/Auth_2.0";
import {Signin_2_0} from "./components/Auth/SinginIn/Signin_2.0";
import {Test} from "./components/Ports/Test";
import {Events30} from "./components/Ports/Events/Events3.0";
import connects from "./store/connects";
// import {SoundAlert} from "./components/SoundAlert";
import {NewAccount} from "./components/Ports/NewAccount/NewAccount";


function App() {
    // connects.setUrlEvents("http://localhost:5001/api/boats");
    connects.setUrlEvents("http://192.168.250.183:5001/api/boats");

    // connects.setUrlZones("http://localhost:5001/api/zones");
    // connects.setUrlZones("http://192.168.250.183:5001/api/zones");
    connects.setUrlZones("http://87.244.7.150:8080");

    // connects.setUrlPortsPage("http://localhost:8080/api/boats");


    // connects.setServerEvents(new EventSource('http://192.168.250.183:5001/api/boats/sse'));
    // connects.setWSCameraCameraControl(new WebSocket(`ws://192.168.250.147:7000`)); //Для выставки

    // connects.setWSCameraCameraControl(new WebSocket(`ws://localhost:7000`)); //Для выставки
    connects.setWSCameraCameraControl(new WebSocket(`ws://192.168.250.183:8080`)); // For work with LuckeR

    return (
        <BrowserRouter>
            {/* <SoundAlert/> */}
            <Route exact path='/' component={Auth_2_0}/>
            <Route path='/signin' component={Signin_2_0}/>
            <Route path='/ports' component={Ports}/>
            <Route path='/account' component={NewAccount}/>
            <Route path='/events' component={Events30}/>
            <Route path='/test' component={Test}/>
            {/*<Route path='/events' render={() => <Events /> } /> // так можно*/}
        </BrowserRouter>
    );
}

export default App;
