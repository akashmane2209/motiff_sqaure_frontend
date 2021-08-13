import React from 'react';
import './App.less';

import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
class App extends React.Component {
  constructor() {
    console.log('constructor')
  }
  render() {
    return (
      <div className='App'>
        <Switch>
          {['/admin'].map((path, index) => (
            <Route exact path={path} component={Login} key={index} />
          ))}{' '}
          <Route path='/admin/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
