import { BASE_URL } from "@/constants/api"

const accountType = (() => {
  // const BASE_URL = 'https://forum-api.dicoding.dev/v1'
//   const BASE_URL = 'http://127.0.0.1:8000/api/v1/'

  async function _fetchWithAuth(url: any, options: any = {}): Promise<any> {
    return await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  function getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  async function addAccountType({ name, code, positionNormal, description }: any): Promise<any> {
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

    return await response.json()
  }

  async function deleteAccountType(id: number): Promise<any> {
    const response = await _fetchWithAuth(`${BASE_URL}account-types/${id}`, {
      crossDomain: true,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return await response.json()
  }


  return {
    getAccessToken,
    addAccountType,
    deleteAccountType,
  }
})()

export default accountType;
