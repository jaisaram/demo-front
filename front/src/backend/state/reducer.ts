import { combineReducers } from 'redux';
import authReducer from './data-slices/authSlice';
import usersReducer from './data-slices/userSlice';
import companyMasterSliceReducer from './data-slices/companyMasterSlice';
import bankMasterSliceReducer from './data-slices/bankMasterSlice';
import productMasterSliceReducer from './data-slices/productMasterSlice';
import channelMasterSliceReducer from './data-slices/channelMasterSlice';
import roleReducer from './data-slices/roleSlice';
import { REQUEST_SIDEBAR_COLLAPSE } from './actions-type/common';
interface Menu {
    url: string | null;
    index: number | null;
}

const initialState : Menu = {
    url: null,
    index: null
}

const sidebarCollapse = (state = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_SIDEBAR_COLLAPSE: {
            return  action.payload;
        }
        default: {
            return state;
        }

    }
}

const demoUserLogin = combineReducers({
    auth: authReducer,
    users: usersReducer,
    companyMasters: companyMasterSliceReducer,
    bankMasters: bankMasterSliceReducer,
    productMasters: productMasterSliceReducer,
    channelMasters: channelMasterSliceReducer,
    roles: roleReducer,
    
    sidebarCollapse,

})

export default demoUserLogin;