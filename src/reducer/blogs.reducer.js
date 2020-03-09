import { GET_BLOGS, ADD_BLOG, UPDATE_BLOG } from '../actions/action.types';
const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return [...action.payload];

    case ADD_BLOG:
      return [...state, action.payload];
    case UPDATE_BLOG:
      const newBlog = action.payload;
      let newBlogArr = [...state];
      let blogIndex = newBlogArr.findIndex(blog => {
        console.log(blog._id, newBlog._id);
        return blog._id === newBlog._id;
      });
      if (blogIndex !== -1) {
        console.log(state);
        newBlogArr[blogIndex] = newBlog;
        return newBlogArr;
      }
      break;
    default:
      return state;
  }
};
