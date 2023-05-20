interface Movie {
  _id?: string
  name: string
  image: string
  description: string
  casts: string[]
  director: string[]
  producer: string[]
  age: number
  releaseTime: Date
}

/**
 * Response
 */
interface MovieListResponse {
  items: Movie[]
  total_record: number
}

/**
 * Request
 */
interface MovieCreateRequest {
  _id?: string
  name: string
  image: string
  description: string
  casts: string[]
  director: string[]
  producer: string[]
  age: number
  releaseTime: Date
}

interface MovieUpdateRequest extends MovieCreateRequest {
  id: string
}

interface MovieDeleteRequest {
  id: string
}

interface MovieFilterRequest {
  name: string
}

export type {
  Movie,
  MovieListResponse,
  MovieCreateRequest,
  MovieUpdateRequest,
  MovieDeleteRequest,
  MovieFilterRequest
}
