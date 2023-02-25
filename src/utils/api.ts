import { BASE_URL } from '@/constants/api';

const api = (() => {

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

  async function getAllAccounts(): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}accounts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== true) {
      throw new Error(message);
    }

    const { data: accountTypes } = responseJson;

    return accountTypes;
  }

  async function getAllDivisions(): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}divisions`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== true) {
      throw new Error(message);
    }

    const { data: accountTypes } = responseJson;

    return accountTypes;
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

    const responseJson = await response.json();

    return responseJson;
  }

  async function addAccounts({ code, name, account_type_id }: any): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}accounts`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        code,
        account_type_id,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== true) {
      throw new Error(message);
    }

    const { data: accountType } = responseJson;

    return accountType;
  }

  async function addDivision({ code, name, description }: any): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}divisions`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        code,
        description,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== true) {
      throw new Error(message);
    }

    const { data: accountType } = responseJson;

    return accountType;
  }

  return {
    addAccountType,
    getAllAccounts,
    addAccounts,
    getAllDivisions,
    addDivision,
  };
})();

export default api;
