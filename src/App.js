import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Login from './pages/Auth/Login';
import Master from './pages/Master';

function App() {


  return (
    <div className="App">

      

      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/reset" component={Reset} /> */}
          <Route path="/dashboard" component={Master} />
          <Route path="*">
            <h1 className="text-center mt-5"><b>404 Page not found</b></h1>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
