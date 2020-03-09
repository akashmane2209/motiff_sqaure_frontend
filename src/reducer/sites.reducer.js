import { GET_SITES, ADD_SITE, UPDATE_SITE } from '../actions/action.types';
const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SITES:
      return [...action.payload];

    case ADD_SITE:
      return [...state, action.payload];
    case UPDATE_SITE:
      const newSite = action.payload;
      let newSiteArr = [...state];
      let siteIndex = newSiteArr.findIndex(site => {
        console.log(site._id, newSite._id);
        return site._id === newSite._id;
      });
      if (siteIndex !== -1) {
        console.log(state);
        newSiteArr[siteIndex] = newSite;
        return newSiteArr;
      }
      break;
    default:
      return state;
  }
};
