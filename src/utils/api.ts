const api = (() => {
  // const BASE_URL = 'https://forum-api.dicoding.dev/v1'
  const BASE_URL = 'http://127.0.0.1:8000/api/v1/'

  async function _fetchWithAuth (url: any, options: any = {}): Promise<any> {
    return await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  async function register ({ name, email, password }: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== true) {
      console.log('utils ', responseJson)
      return responseJson
    }

    const { data: { user } } = responseJson

    return user
  }

  async function login ({ email, password }: any): Promise<any> {
    const response = await fetch(`${BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    return await response.json()
  }

  function putAccessToken (accessToken: string): any {
    localStorage.setItem('accessToken', accessToken)
  }

  function getAccessToken (): string | null {
    return localStorage.getItem('accessToken')
  }

  async function getOwnProfile (): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}me`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: user } = responseJson

    return user
  }

  async function getAllAccountTypes (): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}account-types`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: accountTypes } = responseJson

    return accountTypes
  }

  async function getAllAccounts (): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}accounts`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: accountTypes } = responseJson

    return accountTypes
  }

  async function getAllDivisions (): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}divisions`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: accountTypes } = responseJson

    return accountTypes
  }

  async function addAccountType ({ name, code, positionNormal, description }: any): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}account-types`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        code,
        position_normal: positionNormal,
        description
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: accountType } = responseJson

    return accountType
  }

  async function addAccounts ({ code, name, account_type_id }: any): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}accounts`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        code,
        account_type_id
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: accountType } = responseJson

    return accountType
  }

  async function addDivision ({ code, name, description }: any): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}divisions`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        code,
        description
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: accountType } = responseJson

    return accountType
  }

  async function getAllUsers (): Promise<any> {
    const response = await fetch(`${BASE_URL}/users`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: { users } } = responseJson

    return users
  }

  async function getAllThreads (): Promise<any> {
    const response = await fetch(`${BASE_URL}/threads`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: { threads } } = responseJson

    return threads
  }

  async function createThread ({ title, category, body }: any): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        category,
        body
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: { thread } } = responseJson

    return thread
  }

  async function getThreadDetail (id: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/threads/${id}`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== true) {
      throw new Error(message)
    }

    const { data: { detailThread } } = responseJson

    return detailThread
  }

  return {
    register,
    login,
    putAccessToken,
    getAccessToken,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getThreadDetail,
    getAllAccountTypes,
    addAccountType,
    getAllAccounts,
    addAccounts,
    getAllDivisions,
    addDivision
  }
})()

export default api
