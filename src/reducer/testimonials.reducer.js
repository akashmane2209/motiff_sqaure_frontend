import {
  GET_TESTIMONIALS,
  ADD_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
  UPDATE_HOME_TESTIMONIAL
} from '../actions/action.types';
const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TESTIMONIALS:
      return [...action.payload];

    case ADD_TESTIMONIAL:
      return [...state, action.payload];
    case UPDATE_TESTIMONIAL:
      const newTestimonial = action.payload;
      let newTestimonialArr = [...state];
      let testimonialIndex = newTestimonialArr.findIndex(testimonial => {
        console.log(testimonial._id, newTestimonial._id);
        return testimonial._id === newTestimonial._id;
      });
      if (testimonialIndex !== -1) {
        newTestimonialArr[testimonialIndex] = newTestimonial;
        return newTestimonialArr;
      }
      break;
    case UPDATE_HOME_TESTIMONIAL:
      const ids = action.payload;
      let newTestimonialArr1 = [...state];
      newTestimonialArr1 = newTestimonialArr1.map(testimonial => {
        if (ids.includes(testimonial._id)) {
          testimonial.on_home_page = true;
        } else {
          testimonial.on_home_page = false;
        }
        return testimonial;
      });
      console.log(newTestimonialArr1);
      return newTestimonialArr1;
    default:
      return state;
  }
};
