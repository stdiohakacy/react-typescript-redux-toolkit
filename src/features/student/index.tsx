import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function StudentFeature () {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [dispatch])

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
