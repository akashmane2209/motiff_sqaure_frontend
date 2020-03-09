import urlJoin from 'url-join';

const BASE_URL = 'http://localhost:3001';
const URLS = {
  BLOGS_URL: () => {
    return urlJoin(BASE_URL, '/blogs');
  },
  SINGLE_BLOG_URL: id => {
    return urlJoin(BASE_URL, `/blogs/${id}`);
  },
  TESTIMONIALS_URL: () => {
    return urlJoin(BASE_URL, '/testimonials');
  },
  SINGLE_TESTIMONIAL_URL: id => {
    return urlJoin(BASE_URL, `/testimonials/${id}`);
  },
  TESTIMONIALS_HOME_UPDATE_URL: () => {
    return urlJoin(BASE_URL, '/testimonials/update-home-testimonials');
  },
  SITES_URL: () => {
    return urlJoin(BASE_URL, '/sites');
  },
  SINGLE_SITE_URL: id => {
    return urlJoin(BASE_URL, `/sites/${id}`);
  },
  IMAGE_UPLOAD_URL: () => {
    return urlJoin(BASE_URL, '/upload-images');
  }
};

export default URLS;
