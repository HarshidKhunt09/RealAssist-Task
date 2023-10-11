import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Error404 from '../Error404.js';
import { ROUTES } from '../common/constants.js';
import HomeWrapper from '../modules/home/index.js';

const ContentRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES?.MAIN} component={HomeWrapper} />
        <Route path='*' exact component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default ContentRoutes;
