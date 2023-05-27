interface PaginationParam {
  limit: 10 | 25 | 50 | 100 | 0
  page: number
}

interface BasicRequest {
  user: string
}

interface BasicListRequest {
  pagination: PaginationParam
}

interface BasicResponse {
  error: string
}

interface BasicTableResponse extends BasicResponse {
  name: string
}
type ModalType= 'CREATE' | 'EDIT' | 'CUSTOM' 
type Action = 'create' | 'update' | 'delete' | 'export' | 'history' | 'filter'

interface ControlDialog {
  msgId: string
  params?: Array<any>
  title: string
  back?: string
}

interface ApiResponse<K> {
  metadata:  K
  message: number
  status: number
}

export type {
  PaginationParam,
  BasicRequest,
  BasicResponse,
  BasicListRequest,
  Action,
  ModalType,
  ControlDialog,
  BasicTableResponse,
  ApiResponse
}
