import React, { Component } from 'react';
//MODULES
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button, Dropdown, Row, Col, message } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  state = {
    collapsed: false,
    loginCollapse: false,
    userProjects: [],
    isAdmin: true
  };

  componentDidMount = async () => {};

  getAllMessages = async () => {
    try {
      //   const response = await getAllMessages();
      //   this.props.getAllMessagesAction(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  handleMenuClick = e => {
    message.success('Logout Successful');
    // deleteUser();
    // this.props.logoutAction();
    this.props.history.push('/login');
  };
  handleProfileClick = e => {
    this.props.history.push('/dashboard/profile');
  };
  menu = (
    <Menu>
      <Menu.Item onClick={this.handleProfileClick}>
        <span>
          <p>Profile</p>
        </span>
      </Menu.Item>
      <Menu.Item onClick={this.handleMenuClick}>
        <span>
          <p>Logout</p>
        </span>
      </Menu.Item>
    </Menu>
  );

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  navigateTo = event => {
    const { key } = event;
    if (key === 'workspaces') {
      this.props.history.push('/dashboard/workspace');
    } else if (key === 'projects') {
      this.props.history.push('/dashboard/project');
    } else if (key === 'teams') {
      this.props.history.push('/dashboard/team');
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggleCollapsed}
        >
          <div className='logo' />
          <Button
            type='primary'
            className='mt-3 ml-3'
            onClick={this.toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>

          <Menu
            defaultSelectedKeys={['workspaces']}
            defaultOpenKeys={['workspaces']}
            mode='inline'
            theme='dark'
          >
            <Menu.Item>
              <Icon type='user' />
              <span>Add User</span>
              <Link to='/dashboard/adduser' />
            </Menu.Item>
            <Menu.Item>
              <Icon type='user' />
              <span>Add User</span>
              <Link to='/dashboard/adduser' />
            </Menu.Item>
            <Menu.Item>
              <Icon type='user' />
              <span>Add User</span>
              <Link to='/dashboard/adduser' />
            </Menu.Item>
            <Menu.Item>
              <Icon type='user' />
              <span>Add User</span>
              <Link to='/dashboard/adduser' />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
              <Col span={1} className='ml-3 mr-3'>
                <img
                  src='https://res.cloudinary.com/motiff-square/image/upload/v1583416657/Images/WhatsApp_Image_2020-02-08_at_7.56.53_PM_j2upgk.jpg'
                  height='50'
                />
              </Col>
              <Col span={10}>
                <h3 className='p-3'>TASKLIST</h3>
              </Col>
              <Col span={12}>
                <Dropdown overlay={this.menu}>
                  <Button
                    type='primary'
                    className='float-right mr-4 mt-3'
                    onClick={this.toggleLoginCollapsed}
                    style={{ marginBottom: 16 }}
                  >
                    &nbsp;
                    <Icon type='user' />
                    &nbsp;
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {/* <Switch>
                <Route exact path="/dashboard/workspace" component={Workspace} />
                <Route exact path="/dashboard/project" component={Project} />
                <Route exact path="/dashboard/team" component={Team} />
                <Route path="/dashboard/workspace/:id" component={Project} />
                <Route path="/dashboard/project/:id" component={Task} />
                <Route path="/dashboard/team/:id" component={TeamDetail} />
                <Route path="/dashboard/adduser" component={AddUser} />
  
                <Route exact path="dashboard/team/my" component={TeamDetail} />
                <Route path="/dashboard/mytask" component={Task} />
                <Route path="/dashboard/profile" component={Profile} />
              </Switch> */}
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Developed By Akash Mane
          </Footer>
        </Layout>
        {this.state.isAdmin ? null : <Redirect to='/dashboard/project' />}
      </Layout>
    );
  }
}

export default Dashboard;
