import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Alert, message } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => (
        <Alert message={message} className='mb-2' type='error' />
      ),
      autoForceUpdate: this
    });
  }
  state = {
    username: '',
    password: '',
    logged: false
  };

  componentDidMount() {}

  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onLoginHandler = async event => {
    event.preventDefault();
    if (this.validator.allValid()) {
      const { username, password } = this.state;
      if (username === 'admin' && password === 'qpalzm1?') {
        this.props.history.push('/dashboard');
        message.success('Login Successful');
      } else {
        message.error('Invalid username or password');
      }
    } else {
      this.validator.showMessages();
    }
  };

  render() {
    let showLogin = null;
    if (!this.state.logged) {
      showLogin = (
        <div style={{ fontFamily: 'Montserrat' }} className='animated fadeIn'>
          <div className='loginSidebar'>
            <Row className='ml-5'>
              <Col lg={2} className='ml-3 mt-3'>
                <img
                  className='logo'
                  src='https://res.cloudinary.com/motiff-square/image/upload/v1583416657/Images/WhatsApp_Image_2020-02-08_at_7.56.53_PM_j2upgk.jpg'
                  height='50'
                />
              </Col>
              <Col className='mt-4'>
                <h3 style={{ color: 'white' }}>ADMIN PANEL</h3>
              </Col>
            </Row>
            <Row
              className='d-flex justify-content-center align-items-center'
              style={{ height: '78%', padding: '2rem', fontWeight: 'bold' }}
            >
              <Col>
                <p className='text-center'>
                  To enjoy good health, to bring true happiness to one's family,
                  to bring peace to all, one must first discipline and control
                  one's own mind. If a man can control his mind he can find the
                  way to Enlightenment, and all wisdom and virtue will naturally
                  come to him.
                </p>
              </Col>
            </Row>
            <Row
              style={{
                position: 'absolute',
                bottom: '25px',
                width: '100%',
                color: 'white'
              }}
            >
              <Col>
                <h6 style={{ color: 'white' }} className='text-center'>
                  Developed By{' '}
                  <a href='#' className='link'>
                    Akash Mane
                  </a>
                </h6>
              </Col>
            </Row>
          </div>

          <div className='content d-flex align-items-center justify-content-center'>
            <Row className=''>
              <Col>
                <form className='form'>
                  <p className='text-center' style={{ fontSize: '1.4rem' }}>
                    Welcome to <b>MS Admin Panel</b>
                  </p>
                  <p className='text-center text-muted'>
                    Login to manage your account
                  </p>
                  <div className='form-content'>
                    <input
                      className='form-input'
                      id='username'
                      placeholder='Username'
                      type='text'
                      value={this.state.username}
                      onChange={this.onChangeHandler}
                    />
                    {this.validator.message(
                      'username',
                      this.state.username,
                      'required'
                    )}

                    <input
                      className='form-input'
                      id='password'
                      placeholder='Password'
                      type='password'
                      value={this.state.password}
                      onChange={this.onChangeHandler}
                    />
                    {this.validator.message(
                      'Password',
                      this.state.password,
                      'required'
                    )}

                    <br />
                    <button onClick={this.onLoginHandler} className='button'>
                      Log in
                    </button>
                    <br />
                    <div className='signup-message'>
                      <br />
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else {
      showLogin = <Redirect to='/dashboard/workspace' />;
    }
    return <div>{showLogin}</div>;
  }
}

export default Login;
