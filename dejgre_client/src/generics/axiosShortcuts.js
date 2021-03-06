import axios from "axios";
import Toast from "./toast";

function axiosFail(respError) {
  new Toast({message: respError?.response?.data?.error ?? respError, type: "danger"});
}

function basicErrorHandling(error) {
  if (error.response?.status === 401) {
    axiosRequests.removeAuthToken();
    location.pathname = "";
  }
  return Promise.reject(error);
}

function emptySuccessCallback() {}

const axiosRequests = {
  get: (url, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'GET',
      url: url,
    })
    .then(success)
    .catch(basicErrorHandling).catch(fail);
  },
  post: (url, data, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'POST',
      url: url,
      data
    })
    .then(success)
    .catch(basicErrorHandling).catch(fail);
  },
  put: (url, data, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'PUT',
      url: url,
      data
    })
    .then(success)
    .catch(basicErrorHandling).catch(fail);
  },
  delete: (url, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'DELETE',
      url: url
    })
    .then(success)
    .catch(basicErrorHandling).catch(fail);
  },
  checkForToken: () => {
    const token = localStorage.getItem("token");
    
    if (token)
      axios.defaults.headers.common['Authorization'] = `token ${token}`;  
    

    return !!token
  },
  setAuthToken: (token) => {
    axios.defaults.headers.common['Authorization'] = `token ${token}`;
    localStorage.setItem("token", token);
  },
  removeAuthToken: () => {
    localStorage.clear()
  }
};

export default axiosRequests;