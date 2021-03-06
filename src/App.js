import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withAuthentication } from './components/Session';
import * as ROUTES from './constants/routes';
import Navigation from './components/Navigation';
import Admin from './pages/Admin';
import DirectMessages from './pages/DirectMessages';
import Account from './pages/Account';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PasswordForget from './pages/PasswordForget';
import OhNo404 from './pages/OhNo404';
import './App.scss';

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.DMS} component={DirectMessages} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
      <Route component={OhNo404} />
    </Switch>
  </Router>
);

export default withAuthentication(App);
