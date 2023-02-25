import { BASE_URL } from '@/constants/api';

const authService = (() => {

  function putAccessToken(accessToken: string): any {
    localStorage.setItem('accessToken', accessToken);
  }

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
      mode: 'cors',
      credentials: 'include',
    });
  }

  async function register({ name, email, password }: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== true) {
      console.log('utils ', responseJson);
      return responseJson;
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function login({ email, password }: any): Promise<any> {
    const response = await fetch(`${BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return response.json();
  }

  async function getOwnProfile(): Promise<any> {
    const response = await fetchWithAuth(`${BASE_URL}me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== true) {
      throw new Error(message);
    }

    const { data: user } = responseJson;

    return user;
  }

  return {
    getAccessToken,
    putAccessToken,
    fetchWithAuth,
    getOwnProfile,
    register,
    login,
  };
})();

export default authService;
