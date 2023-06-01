import {
  type MovieCreateRequest,
  type MovieDeleteRequest,
  type MovieUpdateRequest,
  type Movie,
} from '../type/Movie.type'

import {
  type ApiResponse,
} from "@/type/Common.type"

import { ApiHelper } from '../util/ApiHelper'
import {emitKeys} from "../util/common"
const endPoint = "movie"

const getMovieList = async (params?: any): Promise<ApiResponse<Movie[]>> => {
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

const updateMovie = async (params: MovieUpdateRequest): Promise<ApiResponse<Movie>> => {
  const url = endPoint+"/"+ params._id
  params = emitKeys<MovieUpdateRequest>(params,['_id'])
  return await ApiHelper.execute({body: params, endpoint: url, method: "PUT"})
}

const deleteMovie = async (params: MovieDeleteRequest) => {
  const url = endPoint+"/"+ params.id
  // return await ApiHelper.execute(url)
}

export { getMovieList, createMovie, updateMovie, deleteMovie, getMovie }