//@ts-ignore
import {fetchProductMasters, productMastersCount, addUpdateProductSuccess} from "../data-slices/productMasterSlice";
//@ts-ignore
import { errorNotice , successNotice} from '@/core/state/actions';
import CreateRequest from "../../../core/state/middleware/api";

export function fetchProductMasterApi(body: { limit: number | 100, page: number | 1, search: string | '' }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/product?search=${body.search ?? ''}&limit=${body.limit}&page=${body.page}`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(fetchProductMasters(response.data.productMasters));
        dispatch(productMastersCount(response.data.count));
      }
    } catch (error) {
      //dispatch(errorNotice(error));
    }
  };
}



export function createProductMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/product/create`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateProductSuccess(response.data.success));
        dispatch(fetchProductMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function uploadProductCsvApi(body: {products: [{name: string, category: string, status: string}]}) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/product/csv`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(fetchProductMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function deleteProductMasterApi(body: { ids: [] }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/product`,
        method: 'delete',
        data: body
      });
      if (response.data.success) {
        dispatch(fetchProductMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateProductMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const id = body.id;
      const response = await CreateRequest({
        url: `/product/${id}`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateProductSuccess(response.data.success));
        dispatch(fetchProductMasterApi({limit:100 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}


