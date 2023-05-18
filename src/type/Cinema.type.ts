import { BasicListRequest, BasicRequest, BasicResponse } from './Common.type'

interface Cinema {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  createBy:string;
  clusterId: string;
}

/**
 * Response
 */
interface CinemaListResponse extends BasicResponse {
  items: Cinema[]
  total_record: number
}

/**
 * Request
 */
interface CinemaCreateRequest extends BasicRequest {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  createBy:string;
  clusterId: string;
}

interface CinemaUpdateRequest extends CinemaCreateRequest {
  id: string
}

interface CinemaDeleteRequest extends BasicRequest {
  id: string
}

interface CinemaFilterRequest extends BasicListRequest {
  name: string
}

export type {
  Cinema,
  CinemaListResponse,
  CinemaCreateRequest,
  CinemaUpdateRequest,
  CinemaDeleteRequest,
  CinemaFilterRequest,
}
