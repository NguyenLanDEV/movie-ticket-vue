
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
interface CinemaListResponse  {
  items: Cinema[]
  total_record: number
}

/**
 * Request
 */
interface CinemaCreateRequest {
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

interface CinemaDeleteRequest {
  id: string
}

interface CinemaFilterRequest  {
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
