const API_URL = import.meta.env.VITE_API_URL

class ApiHelper {
  static async request<K>(key: string, params?: any, url?: string): Promise<K> {
    try {
      const response = await fetch(`${API_URL}${url ?? `?type=${key}`}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: params
          ? JSON.stringify(params)
              .replace(/\\t/g, ' ')
              .replace(/"\s+|\s+"/g, '"')
          : null
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

  static async filter<K>(key: string, param: any): Promise<K> {
    const { pagination, ...filter } = param

    // Remove param update record selected
    if (filter?.idSelected) {
      delete filter?.idSelected
    }

    return await this.request<K>(key, { filter: convertEmptyToNull(filter), pagination })
  }

  static async execute<K>(key: string, param: any, hasUser: boolean = true): Promise<K> {
    if (hasUser) {
      const user = await getUserLogin()
      param.user = user.id ?? 0
    }

    return await this.request<K>(key, { param: convertEmptyToNull(param) })
  }

  static async getTableName<K>(type: string): Promise<K> {
    const user = await getUserLogin()

    const param = {
      code: user.code ?? '',
      type
    }

    const queryString = new URLSearchParams(param).toString()
    return await this.request<K>('', {}, `basic_data/table.html?${queryString}`)
  }
}

export { ApiHelper }
