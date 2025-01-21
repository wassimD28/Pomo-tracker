import { ContentType } from "../enum/common.enum"

export interface TaskComponent {
  id: number
  taskId : number
  order : number
  content : string
  type : ContentType
}

export interface TaskCompCreatePayload {
  taskId : number
  order : number
  content : string
  type : ContentType
}