import {
  GET_TESTIMONIALS,
  UPDATE_TESTIMONIAL,
  ADD_TESTIMONIAL,
  UPDATE_HOME_TESTIMONIAL
} from './action.types';

export const getAllTestimonialsAction = testimonials => async dispatch => {
  dispatch({
    type: GET_TESTIMONIALS,
    payload: testimonials
  });
};

export const addTestimonialAction = testimonial => async dispatch => {
  dispatch({
    type: ADD_TESTIMONIAL,
    payload: testimonial
  });
};

export const updatTestimonialAction = testimonial => async dispatch => {
  dispatch({
    type: UPDATE_TESTIMONIAL,
    payload: testimonial
  });
};

export const updateHomeTestimonialsAction = ids => async dispatch => {
  dispatch({
    type: UPDATE_HOME_TESTIMONIAL,
    payload: ids
  });
};
