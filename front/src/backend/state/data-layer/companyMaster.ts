//@ts-ignore
import {fetchCompanyMasters, companyMastersCount, addUpdateCompanySuccess} from "../data-slices/companyMasterSlice";
//@ts-ignore
import { errorNotice , successNotice} from '@/core/state/actions';
import CreateRequest from "../../../core/state/middleware/api";

export function fetchCompanyMasterApi(body: { limit: number | 20, page: number | 1, search: string | '' }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/company?search=${body.search ?? ''}&limit=${body.limit}&page=${body.page}`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(fetchCompanyMasters(response.data.companyMasters));
        dispatch(companyMastersCount(response.data.count));
      } else {
        //dispatch(errorNotice(response.data.message));

      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}



export function createCompanyMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/company/create`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateCompanySuccess(response.data.success));
        dispatch(fetchCompanyMasterApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function deleteCompanyMasterApi(body: { id: number }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/company/${body.id}`,
        method: 'delete'
      });
      if (response.data.success) {
        dispatch(fetchCompanyMasterApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateCompanyMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const id = body.id;
      const response = await CreateRequest({
        url: `/company/${id}`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateCompanySuccess(response.data.success));
        dispatch(fetchCompanyMasterApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}


