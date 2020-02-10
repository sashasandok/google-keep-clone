import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../../auth/PrivateRoute';
import Main from '../../components/Main/Main';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import AuthProvider from '../../auth/Auth';
import DataProvider from '../../components/DataContext';
import './App.scss';

require('dotenv').config();

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <DataProvider>
          <Router>
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
