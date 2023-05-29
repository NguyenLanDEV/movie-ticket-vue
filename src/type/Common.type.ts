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
  metadata: K
  message: number
  status: number
}

type ErrorResponse = {
  metadata: Object,
  message: string,
  status: number,
  error: 'client-001' | 'backend-001' | 'validation-001' | 'auth-001'  | 'auth-002'  | 'auth-003' 
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
  ApiResponse,
  ErrorResponse
}
