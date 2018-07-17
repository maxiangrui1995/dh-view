import Vue from "vue";
import axios from "axios";

// 环境默认指向开发环境
const env = process.env.NODE_ENV || "development";
if (env === 'production') {
  // axios.defaults.baseURL = "../";
  axios.defaults.baseURL = "http://192.168.0.8/znyw3.0/PHP/public/index.php/index/";
} else {
  axios.defaults.baseURL = "/api/";
}

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";


const $http = (url, params) => {
  return new Promise((reslove, reject) => {
    axios({
      method: "post",
      url: url,
      data: Object.assign(params || {})
    }).then(res => {
      reslove(res.data);
    }).catch(error => {
      if (error.response) {
        let status = error.response.status;
        Vue.prototype.$notify.error({
          title: '服务器提示',
          message: `服务器连接失败！`,
        });
      }
      reject(error);
    });
  })
};

Vue.prototype.$http = $http;

export default $http;