import ApiService from './api.service';
import URLS from './url.service';

import { getCommonHeaderOptions } from './utils.service.js';

const SiteService = {
  fetchAllSites() {
    let axiosOption = Object.assign({}, getCommonHeaderOptions());
    return ApiService.get(URLS.SITES_URL(), axiosOption);
  },
  fetchSiteById(id) {
    let axiosOption = Object.assign({}, getCommonHeaderOptions());
    return ApiService.get(URLS.SINGLE_SITE_URL(id), axiosOption);
  },
  addSite(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    console.log(axiosOption);
    return ApiService.post(URLS.SITES_URL(), axiosOption);
  },
  updateSite(body) {
    let axiosOption = Object.assign(
      {},
      { data: body },
      getCommonHeaderOptions()
    );
    return ApiService.put(URLS.SINGLE_SITE_URL(body._id), axiosOption);
  }
};

export default SiteService;
