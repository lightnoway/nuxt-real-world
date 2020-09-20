import axios from 'axios';
export const request = axios.create({
  // baseURL:'https://conduit.productionready.io/'
  baseURL: 'http://realworld.api.fed.lagounews.com',
  headers: {
    // Authorization: `Token ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE0ODIzLCJ1c2VybmFtZSI6ImNvbmR1aXQwOTE2IiwiZXhwIjoxNjA1NTM4NTMxfQ.uYRfik9UCveFU3emrumYvHvWurLCg26anClzibqaaaM"}`
  }
})

export default function ({ store }) {
  request.interceptors.request.use(function (config) {
    if (store.state.user) {
      config.headers = { Authorization: `Token ${store.state.user.token}` }
    }
    return config;
  });
}