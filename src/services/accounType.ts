import { BASE_URL } from '@/constants/api';
import { removeNullOrUndefinedValues } from '@/utils';
import authService from './auth';

const accountTypeService = (() => {

  async function getAllAccountType(params:any): Promise<any> {
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

    const response = await authService.fetchWithAuth(`${BASE_URL}account-types?${a}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function addAccountType({ name, code, positionNormal, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      position_normal: positionNormal,
      description,
    });

    const response = await authService.fetchWithAuth(`${BASE_URL}account-types`, {
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

  async function updateAccountType({ id, name, code, positionNormal, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
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

  async function deleteAccountType(id: number): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}account-types/${id}`, {
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
    getAllAccountType,
    addAccountType,
    updateAccountType,
    deleteAccountType,
  };
})();

export default accountTypeService;
