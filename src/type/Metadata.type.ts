import type {ApiResponse} from "./Common.type"

interface City {
    _id: string
    name: string
    districts: Array<any>
}
export interface Metadata {
    producers: Array<any>
    casts: Array<any>
    directors: Array<any>
    cities: City[]
    clusterCinemas: {_id: string, name: string}[]
}

export interface MetadataResponse extends ApiResponse<Metadata> {}
