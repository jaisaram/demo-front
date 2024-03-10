//@ts-ignore
import CreateRequest from "@/core/state/middleware/api";
//@ts-ignore
import {setAuthStore} from "@/core/state/middleware/utils";
import { Dispatch } from "../../../core/state/store";
//@ts-ignore
import {errorNotice } from '@/core/state/actions';
import { loginSuccess, logoutSuccess } from '../data-slices/authSlice';
import { currentUsersApi, fetchUsersApi } from "./users";
interface LoginBody {
    email: string,
    password: string
}

export const loginRequest = (body: LoginBody) => {
    return async (dispatch: any) => {
        try {
            const response = await CreateRequest({
                url: "/auth/login",
                method: 'post',
                data: body
            });
            const {data} = response;
            if (data.success) {
                dispatch(currentUsersApi());
                setAuthStore(data?.data?.token);
            } else {
                dispatch(errorNotice( data.message ));
            }

        } catch (error) {
            dispatch(errorNotice( 'Login: Somthing went wrong.'));
        }
    };
}

export function logoutUser(body: { userId: number }) {
    return async (dispatch: any) => {
        try {
            const response = await CreateRequest({
                url: "/auth/logout",
                method: 'post',
                data: body
            });
            const {data} = response;
            if (data.success) {
                dispatch(currentUsersApi());
            } else {
                dispatch(errorNotice(data?.message));
            }
        } catch (error) {
            dispatch(errorNotice('LogOut: Somthing went wrong.'));
        }
    };
}








