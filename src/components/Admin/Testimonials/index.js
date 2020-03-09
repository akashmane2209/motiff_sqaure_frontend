import React, { Component } from 'react';
import {
  Table,
  Typography,
  Button,
  Empty,
  ConfigProvider,
  message
} from 'antd';
import { connect } from 'react-redux';
import { PlusOutlined, AppstoreAddOutlined } from '@ant-design/icons';

import TestimonialService from '../../../services/testimonial.service';
import { updateHomeTestimonialsAction } from '../../../actions/testimonial.actions';
const { Title } = Typography;
export class Testimonials extends Component {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    loading: false
  };
  componentDidMount = () => {
    this.getSelectedRows();
    console.log('cdm');
    console.log(this.props.testimonials);
    this.data = this.props.testimonials.map(row => ({ ...row, key: row._id }));
  };

  columns = [
    {
      title: 'Author',
      dataIndex: 'author'
    },
    {
      title: 'Content',
      dataIndex: 'content'
    },
    {
      title: 'Action',
      dataIndex: '',
      render: record => (
        <Button type='primary' onClick={() => this.redirectToEditor(record)}>
          Edit
        </Button>
      )
    }
  ];
  data = this.props.testimonials.map(row => ({ ...row, key: row._id }));

  getSelectedRows = () => {
    let selectedRowKeys = [];
    [...this.props.testimonials].map(row => {
      if (row.on_home_page) {
        selectedRowKeys.push(row._id);
      }
      return row;
    });
    this.setState(
      {
        selectedRowKeys
      },
      () => {
        console.log(this.state.selectedRowKeys, 'state');
      }
    );
  };
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  redirectToEditor = testimonial => {
    console.log(testimonial);
    if (testimonial && testimonial._id) {
      this.props.history.push(
        `/admin/dashboard/testimonials/${testimonial._id}`
      );
    } else {
      this.props.history.push('/admin/dashboard/testimonials/create-new');
    }
  };
  updateHomeTestimonials = async () => {
    try {
      this.setState({
        loading: true
      });
      let data = {
        ids: this.state.selectedRowKeys
      };
      const response = await TestimonialService.updateHomeTestimonial(data);
      if (response.status === 200) {
        this.props.updateHomeTestimonialsAction(data.ids);
        message.success('Changes Saved Successful');
      }
      this.setState({
        loading: false
      });
    } catch (error) {
      message.error('Something went wrong');
      console.log(error);
    }
  };
  customizeRenderEmpty = () => (
    <Empty
      image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
      imageStyle={{
        height: 60
      }}
      description={<span>No Testimonials found</span>}
    >
      <Button type='primary' onClick={this.redirectToEditor}>
        Add Testimonials
      </Button>
    </Empty>
  );
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled:
          this.state.selectedRowKeys.length > 10 &&
          this.state.selectedRowKeys.findIndex(row => row === record._id) ===
            -1, // Column configuration not to be checked
        name: record.name
      })
    };
    return (
      <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
        <div className='mt-4'>
          <Title level={4}>List of Testimonials</Title>
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
              Add Testimonial
              <PlusOutlined />
            </Button>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.data}
            pagination={true}
          />
        </div>
        <Button
          loading={this.state.loading}
          type='primary'
          size='large'
          shape='round'
          onClick={this.updateHomeTestimonials}
          className='d-flex align-items-center'
        >
          Update Selected
          <AppstoreAddOutlined />
        </Button>
      </ConfigProvider>
    );
  }
}
const mapStateToProps = ({ testimonials }) => ({
  testimonials
});
export default connect(mapStateToProps, {
  updateHomeTestimonialsAction
})(Testimonials);
