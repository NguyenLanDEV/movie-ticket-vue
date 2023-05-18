import { BasicListRequest, BasicRequest, BasicResponse } from './Common.type'

type TypeSeats = "standard" | "couple" | "bed" | "sweet_box"

interface Seat {
    _id: string;
    roomId: string;
    type: TypeSeats;
    row: Number;
    seatNumber: string;
    isAvailable: string;
}

/**
 * Response
 */
interface SeatListResponse extends BasicResponse {
  items: Seat[]
  total_record: number
}

/**
 * Request
 */
interface SeatCreateRequest extends BasicRequest {
  _id?: string;
  roomId: string;
  type: TypeSeats;
  row: Number;
  seatNumber: string;
  isAvailable: string;
}

interface SeatUpdateRequest extends SeatCreateRequest {
  id: string
}

interface SeatDeleteRequest extends BasicRequest {
  id: string
}

interface SeatFilterRequest extends BasicListRequest {
  name: string
}

export type {
  Seat,
  SeatListResponse,
  SeatCreateRequest,
  SeatUpdateRequest,
  SeatDeleteRequest,
  SeatFilterRequest,
}
