import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { UserContext } from "./UserContext";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Home from './pages/Home';
import Nav from './components/Nav';
import { useMemo, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  const value = useMemo(()=>({user,setUser}), [user,setUser]);
  return (
    <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={value}>
          <Nav/>
          <main className="form-signin">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/user" component={User}/>
            </Switch>
          </main>
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
