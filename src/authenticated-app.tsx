import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Register from './views/Register';
import Users from './views/Users';
const AuthenticatedApp = () => {
  return (
    <div>
      <Container maxWidth="xs">
        <AppRoutes />
      </Container>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </Router>
  );
};

export default AuthenticatedApp;
