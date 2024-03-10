import {fetchChannelMasters, channelMastersCount, addUpdateChannelSuccess, verifyGstStatus, verifyPanStatus, verifyBankStatus, verifyCINStatus} from "../data-slices/channelMasterSlice";
import { errorNotice , successNotice} from '../../../core/state/actions';
import CreateRequest from "../../../core/state/middleware/api";

export function fetchChannelMasterApi(body: { limit: number | 20, page: number | 1, search: string | '' }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/channel?search=${body.search ?? ''}&limit=${body.limit}&page=${body.page}`,
        method: 'get',

      });
      if (response.data.success) {
        dispatch(fetchChannelMasters(response.data.channelMasters));
        dispatch(channelMastersCount(response.data.count));
      }
    } catch (error) {
      //dispatch(errorNotice(error));
    }
  };
}



export function createChannelMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/channel/create`,
        method: 'post',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateChannelSuccess(response.data.success));
        dispatch(fetchChannelMasterApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));

      } else {
        dispatch(errorNotice(response.data.message));
      }

    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function deleteChannelMasterApi(body: { id: number }) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/bank/${body.id}`,
        method: 'delete'
      });
      if (response.data.success) {
        dispatch(fetchChannelMasterApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function updateChannelMasterApi(body: any) {
  return async (dispatch: any) => {
    try {
      const id = body.id;
      const response = await CreateRequest({
        url: `/channel/${id}`,
        method: 'put',
        data: body

      });
      if (response.data.success) {
        dispatch(addUpdateChannelSuccess(response.data.success));
        dispatch(fetchChannelMasterApi({limit:20 , page: 1, search: ''}));
        dispatch(successNotice(response.data.message));
      } else {
        dispatch(errorNotice(response.data.message));
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}

export function verifyChannelDataApi(body: any) {
  return async (dispatch: any) => {
    try {
      const response = await CreateRequest({
        url: `/channel/verify`,
        method: 'post',
        data: body

      });
      if (response.data) {
        if(body && body.type === 'gst') dispatch(verifyGstStatus(response.data));
        if(body && body.type === 'pan') dispatch(verifyPanStatus(response.data));
        if(body && body.type === 'bank') dispatch(verifyBankStatus(response.data));
        if(body && body.type === 'cin') dispatch(verifyCINStatus(response.data));
        console.log('responseresponseresponse', response.data)
      }
    } catch (error) {
      dispatch(errorNotice(error));
    }
  };
}


