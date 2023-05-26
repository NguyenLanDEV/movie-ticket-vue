import * as _ from "lodash"
 export function convertEmptyToNull(filter: any){
     // eslint-disable-next-line no-undef
     
    for(const [key, value] of Object.entries(filter)) {
          if(!value || (Array.isArray(value) && value.length == 0)) {
               delete filter[key]
          }else if(Array.isArray(value)){
               filter[key] = _.compact(value)
          }else if(typeof value == 'object'){
               filter[key] = convertEmptyToNull(value)
          }
     }
     
     return filter
}
