
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
interface UserListResponse  {
  items: User[]
  total_record: number
}

/**
 * Request
 */
interface UserCreateRequest  {
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

interface UserDeleteRequest  {
  id: string
}

interface UserFilterRequest  {
  name: string
}

interface UserLocalStore {
  authorization: String,
}

export type {
  User,
  UserListResponse,
  UserCreateRequest,
  UserUpdateRequest,
  UserDeleteRequest,
  UserFilterRequest,
  UserLocalStore
}
