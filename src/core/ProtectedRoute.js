import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component,auth,unauthLocation, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (auth) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: unauthLocation,//'/unauthorized',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;