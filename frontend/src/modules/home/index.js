import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../common/constants';
import Home from './pages/Home';
import Crime from './pages/Crime';

const HomeWrapper = () => {
  return (
    <Switch>
      <Route exact path={ROUTES?.MAIN} component={Home} />
      <Route exact path={ROUTES?.CRIME} component={Crime} />
    </Switch>
  );
};

export default HomeWrapper;
