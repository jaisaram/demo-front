//@ts-ignore
import {fetchRoles, roleCount, rolePermissions, recievedSuccess} from "../data-slices/roleSlice";
//@ts-ignore
import { errorNotice , successNotice} from '@/core/state/actions';
import CreateRequest from "../../../core/state/middleware/api";

export function fetchRolesApi(body: { limit: number | 20, page: number | 1, search: string | '' }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/role?search=${body.search ?? ''}&limit=${body.limit}&page=${body.page}`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(fetchRoles(response.data.roles));
        dispatch(roleCount(response.data.count));
      } else {
       // dispatch(errorNotice(response.data.message));
        dispatch(fetchRoles([]));
        dispatch(roleCount(0));

      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}



export function createRoleApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/role/create`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(recievedSuccess(response.data.success));
        dispatch(fetchRolesApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function deleteRoleApi(body: { id: number }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/role/${body.id}`,
        method: 'delete'
      });
      if (response.data.success) {
        dispatch(fetchRolesApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateRoleApi(body: any) {
  return async (dispatch: any) => {
    try {
      const id = body.id;
      const response = await CreateRequest({
        url: `/role/${id}`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(recievedSuccess(response.data.success));
        dispatch(fetchRolesApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function rolePermissionsApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/role/permissions`,
        method: 'get'
      });
      if (response.data.success) {
        dispatch(rolePermissions(response.data.data));
      }
    } catch (error) {
      //dispatch(errorNotice(error));
    }
  };
}


