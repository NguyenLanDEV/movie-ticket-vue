

import type { ApiResponse } from '@/type/Common.type'
import { ApiHelper } from '../util/ApiHelper'
import type { MetadataResponse } from '@/type/Metadata.type'
const endPoint = "cinema"

const getCinemaList = async (params?: any): Promise<ApiResponse<any> > => {
    const url = endPoint + "?" + new URLSearchParams(params).toString()
    return await ApiHelper.get<MetadataResponse>(url)
}


export { getCinemaList }