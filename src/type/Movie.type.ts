interface Movie {
  _id: string
  name: string
  image: string
  description: string
  casts: string[]
  directors: string[]
  producers: string[]
  age: number
  releaseTime: Date | any
}

interface MovieComponentRef<L> {
  formState: L
  validateDialog: ()=> any
  rulesRef: any
}

/**
 * Request
 */
interface MovieCreateRequest {
  name: string
  image: string
  description: string
  casts: string[]
  directors: string[]
  producers: string[]
  age: number
  releaseTime: any
}

interface MovieUpdateRequest extends MovieCreateRequest {
  _id?: string
}

interface MovieDeleteRequest {
  id: string
}

interface MovieFilterRequest {
  name: string
}

export type {
  Movie,
  MovieCreateRequest,
  MovieUpdateRequest,
  MovieDeleteRequest,
  MovieFilterRequest,
  MovieComponentRef
}
