import type {ApiResponse} from "./Common.type"

export interface Metadata {
    producers: Array<any>
    casts: Array<any>
    directors: Array<any>
}

export interface MetadataResponse extends ApiResponse<Metadata> {}
