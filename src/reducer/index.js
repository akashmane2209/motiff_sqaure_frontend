import { combineReducers } from 'redux';
import blogsReducer from './blogs.reducer';
import testimonialsReducer from './testimonials.reducer';
import sitesReducer from './sites.reducer';

export default combineReducers({
  blogs: blogsReducer,
  testimonials: testimonialsReducer,
  sites: sitesReducer
});
