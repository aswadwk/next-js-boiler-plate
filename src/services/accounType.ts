import { BASE_URL } from '@/constants/api';

const accountType = (() => {

  function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  async function fetchWithAuth(url: any, options: any = {}): Promise<any> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function addAccountType({ name, code, positionNormal, description }: any): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}account-types`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        code,
        position_normal: positionNormal,
        description,
      }),
    });

    const result = response.json();

    return result;
  }

  async function deleteAccountType(id: number): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}account-types/${id}`, {
      crossDomain: true,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.json();

    return result;
  }

  return {
    getAccessToken,
    addAccountType,
    deleteAccountType,
  };
})();

export default accountType;
