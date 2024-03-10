import { REQUEST_SIDEBAR_COLLAPSE, RECEIVED_SIDEBAR_COLLAPSE } from './actions-type/common';

export const requestSidebarCollapse = ( payload: any) => {
    return {type: REQUEST_SIDEBAR_COLLAPSE, payload}
}
