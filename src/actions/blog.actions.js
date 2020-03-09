import { GET_BLOGS, UPDATE_BLOG, ADD_BLOG } from './action.types';

export const getAllBlogsAction = blogs => async dispatch => {
  dispatch({
    type: GET_BLOGS,
    payload: blogs
  });
};

export const addBlogAction = blog => async dispatch => {
  dispatch({
    type: ADD_BLOG,
    payload: blog
  });
};

export const updatBlogAction = blog => async dispatch => {
  dispatch({
    type: UPDATE_BLOG,
    payload: blog
  });
};
