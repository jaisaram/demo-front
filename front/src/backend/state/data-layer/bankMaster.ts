//@ts-ignore
import {fetchBankMasters, bankMastersCount, addUpdateBankSuccess} from "../data-slices/bankMasterSlice";
//@ts-ignore
import { errorNotice , successNotice} from '@/core/state/actions';
import CreateRequest from "../../../core/state/middleware/api";

export function fetchBankMasterApi(body: { limit: number | 100, page: number | 1, search: string | '' }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/bank?search=${body.search ?? ''}&limit=${body.limit}&page=${body.page}`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(fetchBankMasters(response.data.bankMasters));
        dispatch(bankMastersCount(response.data.count));
      }
    } catch (error) {
      //dispatch(errorNotice(error));
    }
  };
}



export function createBankMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/bank/create`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateBankSuccess(response.data.success));
        dispatch(fetchBankMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function uploadBankCsvApi(body: {banks: [{name: string, category: string, status: string}]}) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/bank/csv`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(fetchBankMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function deleteBankMasterApi(body: { ids: [] }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/bank`,
        method: 'delete',
        data: body
      });
      if (response.data.success) {
        dispatch(fetchBankMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateBankMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const id = body.id;
      const response = await CreateRequest({
        url: `/bank/${id}`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateBankSuccess(response.data.success));
        dispatch(fetchBankMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}


