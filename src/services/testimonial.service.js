import ApiService from './api.service';
import URLS from './url.service';

import { getCommonHeaderOptions } from './utils.service.js';

const BlogService = {
  fetchAllTestimonials() {
    let axiosOption = Object.assign({}, getCommonHeaderOptions());
    return ApiService.get(URLS.TESTIMONIALS_URL(), axiosOption);
  },
  fetchTestimonialById(id) {
    let axiosOption = Object.assign({}, getCommonHeaderOptions());
    return ApiService.get(URLS.SINGLE_TESTIMONIAL_URL(id), axiosOption);
  },
  addTestimonial(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    console.log(axiosOption);
    return ApiService.post(URLS.TESTIMONIALS_URL(), axiosOption);
  },
  updateTestimonial(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    return ApiService.put(URLS.SINGLE_TESTIMONIAL_URL(body._id), axiosOption);
  },
  updateHomeTestimonial(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    return ApiService.put(URLS.TESTIMONIALS_HOME_UPDATE_URL(), axiosOption);
  }
};

export default BlogService;
