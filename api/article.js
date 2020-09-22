import { request } from '@/plugins/request'

export const getArticles = params => request("/api/articles", {
  method: "GET",
  params
  //Filter by tag:

  // ?tag=AngularJS

  // Filter by author:

  // ?author=jake

  // Favorited by user:

  // ?favorited=jake

  // Limit number of articles (default is 20):

  // ?limit=20

  // Offset/skip number of articles (default is 0):

  // ?offset=0
})

//要求登录状态
export const getFeedArticles = params => request("/api/articles/feed", {
  method: "GET",
  params,
  //Filter by tag:

  // ?tag=AngularJS

  // Filter by author:

  // ?author=jake

  // Favorited by user:

  // ?favorited=jake

  // Limit number of articles (default is 20):

  // ?limit=20

  // Offset/skip number of articles (default is 0):

  // ?offset=0
})

export const addFavorite = slug => request(`/api/articles/${slug}/favorite`, {
  method: "POST",
})
export const removeFavorite = slug => request(`/api/articles/${slug}/favorite`, {
  method: "DELETE",
})