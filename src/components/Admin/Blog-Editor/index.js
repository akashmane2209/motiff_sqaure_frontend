import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ImageUploaderService from '../../../services/image-uploader.service';
import BlogService from '../../../services/blog.service';
import { Input, Button, DatePicker } from 'antd';
import { Typography } from 'antd';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import { addBlogAction, updatBlogAction } from '../../../actions/blog.actions';

import Loading from '../../Loading';
import ImagePreview from '../../common/ImagePreview';
const { Title } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
export class BlogEditor extends Component {
  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        blog_author: '',
        blog_desc: '',
        blog_title: '',
        loading: false,
        pageLoading: true,
        btnText: 'Save',
        blog_image: '',
        publish_date: moment(),
        blog_content: draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        ),
        show_preview: false
      };
    }
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const { id } = this.props.match.params;
    if (id !== 'create-new') {
      const response = await BlogService.fetchBlogById(id);
      const { blog } = response.data;
      console.log(blog);
      const {
        blog_author,
        blog_content,
        blog_desc,
        blog_title,
        publish_date,
        blog_image
      } = blog;
      const contentBlock = htmlToDraft(blog_content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState
        });
      }
      this.setState({
        blog_author,
        blog_content,
        blog_desc,
        blog_title,
        publish_date: moment(publish_date),
        btnText: 'Update',
        blog_image,
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
        blog_image: url,
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
  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      blog_content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };
  handleTextChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  onChange = (date, dateString) => {
    this.setState({
      publish_date: date
    });
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
  saveOrUpdateBlog = async () => {
    try {
      this.setState({ loading: true });
      const {
        blog_author,
        blog_title,
        blog_desc,
        blog_image,
        publish_date,
        blog_content
      } = this.state;
      const data = {
        blog_author,
        blog_title,
        blog_desc,
        blog_image,
        publish_date: moment(publish_date).format('MM-DD-YYYY'),
        blog_content
      };
      if (this.state.btnText === 'Save') {
        const response = await BlogService.addBlog(data);
        if (response.status === 201) {
          message.success('Blog Added successfully');
          this.setState({ loading: false });
          this.props.addBlogAction(data);

          this.props.history.push('/admin/dashboard/blogs');
        }
      } else {
        data._id = this.props.match.params.id;
        const response = await BlogService.updateBlog(data);
        if (response.status === 200) {
          message.success('Blog Updated successfully');
          this.setState({ loading: false });
          this.props.updatBlogAction(data);
          this.props.history.push('/admin/dashboard/blogs');
        }
      }
    } catch (error) {
      message.error('Failed to Save. Try again later');
      this.setState({ loading: false });

      console.log(error);
    }
  };
  render() {
    const {
      editorState,
      blog_author,
      blog_desc,
      blog_title,
      publish_date
    } = this.state;

    return (
      <div className='container mt-3'>
        {this.state.pageLoading ? (
          <Loading />
        ) : (
          <div>
            <Title level={4}>Blog Title</Title>
            <Input
              size='large'
              placeholder='Title'
              className='mb-3'
              id='blog_title'
              onChange={this.handleTextChange}
              value={blog_title}
            />
            <Title level={4}>Blog Description</Title>
            <TextArea
              placeholder='A short description about this blog'
              className='mb-3'
              id='blog_desc'
              onChange={this.handleTextChange}
              value={blog_desc}
            />
            <Title level={4}>Author</Title>
            <Input
              size='large'
              placeholder='Author Name'
              className='mb-3'
              id='blog_author'
              onChange={this.handleTextChange}
              value={blog_author}
            />
            <Title level={4} className='mb-3'>
              Blog Content
            </Title>
            <Editor
              editorState={editorState}
              toolbarClassName='toolbarClassName'
              wrapperClassName='wrapperClassName'
              editorClassName='editor-container'
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: this.uploadImageCallBack,
                  alt: { present: true, mandatory: true }
                }
              }}
              onEditorStateChange={this.onEditorStateChange}
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
              image_url={this.state.blog_image}
            />
            <Title level={4} className='mt-4'>
              Publish Date
            </Title>
            <div>
              <DatePicker
                size='large'
                onChange={this.onChange}
                value={publish_date}
              />
            </div>
            <Button
              type='primary'
              shape='round'
              size='large'
              style={{ width: '150px', height: '50px' }}
              className='mt-4'
              loading={this.state.loading}
              onClick={this.saveOrUpdateBlog}
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
  addBlogAction,
  updatBlogAction
})(BlogEditor);
