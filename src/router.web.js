import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import auth from './components/web/auth'
import Main from './components/web/main'
import Login from './components/web/login'

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default () => (
    <Router>
    <div>
    <PrivateRoute exact path="/" component={Main} onEnter={requireAuth} />
    <Route path="/login" component={Login} />
    </div>
    </Router>
)

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
