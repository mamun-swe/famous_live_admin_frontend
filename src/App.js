import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Auth/Login';
import Master from './pages/Master';

function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/reset" component={Reset} /> */}
          <PrivateRoute>
            <Route path="/dashboard" component={Master} />
          </PrivateRoute>
          <Route path="*">
            <h1 className="text-center mt-5"><b>404 Page not found</b></h1>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
