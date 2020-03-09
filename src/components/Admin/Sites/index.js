import React, { Component } from 'react';
import { Table, Typography, Button, Empty, ConfigProvider } from 'antd';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
export class Sites extends Component {
  state = {
    loading: false
  };
  componentDidMount = () => {
    console.log('cdm');
    this.data = this.props.sites.map(row => ({ ...row, key: row._id }));
  };

  columns = [
    {
      title: 'Type',
      dataIndex: 'type.name',
      filters: [{ text: 'Corporate', value: 'Corporate' }],
      onFilter: (value, record) => record.type.name.includes(value)
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
  data = this.props.sites.map(row => ({ ...row, key: row._id }));

  redirectToEditor = site => {
    console.log(site);
    if (site && site._id) {
      this.props.history.push(`/admin/dashboard/sites/${site._id}`);
    } else {
      this.props.history.push('/admin/dashboard/sites/create-new');
    }
  };

  customizeRenderEmpty = () => (
    <Empty
      image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
      imageStyle={{
        height: 60
      }}
      description={<span>No Sites found</span>}
    >
      <Button type='primary' onClick={this.redirectToEditor}>
        Add Sites
      </Button>
    </Empty>
  );
  render() {
    return (
      <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
        <div className='mt-4'>
          <Title level={4}>List of Sites</Title>
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
              Add Sites
              <PlusOutlined />
            </Button>
          </div>
          <Table
            columns={this.columns}
            dataSource={this.data}
            pagination={true}
          />
        </div>
      </ConfigProvider>
    );
  }
}
const mapStateToProps = ({ sites }) => ({
  sites
});
export default connect(mapStateToProps)(Sites);
