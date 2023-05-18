import { BasicListRequest, BasicRequest, BasicResponse } from './Common.type'

interface Room {
    _id: string;
    cinemaId: string;
    name: string;
    seats: number;
    createBy: string;
}

/**
 * Response
 */
interface RoomListResponse extends BasicResponse {
  items: Room[]
  total_record: number
}

/**
 * Request
 */
interface RoomCreateRequest extends BasicRequest {
  _id?: string;
  cinemaId: string;
  name: string;
  seats: number;
  createBy: string;
}

interface RoomUpdateRequest extends RoomCreateRequest {
  id: string
}

interface RoomDeleteRequest extends BasicRequest {
  id: string
}

interface RoomFilterRequest extends BasicListRequest {
  name: string
}

export type {
  Room,
  RoomListResponse,
  RoomCreateRequest,
  RoomUpdateRequest,
  RoomDeleteRequest,
  RoomFilterRequest,
}
