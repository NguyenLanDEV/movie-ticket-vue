import { BasicListRequest, BasicRequest, BasicResponse } from './Common.type'

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    status: string;
    roles: String[];
}

/**
 * Response
 */
interface UserListResponse extends BasicResponse {
  items: User[]
  total_record: number
}

/**
 * Request
 */
interface UserCreateRequest extends BasicRequest {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: string;
  roles: String[];
}

interface UserUpdateRequest extends UserCreateRequest {
  id: string
}

interface UserDeleteRequest extends BasicRequest {
  id: string
}

interface UserFilterRequest extends BasicListRequest {
  name: string
}

export type {
  User,
  UserListResponse,
  UserCreateRequest,
  UserUpdateRequest,
  UserDeleteRequest,
  UserFilterRequest,
}
