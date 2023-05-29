import * as auth from "@/data/User.data"
const API_URL = import.meta.env.VITE_API_URL
class ApiHelper {
  static async request<K>({endpoint= "/", method="GET", body= {}, headers= {}}): Promise<K> {
    try {
      const url = `${API_URL}/${endpoint}`
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: method != "GET" ? body
          ? JSON.stringify(body)
              .replace(/\\t/g, ' ')
              .replace(/"\s+|\s+"/g, '"')
          : null : null
      })
      // Check has error
      const rs = await response.json()
    
      if (rs?.error) {
        return Promise.reject({
          ...rs
        })
      }

      return rs as K
    } catch (e) {
      return Promise.reject({
        message: e
      })
    }
  }
  
  /*Strategy pattern 
  ==================*/
  static async get<K>(endpoint: string): Promise<K>  {
    return ApiHelper.request<K>({endpoint: endpoint});
  }

  static async execute<K>({method= 'POST', endpoint= "/", body= {}, hasUser= true  }): Promise<K> {
    const userStore = auth.getUser();
    let headers = {};
    if(hasUser) {
      headers = {
        authorization: userStore.authorization
      };
    }
    return ApiHelper.request<K>({method: method, endpoint: endpoint, body: body, headers: headers});
  }
  


  /*end new function
  ==================*/

  // static async filter<K>(key: string, param: any): Promise<K> {
  //   const { pagination, ...filter } = param

  //   // Remove param update record selected
  //   if (filter?.idSelected) {
  //     delete filter?.idSelected
  //   }

  //   return await this.request<K>(key, { filter: convertEmptyToNull(filter), pagination })
  // }

  // static async execute<K>(key: string, param: any, hasUser: boolean = true): Promise<K> {
  //   if (hasUser) {
  //     const user = await getUserLogin()
  //     param.user = user.id ?? 0
  //   }

  //   return await this.request<K>(key, { param: convertEmptyToNull(param) })
  // }

  // static async getTableName<K>(type: string): Promise<K> {
  //   const user = await getUserLogin()

  //   const param = {
  //     code: user.code ?? '',
  //     type
  //   }

  //   const queryString = new URLSearchParams(param).toString()
  //   return await this.request<K>('', {}, `basic_data/table.html?${queryString}`)
  // }
}

export { ApiHelper }
