import {
  type MovieCreateRequest,
  type MovieDeleteRequest,
  type MovieFilterRequest,
  type MovieListResponse,
  type MovieUpdateRequest,
  type Movie,
} from '../type/Movie.type'

import {
  type ApiResponse,
} from "@/type/Common.type"

import { ApiHelper } from '../util/ApiHelper'
const endPoint = "movie"

const getMovieList = async (params?: any): Promise<MovieListResponse> => {
  const url = endPoint+"?"+ new URLSearchParams(params).toString()
  return await ApiHelper.get<ApiResponse<Movie[]>>(url)
}

const getMovie = async (id?: string | number): Promise<ApiResponse<Movie>> => {
  const url = endPoint+`/${id}`
  return await ApiHelper.get<ApiResponse<Movie>>(url)
}

const createMovie = async (params: MovieCreateRequest): Promise<ApiResponse<any>> => {endPoint
  return await ApiHelper.execute({body: params, endpoint: endPoint})
}

const updateMovie = async (params: MovieUpdateRequest) => {
  const url = endPoint+"/"+ params.id
  // return await ApiHelper.execute(url, params)
}

const deleteMovie = async (params: MovieDeleteRequest) => {
  const url = endPoint+"/"+ params.id
  // return await ApiHelper.execute(url)
}

export { getMovieList, createMovie, updateMovie, deleteMovie, getMovie }