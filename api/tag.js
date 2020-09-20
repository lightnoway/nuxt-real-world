import {request} from '@/plugins/request'

export const getTags = () => request("/api/tags", {
  method: "GET",
})