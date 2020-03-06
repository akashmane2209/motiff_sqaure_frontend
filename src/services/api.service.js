import axios from 'axios';

let engine = {};

engine.get = function(url, opt) {
  return axios.get(url, {
    headers: opt.headers,
    params: opt.params
  });
};

engine.post = function(url, opt) {
  return axios.post(url, opt.data, {
    headers: opt.headers,
    params: opt.params
  });
};

engine.put = function(url, opt) {
  return axios.put(url, opt.data, {
    headers: opt.headers,
    params: opt.params
  });
};

engine.patch = function(url, opt) {
  return axios.patch(url, opt.data, {
    headers: opt.headers,
    params: opt.params
  });
};

engine.del = function(url, opt) {
  return axios.delete(url, {
    data: opt.data,
    headers: opt.headers,
    params: opt.params
  });
};

export default engine;
