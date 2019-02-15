import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';

import App from './App';
import asyncComponent from './AsyncFunc';

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            isLoggedIn
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />}
    />;

const PublicRoutes = ({history, isLoggedIn}) => {

    return (
        <ConnectedRouter history={history}>
            <div>
                <Route
                    exact
                    path={'/'}
                    component={asyncComponent(() => import('./Page/login'))}
                />
                <Route
                    exact
                    path={'/login'}
                    component={asyncComponent(() => import('./Page/login'))}
                />
                <Route
                    exact
                    path={'/register'}
                    component={asyncComponent(() => import('./Page/registration'))}
                />
                <RestrictedRoute
                    path="/message"
                    component={App}
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </ConnectedRouter>
    );
};

export default connect(state => ({
    isLoggedIn: state.auth.get('idToken') !== null
}))(PublicRoutes);
