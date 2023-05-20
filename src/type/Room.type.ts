
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
interface RoomListResponse  {
  items: Room[]
  total_record: number
}

/**
 * Request
 */
interface RoomCreateRequest  {
  _id?: string;
  cinemaId: string;
  name: string;
  seats: number;
  createBy: string;
}

interface RoomUpdateRequest extends RoomCreateRequest {
  id: string
}

interface RoomDeleteRequest  {
  id: string
}

interface RoomFilterRequest {
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
