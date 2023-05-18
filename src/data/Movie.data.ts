import {
  type MovieCreateRequest,
  type MovieDeleteRequest,
  type MovieFilterRequest,
  type MovieListResponse,
  type MovieUpdateRequest
} from '../type/Movie.type'

import { ApiHelper } from '../util/ApiHelper'

const getMovieList = async (params: MovieFilterRequest): Promise<MovieListResponse> => {
  return await ApiHelper.filter<MovieListResponse>('GetMovieList', params)
}

const createMovie = async (params: MovieCreateRequest) => {
  return await ApiHelper.execute('CreateMovie', params)
}

const updateMovie = async (params: MovieUpdateRequest) => {
  return await ApiHelper.execute('UpdateMovie', params)
}

const deleteMovie = async (params: MovieDeleteRequest) => {
  return await ApiHelper.execute('DeleteMovie', params)
}

export { getMovieList, createMovie, updateMovie, deleteMovie }
