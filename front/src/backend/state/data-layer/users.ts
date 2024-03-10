//@ts-ignore
import {addUpdateSuccessAction, fetchUsers, usersCountReducer} from "../data-slices/userSlice";
import { loginSuccess,logoutSuccess} from "../data-slices/authSlice";

//@ts-ignore
import { errorNotice , successNotice} from '@/core/state/actions';
import CreateRequest from "../../../core/state/middleware/api";

export function fetchUsersApi(body: { limit: number | 20, page: number | 1, search: string | '' }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/users?search=${body.search ?? ''}&limit=${body.limit}&page=${body.page}`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(fetchUsers(response.data.users));
        dispatch(usersCountReducer(response.data.count));
      } else {
        //dispatch(errorNotice(response.data.message));

      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function currentUsersApi() {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/users/me`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(loginSuccess(response.data.user));
        
      } else {
        //dispatch(errorNotice(response.data.message));
        dispatch(logoutSuccess());
      }
    } catch (error) {

      //dispatch(errorNotice(error));
    }
  };
}

export function addUsersApi(body: {name: string, email: string, password: string, status: string}) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/users/register`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateSuccessAction(response.data.success));
        dispatch(fetchUsersApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function deleteUsersApi(body: { id: number }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/users/${body.id}`,
        method: 'delete'
      });
      if (response.data.success) {
        dispatch(fetchUsersApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateUsersApi(body: any) {
  return async (dispatch: any) => {
    try {
      const id = body.id;
      const response = await CreateRequest({
        url: `/users/${id}`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateSuccessAction(response.data.success));
        dispatch(fetchUsersApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateProfileApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/users/profile`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateSuccessAction(response.data.success));
        dispatch(fetchUsersApi({limit:20 , page: 1, search: ''}));
        dispatch(currentUsersApi());
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}


