import ApiService from './api.service';
import URLS from './url.service';

import { getCommonHeaderOptions } from './utils.service.js';

const BlogService = {
  fetchAllBlogs() {
    let axiosOption = Object.assign({}, getCommonHeaderOptions());
    return ApiService.get(URLS.BLOGS_URL(), axiosOption);
  },
  fetchBlogById(id) {
    let axiosOption = Object.assign({}, getCommonHeaderOptions());
    return ApiService.get(URLS.SINGLE_BLOG_URL(id), axiosOption);
  },
  addBlog(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    console.log(axiosOption);
    return ApiService.post(URLS.BLOGS_URL(), axiosOption);
  },
  updateBlog(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    return ApiService.put(URLS.SINGLE_BLOG_URL(body._id), axiosOption);
  }
};

export default BlogService;
