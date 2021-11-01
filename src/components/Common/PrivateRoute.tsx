import * as React from 'react';
import { RouteProps, Redirect, Route } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if(!isLoggedIn) return <Redirect to='/login' />
    return <Route {...props} />
}