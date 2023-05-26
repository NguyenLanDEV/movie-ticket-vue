const API_URL = import.meta.env.VITE_API_URL

class ApiHelper {
  static async request<K>({endPoint= "/", method="GET", body= {}, headers= {}}): Promise<K> {
    try {
      const url = `${API_URL}/${endPoint}`
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
          msgId: rs?.error
        })
      }

      return rs as K
    } catch (e) {
      return Promise.reject({
        msgId: e
      })
    }
  }
  
  /*Strategy pattern 
  ==================*/
  static async get<K>(endpoint: string): Promise<K>  {
    return ApiHelper.request<K>({endPoint: endpoint});
  }

  static async post<K>(endpoint: string,
                        body: any,{
                        headers={},
                      }): Promise<K>  {
    return ApiHelper.request<K>({method:'POST', endPoint: endpoint, body: body, headers: headers});
  }

  static async put<K>(endpoint: string, body: any): Promise<K>  {
    return ApiHelper.request<K>({method:'PUT',endPoint: endpoint,body: body});
  }

  static async patch<K>(endpoint: string, body: any): Promise<K>  {
    return ApiHelper.request<K>({method:'PATCH',endPoint: endpoint,body: body});
  }

  static async delete<K>(endpoint: any): Promise<K>  {
    return ApiHelper.request<K>({method: 'DELETE',endPoint: endpoint});
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
