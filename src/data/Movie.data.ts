import {
  type MovieCreateRequest,
  type MovieDeleteRequest,
  type MovieFilterRequest,
  type MovieListResponse,
  type MovieUpdateRequest
} from '../type/Movie.type'

import { ApiHelper } from '../util/ApiHelper'
const endPoint = "movie"

const getMovieList = async (params?: any): Promise<MovieListResponse> => {
  const url = endPoint+"?"+ new URLSearchParams(params).toString()
  return await ApiHelper.get<MovieListResponse>(url)
}

const createMovie = async (params: MovieCreateRequest) => {endPoint
  const headers = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZiMjI5ZjQ1MWNkODQ4ZjJiMzBmYzIiLCJpYXQiOjE2ODQ5NTI2NDAsImV4cCI6MTY4NTEyNTQ0MH0.Kqw7-83upOoJQWfGY6cwZMjM7wn8szQKBXRrZPyJ5-w"
  }
  return await ApiHelper.post(endPoint, params, {headers: headers})
}

const updateMovie = async (params: MovieUpdateRequest) => {
  const url = endPoint+"/"+ params.id
  return await ApiHelper.put(url, params)
}

const deleteMovie = async (params: MovieDeleteRequest) => {
  const url = endPoint+"/"+ params.id
  return await ApiHelper.delete(url)
}

export { getMovieList, createMovie, updateMovie, deleteMovie }