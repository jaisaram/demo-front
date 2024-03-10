import React from "react";
import { combineReducers } from 'redux';
//@ts-ignore
import demoUserLogin from "@/backend/state/reducer";

import {
    NOTICE_CREATE,
    REMOVE_NOTICE,
} from './actions-type/admin';

const showNotice = (state = {}, action: { type?: any; notice?: any; }) => {
    switch (action.type) {
        case  NOTICE_CREATE : {
            const { notice } = action;
            return {
                ...state,
                [ notice.noticeId ]: notice,
            };
        }
        case REMOVE_NOTICE: {
            const { notice } = action;
            return notice;
        }
        default:{
            return state;
        }
            
    }
}

const rootReducer = combineReducers({
    demoUserLogin, showNotice
});
export default rootReducer;