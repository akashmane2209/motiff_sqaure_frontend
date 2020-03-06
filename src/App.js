import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Loading from './components/Loading';
class App extends React.Component {
  state = {
    loading: true
  };
  componentDidMount = async () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };
  render() {
    return (
      <div className='App'>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Switch>
            {['/admin'].map((path, index) => (
              <Route exact path={path} component={Login} key={index} />
            ))}{' '}
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
