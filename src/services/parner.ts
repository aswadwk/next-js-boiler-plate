import { BASE_URL } from '@/constants/api';
import authService from './auth';

const partner = (() => {

  async function getAllAccounts(): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}accounts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function addAccount({ name, code, positionNormal, description }: any): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}accounts`, {
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

  async function deleteAccount(id: number): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}accounts/${id}`, {
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
    getAllAccounts,
    addAccount,
    deleteAccount,
  };
})();

export default partner;
