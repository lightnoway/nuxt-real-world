import request from '@/utils/request'

export const getTags = () => request("/api/tags", {
  method: "GET",
})