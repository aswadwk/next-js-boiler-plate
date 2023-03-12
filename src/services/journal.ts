import { BASE_URL } from '@/constants/api';
// import { removeNullOrUndefinedValues } from '@/utils';
import authService from './auth';

export interface JournalsInterface {
  journals: Journal[];
}

export interface Journal {
  id?: string;
  date: Date;
  amount: number;
  account_id: string;
  description: string;
  type: string;
  partner_id?: string;
  device_id?: string;
}

const journalService = (() => {

  async function add(journals: any): Promise<any> {

    console.log('journals', journals);
    // const requestBody = removeNullOrUndefinedValues({
    //   name,
    //   code,
    //   account_type_id: accountTypeId,
    //   position_normal: positionNormal,
    //   description,
    // });

    // console.log('requestBody', requestBody);

    const response = await authService.fetchWithAuth(`${BASE_URL}journals`, {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'journals': journals,
      }),
    });

    const result = response.json();

    return result;
  }

  async function getAll(params: any): Promise<any> {
    // delete item params when null
    if (params.start_date === null) {
      delete params.start_date;
    }

    if (params.end_date === null) {
      delete params.end_date;
    }

    const a = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

    const response = await authService.fetchWithAuth(`${BASE_URL}journals?${a}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  return {
    add,
    getAll,
  };
})();

export default journalService;