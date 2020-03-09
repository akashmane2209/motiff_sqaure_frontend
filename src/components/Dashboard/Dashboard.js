import React, { Component } from 'react';
//MODULES
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button, Dropdown, Row, Col, message } from 'antd';

//components
import Blogs from '../Admin/Blogs';
import BlogEditor from '../Admin/Blog-Editor';
import Testimonials from '../Admin/Testimonials';
import TestimonialEditor from '../Admin/Testimonial-Editor';
import Sites from '../Admin/Sites';
import Loading from '../Loading';

import {
  LocalStorageService,
  STORAGE_KEYS
} from '../../services/localStororage.service';
import BlogService from '../../services/blog.service';
import { getAllBlogsAction } from '../../actions/blog.actions';
import TestimonialService from '../../services/testimonial.service';
import { getAllTestimonialsAction } from '../../actions/testimonial.actions';
import SiteService from '../../services/sites.service';
import { getAllSitesAction } from '../../actions/site.actions';
//styles
import './Dashboard.less';
const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends Component {
  state = {
    loading: true
  };

  componentDidMount = async () => {
    try {
      this.setState({ loading: true });
      let response = await BlogService.fetchAllBlogs();
      console.log(response.data.blogs);
      await this.props.getAllBlogsAction(response.data.blogs);
      response = await TestimonialService.fetchAllTestimonials();
      await this.props.getAllTestimonialsAction(response.data.testimonials);
      response = await SiteService.fetchAllSites();
      await this.props.getAllSitesAction(response.data.sites);
      console.log('Hi');
      //   setTimeout(() => {
      this.setState({ loading: false });
      //   }, 3000);
    } catch (error) {
      message.error('Something went wrong');
      console.log(error);
    } finally {
    }
  };

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
    LocalStorageService.removeItem(STORAGE_KEYS.IS_ADMIN);
    this.props.history.push('/admin');
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

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
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
                <Icon
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </Button>

              <Menu
                defaultSelectedKeys={['workspaces']}
                defaultOpenKeys={['workspaces']}
                mode='inline'
                theme='dark'
              >
                <Menu.Item className='d-flex align-items-center'>
                  <Icon type='home' />
                  <span>Home</span>
                  <Link to='/admin/dashboard/home' />
                </Menu.Item>
                <Menu.Item>
                  <Icon type='wechat' />
                  <span>Testimonials</span>
                  <Link to='/admin/dashboard/testimonials' />
                </Menu.Item>
                <Menu.Item>
                  <Icon type='bank' />
                  <span>Sites</span>
                  <Link to='/admin/dashboard/sites' />
                </Menu.Item>
                <Menu.Item>
                  <Icon type='loading' />
                  <span>Blogs</span>
                  <Link to='/admin/dashboard/blogs' />
                </Menu.Item>
                <Menu.Item>
                  <Icon type='loading' />
                  <span>Clients</span>
                  <Link to='/admin/dashboard/clients' />
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
                      alt='logo'
                    />
                  </Col>
                  <Col span={10}>
                    <h3 className='p-3'>ADMIN PANEL</h3>
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
                <Switch>
                  <Route
                    exact
                    path='/admin/dashboard/blogs'
                    component={Blogs}
                  />
                  <Route
                    path='/admin/dashboard/blogs/:id'
                    component={BlogEditor}
                  />
                  <Route
                    exact
                    path='/admin/dashboard/blogs/create-new'
                    component={BlogEditor}
                  />
                  <Route
                    exact
                    path='/admin/dashboard/testimonials'
                    component={Testimonials}
                  />
                  <Route
                    path='/admin/dashboard/testimonials/:id'
                    component={TestimonialEditor}
                  />
                  <Route
                    exact
                    path='/admin/dashboard/testimonials/create-new'
                    component={TestimonialEditor}
                  />
                  <Route
                    exact
                    path='/admin/dashboard/sites'
                    component={Sites}
                  />
                  {/* <Route exact path="/dashboard/project" component={Project} />
                   
                    <Route path="/dashboard/workspace/:id" component={Project} />
                    <Route path="/dashboard/project/:id" component={Task} />
                    <Route path="/dashboard/team/:id" component={TeamDetail} />
                    <Route path="/dashboard/adduser" component={AddUser} />
      
                    <Route exact path="dashboard/team/my" component={TeamDetail} />
                    <Route path="/dashboard/mytask" component={Task} />
                    <Route path="/dashboard/profile" component={Profile} /> */}
                </Switch>
              </Content>

              <Footer style={{ textAlign: 'center' }} className='footer-fixed'>
                Developed By Akash Mane
              </Footer>
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}

export default connect(null, {
  getAllBlogsAction,
  getAllTestimonialsAction,
  getAllSitesAction
})(Dashboard);
