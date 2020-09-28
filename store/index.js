const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
};


export const mutations = {
  setUser(state, data) {
    state.user = data;
  }
}

const Cookie = process.client ? require("js-cookie") : undefined;
export const actions = {
  //服务端钩子
  nuxtServerInit({ commit }, { req }) {
    //从客户端拿到 cookie.user 存入store中, 否则 store中 user=null
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user);
      } catch (error) {
      }
    }
    commit('setUser', user);
  },
  clientSetUser({ commit }, user) {
    Cookie.set("user", user);
    commit("setUser", user);
  }
}