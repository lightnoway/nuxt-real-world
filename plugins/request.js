import axios from 'axios';
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/',
  // baseURL: 'http://realworld.api.fed.lagounews.com',
})

export default function ({ store }) {
  request.interceptors.request.use(function (config) {
    console.log('request', config);
    if (store.state.user) {
      config.headers = { Authorization: `Token ${store.state.user.token}` }
    }
    console.log('request end', config);
    return config;
  });
}