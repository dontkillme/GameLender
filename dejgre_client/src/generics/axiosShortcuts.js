import axios from "axios";
import Toast from "./toast";

function axiosFail(respError) {
  new Toast({message: respError, type: "danger"});
}

function emptySuccessCallback() {}

const axiosRequests = {
  get: (url, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'GET',
      url: url,
    })
    .then(success)
    .catch((error) => {
      if (error.response.status === 401) {
        axiosRequests.removeAuthToken();
        window.location.replace("/login");
      }
      fail(error);
    });
  },
  post: (url, data, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'POST',
      url: url,
      data
    })
    .then(success)
    .catch(fail);
  },
  put: (url, data, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'PUT',
      url: url,
      data
    })
    .then(success)
    .catch(fail);
  },
  delete: (url, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'DELETE',
      url: url
    })
    .then(success)
    .catch(fail);
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