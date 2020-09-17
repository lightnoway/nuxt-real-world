import request from '@/utils/request'

export const login = data => request("/api/users/login", {
  method: "Post",
  data
})

export const register = data => request("/api/users", {
  method: "Post",
  data
})