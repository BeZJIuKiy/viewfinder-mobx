import { BrowserRouter, Route } from "react-router-dom";
import { Ports } from "./components/Ports/Ports.jsx"
import { SignIn } from './components/Auth/SinginIn/SinginIn';
import { Auth } from './components/Auth/Auth';
import { Account } from './components/Ports/Account/Account';
import { Events } from './components/Ports/Events/Events';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Auth} />
      <Route path='/signin' component={SignIn} />
      <Route path='/ports' component={Ports} />
      <Route path='/account' component={Account} />
      <Route path='/events' component={Events} />
      {/*<Route path='/events' render={() => <Events /> } /> так можно*/}
    </BrowserRouter>
  );
}

export default App;
