import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Users from './views/Users';
const AuthenticatedApp = () => {
  return (
    <div>
      <Container maxWidth="md">
        <AppRoutes />
      </Container>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Users} />
      </Switch>
    </Router>
  );
};

export default AuthenticatedApp;
