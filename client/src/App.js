import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Nav/>
          <main className="form-signin">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/user" component={User}/>
            </Switch>
          </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
