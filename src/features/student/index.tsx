import { Box } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function StudentFeature () {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>

      <Route path={`${match.path}/add`} exact>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/:studentId`} exact>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
