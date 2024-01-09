import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {'Content-type': 'application/json'}
})

 //헤더에는 보통 데이터의 타입을 써준다. 
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("request start", config)
    return config;
  }, function (error) {
    console.log("request",error)
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // 모든api호출할때마다 가로채서 콘솔닷로그해주세요. 어떤데이터가 오고가는디 확인하기 위해 
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response)
    return response;
  }, function (error) {
    console.log("response error", error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default api;