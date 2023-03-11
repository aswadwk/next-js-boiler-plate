import { BASE_URL } from '@/constants/api';
import { removeNullOrUndefinedValues } from '@/utils';
import authService from './auth';

const accountService = (() => {

  async function getAllAccountWithoutPaginate(): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}accounts?all=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function getAllAccount(params: any): Promise<any> {
    // delete item params when null
    if (params.per_page === null) {
      delete params.per_page;
    }

    if (params.page === null) {
      delete params.page;
    }

    if (params.name === null) {
      delete params.name;
    }

    const a = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

    const response = await authService.fetchWithAuth(`${BASE_URL}accounts?${a}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function addAccount({ name, code, accountTypeId, positionNormal, description }: any): Promise<any> {
    console.log('addAccount', name, code, accountTypeId, positionNormal, description);
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      account_type_id: accountTypeId,
      position_normal: positionNormal,
      description,
    });

    console.log('requestBody', requestBody);

    const response = await authService.fetchWithAuth(`${BASE_URL}accounts`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = response.json();

    return result;
  }

  async function updateAccount({ id, name, code, accountTypeId, positionNormal, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      account_type_id: accountTypeId,
      position_normal: positionNormal,
      description,
    });

    const response = await authService.fetchWithAuth(`${BASE_URL}accounts/${id}`, {
      crossDomain: true,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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
    getAllAccountWithoutPaginate,
    getAllAccount,
    addAccount,
    updateAccount,
    deleteAccount,
  };
})();

export default accountService;
