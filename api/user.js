import {request} from '@/plugins/request'

export const login = data => request("/api/users/login", {
  method: "Post",
  data
})

export const register = data => request("/api/users", {
  method: "Post",
  data
})

/* 
"user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
*/
export const updateUser= data=>request("/api/user", {
  method: "PUT",
  data
})