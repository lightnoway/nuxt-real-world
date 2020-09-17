const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    auth: null
  }
};


export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  }
}

export const actions = {
  //服务端钩子
  nuxtServerInit({ commit }, { req }) {
    //从客户端拿到 cookie.auth 存入store中, 否则 store中 auth=null
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth);
      } catch (error) {
      }
    }
    commit('setAuth', auth);
  }
}