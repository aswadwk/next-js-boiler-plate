import { BASE_URL } from '@/constants/api';
import { removeNullOrUndefinedValues } from '@/utils';
import authService from './auth';

const partnerService = (() => {

  async function getAllPartnerWithoutPaginate(): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}partners?all=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function getAllPartner(): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}partners`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function addPartner({ name, code, type, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      type, // only D,C
      description,
    });

    const response = await authService.fetchWithAuth(`${BASE_URL}partners`, {
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

  async function updatePartner({ id, name, code, type, description }: any): Promise<any> {
    const requestBody = removeNullOrUndefinedValues({
      name,
      code,
      type, // only D,C
      description,
    });

    const response = await authService.fetchWithAuth(`${BASE_URL}partners/${id}`, {
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

  async function deletePartner(id: number): Promise<any> {
    const response = await authService.fetchWithAuth(`${BASE_URL}partners/${id}`, {
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
    getAllPartnerWithoutPaginate,
    getAllPartner,
    addPartner,
    updatePartner,
    deletePartner,
  };
})();

export default partnerService;
