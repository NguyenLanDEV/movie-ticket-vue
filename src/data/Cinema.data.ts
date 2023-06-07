

import type { ApiResponse } from '@/type/Common.type'
import { ApiHelper } from '../util/ApiHelper'
import {emitKeys} from "../util/common"
import type { MetadataResponse } from '@/type/Metadata.type'

const endPoint = "cinema"

const getCinemaList = async (params?: any): Promise<ApiResponse<any> > => {
    const url = endPoint + "?" + new URLSearchParams(params).toString()
    return await ApiHelper.get<MetadataResponse>(url)
}

const createCinema = async(body: any): Promise<ApiResponse<any>> => {
    return await ApiHelper.execute<MetadataResponse>({body: body, endpoint: endPoint, method: "POST"})
}

const updateCinema = async(params: any): Promise<ApiResponse<any>> => {
    const url = endPoint + "/" + params._id
    return await ApiHelper.execute<MetadataResponse>({body: emitKeys(params, ['_id']), endpoint: url, method: "PUT"})
}

const deleteCinema = async(id: string): Promise<ApiResponse<any>> => {
    const url = endPoint + "/" + id
    return await ApiHelper.execute<MetadataResponse>({endpoint: url, method: "DELETE"})
}

const getById = async(id: string): Promise<ApiResponse<any>> => {
    const url = endPoint + "/" + id
    return await ApiHelper.execute<MetadataResponse>({endpoint: url, method: "GET"})
}

export { getCinemaList, updateCinema, createCinema, deleteCinema, getById }