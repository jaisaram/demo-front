import {
    ERROR_NOTICE,
    SUCCESS_NOTICE,
    WARNING_NOTICE,
    REMOVE_NOTICE,
    LOCATION_CHANGE,
    NOTICE_CREATE, NOTICE_REMOVE
} from './actions-type/admin';
import {uniqueId} from "lodash";
import { number } from 'prop-types';
export const requestSuccessNotice = (payload: any) => {
    return {type: SUCCESS_NOTICE, payload}
}

export const requestErrorNotice = ( payload: any) => {
    return {type: ERROR_NOTICE, payload}
}


export const requestWarningNotice = ( payload: any) => {
    return {type: WARNING_NOTICE, payload}
}

export const userLocationChange = ( payload: any) => {
    return {type: LOCATION_CHANGE, payload}
}

export function createNotice( status: any, text: any ) {
    let __id = uniqueId() || 6456454;
    return {
        type: NOTICE_CREATE,
        notice: Object.assign( { }, {
            noticeId: __id,
            status,
            text,
        } ),
    };
}

export const removeNotice = (notice: any) => {
    return {type: REMOVE_NOTICE, notice};
}

export const successNotice = createNotice.bind( null, 'success' );
export const errorNotice = createNotice.bind( null, 'error' );
export const warningNotice = createNotice.bind( null, 'warning' );
export const infoNotice = createNotice.bind( null, 'info' );
