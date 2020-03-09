import { GET_SITES, UPDATE_SITE, ADD_SITE } from './action.types';

export const getAllSitesAction = sites => async dispatch => {
  dispatch({
    type: GET_SITES,
    payload: sites
  });
};

export const addSiteAction = site => async dispatch => {
  dispatch({
    type: ADD_SITE,
    payload: site
  });
};

export const updatSiteAction = site => async dispatch => {
  dispatch({
    type: UPDATE_SITE,
    payload: site
  });
};
