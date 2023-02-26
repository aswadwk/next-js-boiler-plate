import { BASE_URL } from '@/constants/api';
import { removeNullOrUndefinedValues } from '@/utils';
import authService from './auth';

const divisionService = (() => {

  async function getAllDivisionWithoutPaginate(): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}accounts?all=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function getAllDivision(params: any): Promise<any> {
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

    const response = await authService.fetchWithAuth(`${BASE_URL}divisions?${a}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function addDivision({ name, code, positionNormal, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      position_normal: positionNormal,
      description,
    });

    const response = await authService.fetchWithAuth(`${BASE_URL}divisions`, {
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

  async function updateDivision({ id, name, code, accountTypeId, positionNormal, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      account_type_id: accountTypeId,
      position_normal: positionNormal,
      description,
    });

    const response = await authService.fetchWithAuth(`${BASE_URL}divisions/${id}`, {
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

  async function deleteDivision(id: number): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}divisions/${id}`, {
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
    getAllDivisionWithoutPaginate,
    getAllDivision,
    addDivision,
    updateDivision,
    deleteDivision,
  };
})();

export default divisionService;
