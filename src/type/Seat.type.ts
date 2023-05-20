
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
interface SeatListResponse  {
  items: Seat[]
  total_record: number
}

/**
 * Request
 */
interface SeatCreateRequest  {
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

interface SeatDeleteRequest{
  id: string
}

interface SeatFilterRequest  {
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
