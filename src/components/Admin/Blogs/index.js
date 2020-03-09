import React from 'react';
import { List, Avatar, ConfigProvider, Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { CalendarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <span className='d-flex align-items-center'>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    <span>{text}</span>
  </span>
);
class Blogs extends React.Component {
  state = {
    blogData: []
  };
  componentDidMount = async () => {
    // try {
    //   let response = await BlogService.fetchAllBlogs();
    //   this.setState({ blogData: response.data.blogs });
    // } catch (error) {
    //   message.error('Failed to Load blogs');
    //   console.log(error);
    // }
  };
  redirectToEditor = blog => {
    if (blog && blog._id) {
      this.props.history.push(`/admin/dashboard/blogs/${blog._id}`);
    } else {
      this.props.history.push('/admin/dashboard/blogs/create-new');
    }
  };
  customizeRenderEmpty = () => (
    <Empty
      image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
      imageStyle={{
        height: 60
      }}
      description={<span>No Blogs found</span>}
    >
      <Button type='primary' onClick={this.redirectToEditor}>
        Create New
      </Button>
    </Empty>
  );
  render() {
    const { blogs } = this.props;
    return (
      <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
        <div
          className='col-lg-12 mt-4 mb-4 pl-2 pt-4 pb-4 '
          style={{ background: 'white' }}
        >
          <Button
            type='primary'
            size='large'
            shape='round'
            onClick={this.redirectToEditor}
            className='d-flex align-items-center'
          >
            Create New Blog
            <PlusOutlined />
          </Button>
        </div>

        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 8
          }}
          dataSource={blogs}
          footer={<div></div>}
          renderItem={item => (
            <List.Item
              className='list-item'
              key={item._id}
              extra={<img width={100} alt='logo' src={item.blog_image} />}
              style={{ cursor: 'pointer' }}
              onClick={() => this.redirectToEditor(item)}
              actions={[
                <IconText
                  icon={CalendarOutlined}
                  text={item.publish_date.substring(0, 10)}
                  key='list-vertical-star-o'
                />
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src='https://res.cloudinary.com/motiff-square/image/upload/v1583575266/Images/Screenshot%202020-02-12%20at%202.58.16%20PM.png.png' />
                }
                title={item.blog_title}
                description={item.blog_desc}
              />
              {item.content}
            </List.Item>
          )}
        />
      </ConfigProvider>
    );
  }
}

const mapStateToProps = ({ blogs }) => ({
  blogs: blogs
});
export default connect(mapStateToProps, null)(Blogs);
