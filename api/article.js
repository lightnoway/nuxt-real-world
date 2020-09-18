import request from '@/utils/request'

export const getArticles = params => request("/api/articles", {
  method:"GET",
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