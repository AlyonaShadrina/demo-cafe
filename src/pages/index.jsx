import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Loading from '../base/_common/Loading';
import { paths } from '../config';
import PrivateRoute from './routes/PrivateRoute';
import privateRoutes from './routes/privateRoutesArray';
// eslint-ignore-import/namespace
const Login = lazy(() => import('./Login'));
const Error = lazy(() => import('./Error'));

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path={paths.login} component={Login} />
      <Route exact path={`${paths.error}/:status`} component={Error} />
      <PrivateRoute exact from="/" component={() => <Redirect to={paths.account} />} />
      {privateRoutes.map((route, i) => (
        <PrivateRoute key={i} exact={route.exact} path={route.path} component={route.component} />
      ))}
    </Switch>
  </Suspense>
);

export default Routes;
