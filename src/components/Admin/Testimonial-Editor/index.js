import React, { Component } from 'react';
import ImageUploaderService from '../../../services/image-uploader.service';
import TestimonialService from '../../../services/testimonial.service';
import { Input, Button } from 'antd';
import { Typography } from 'antd';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import './index.less';
import { connect } from 'react-redux';
import {
  addTestimonialAction,
  updatTestimonialAction
} from '../../../actions/testimonial.actions';

import Loading from '../../Loading';
import ImagePreview from '../../common/ImagePreview';
const { Title } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
export class TestimonialEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      content: '',
      image: '',
      loading: false,
      pageLoading: true,
      btnText: 'Save',
      on_home_page: false,
      show_preview: false
    };
  }

  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const { id } = this.props.match.params;
    if (id !== 'create-new') {
      const response = await TestimonialService.fetchTestimonialById(id);
      const { testimonial } = response.data;
      console.log(testimonial);
      const { author, content, image, on_home_page } = testimonial;

      this.setState({
        author,
        content,
        image,
        on_home_page,
        btnText: 'Update',
        show_preview: true
      });
    }
    this.setState({
      pageLoading: false
    });
  };

  uploaderProps = {
    name: 'file',
    multiple: true,
    customRequest: async options => {
      console.log(options);
      let url = await this.uploadImageCallBack(options.file);
      options.onSuccess(url);
      this.setState({
        image: url,
        show_preview: true
      });
    },

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  uploadImageCallBack = file => {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
        let response = await ImageUploaderService.uploadImage(formData);
        console.log(response);
        resolve(response.data.data[0].secure_url);
      } catch (error) {
        reject(error);
      }
    });
  };
  handleTextChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  saveOrUpdateTestimonial = async () => {
    try {
      this.setState({ loading: true });
      const { author, content, image, on_home_page } = this.state;
      const data = {
        author,
        content,
        image,
        on_home_page
      };
      if (this.state.btnText === 'Save') {
        const response = await TestimonialService.addTestimonial(data);
        if (response.status === 201) {
          message.success('Testimonial Added successfully');
          await this.props.addTestimonialAction(response.data.testimonial);
          this.setState({ loading: false });

          this.props.history.push('/admin/dashboard/testimonials');
        }
      } else {
        data._id = this.props.match.params.id;
        const response = await TestimonialService.updateTestimonial(data);
        if (response.status === 200) {
          message.success('Testimonial Updated successfully');
          await this.props.updatTestimonialAction(data);
          this.setState({ loading: false });
          this.props.history.push('/admin/dashboard/testimonials');
        }
      }
    } catch (error) {
      message.error('Failed to Save. Try again later');
      this.setState({ loading: false });

      console.log(error);
    }
  };
  render() {
    const { author, content, image } = this.state;

    return (
      <div className='container mt-3'>
        {this.state.pageLoading ? (
          <Loading />
        ) : (
          <div>
            <Title level={4}>Testimonial Author</Title>
            <Input
              size='large'
              placeholder='Author'
              className='mb-3'
              id='author'
              onChange={this.handleTextChange}
              value={author}
            />
            <Title level={4}>Testimonial Description</Title>
            <TextArea
              placeholder='Content of this testimonial'
              className='mb-3'
              id='content'
              onChange={this.handleTextChange}
              value={content}
            />

            <Dragger {...this.uploaderProps} className='mt-4'>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
            <Title level={4} className='mt-4'>
              Image Preview
            </Title>
            <ImagePreview
              show_preview={this.state.show_preview}
              image_url={image}
            />

            <Button
              type='primary'
              shape='round'
              size='large'
              style={{ width: '150px', height: '50px' }}
              className='mt-4'
              loading={this.state.loading}
              onClick={this.saveOrUpdateTestimonial}
            >
              {this.state.btnText}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, {
  addTestimonialAction,
  updatTestimonialAction
})(TestimonialEditor);
