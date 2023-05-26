
  
  import { ApiHelper } from '../util/ApiHelper'
  import type { MetadataResponse } from '@/type/Metadata.type'
  const endPoint = "metadata"
  
  const getMetadata = async (params?: any): Promise<MetadataResponse> => {
    const url = endPoint+"?"+ new URLSearchParams(params).toString()
    return await ApiHelper.get<MetadataResponse>(url)
  }
  
  
  export { getMetadata }