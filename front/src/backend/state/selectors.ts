import {get} from "lodash";

export function getNoticeState(state: any) {
    let obj =  get(state, ["showNotice"]);
    if(obj) {
        return obj;
    }
    return {};
}


export function getUser(state: any) {
    let obj =  get(state, ["demoUserLogin", "auth", "user"]);
    if(obj) {
        return obj;
    }
    return {};
}

export function getCurrentUserRole(state: any) {
    let obj =  get(state, ["demoUserLogin", "auth", "user", "role", "permissions"]);
    if(obj) {
        const roles:any = [];
        obj.forEach((p:any)=>{
            if(p && p.name) {
                const perm: any = [];
                p.items.forEach((item:any)=>{
                    if(item && item.name && item.checked) {
                        perm.push(item.name);  
                    }
                });
                roles.push({[p.name]: perm})
            }
        })
        return roles;
    }
    return [];
}

export function isAuthenticated(state: any) {
    let isAuth =  get(state, ["demoUserLogin", "auth", "isAuth"]);
    if(isAuth) {
        return isAuth;
    }
    return false;
}

export function fetchUsers(state: any) {
    let users =  get(state, ["demoUserLogin", "users"]);
    if(users && users.users && users.users.length) {
        return users.users;
    }
    return [];
}

export function usersCount(state: any) {
    let usersCount =  get(state, ["demoUserLogin", "users" , "usersCount"]);
    if(usersCount) {
        return usersCount;
    }
    return null;
}

export function addUpdateSuccess(state: any) {
    let addUpdateSuccess =  get(state, ["demoUserLogin", "users" , "addUpdateSuccess"]);
    if(addUpdateSuccess) {
        return addUpdateSuccess;
    }
    return false;
}

export function fetchCompanyMasters(state: any) {
    let companyMasters =  get(state, ["demoUserLogin", "companyMasters"]);
    if(companyMasters && companyMasters.companyMasters && companyMasters.companyMasters.length) {
        return companyMasters.companyMasters;
    }
    return [];
}

export function companyMastersCount(state: any) {
    let companyMastersCount =  get(state, ["demoUserLogin", "companyMasters" , "companyMastersCount"]);
    if(companyMastersCount) {
        return companyMastersCount;
    }
    return null;
}

export function addUpdateCompanySuccessSelector(state: any) {
    let addUpdateCompanySuccess =  get(state, ["demoUserLogin", "companyMasters" , "addUpdateCompanySuccess"]);
    if(addUpdateCompanySuccess) {
        return addUpdateCompanySuccess;
    }
    return false;
}

export function fetchBankMasters(state: any) {
    let bankMasters =  get(state, ["demoUserLogin", "bankMasters"]);
    if(bankMasters && bankMasters.bankMasters && bankMasters.bankMasters.length) {
        return bankMasters.bankMasters;
    }
    return [];
}

export function bankMastersCount(state: any) {
    let bankMastersCount =  get(state, ["demoUserLogin", "bankMasters" , "bankMastersCount"]);
    if(bankMastersCount) {
        return bankMastersCount;
    }
    return null;
}

export function addUpdateBankSuccessSelector(state: any) {
    let addUpdateBankSuccess =  get(state, ["demoUserLogin", "bankMasters" , "addUpdateBankSuccess"]);
    if(addUpdateBankSuccess) {
        return addUpdateBankSuccess;
    }
    return false;
}


export function fetchProductMasters(state: any) {
    let productMasters =  get(state, ["demoUserLogin", "productMasters"]);
    if(productMasters && productMasters.productMasters && productMasters.productMasters.length) {
        return productMasters.productMasters;
    }
    return [];
}

export function productMastersCount(state: any) {
    let count =  get(state, ["demoUserLogin", "productMasters" , "counts"]);
    if(count) {
        return count;
    }
    return null;
}

export function addUpdateProductSuccessSelector(state: any) {
    let addUpdateProductSuccess =  get(state, ["demoUserLogin", "productMasters" , "addUpdateProductSuccess"]);
    if(addUpdateProductSuccess) {
        return addUpdateProductSuccess;
    }
    return false;
}






export function fetchChannelMasters(state: any) {
    let channelMasters =  get(state, ["demoUserLogin", "channelMasters"]);
    if(channelMasters && channelMasters.channelMasters && channelMasters.channelMasters.length) {
        return channelMasters.channelMasters;
    }
    return [];
}

export function channelMastersCount(state: any) {
    let channelMastersCount =  get(state, ["demoUserLogin", "channelMasters" , "channelMastersCount"]);
    if(channelMastersCount) {
        return channelMastersCount;
    }
    return null;
}

export function addUpdateChannelSuccessSelector(state: any) {
    let addUpdateChannelSuccess =  get(state, ["demoUserLogin", "channelMasters" , "addUpdateChannelSuccess"]);
    if(addUpdateChannelSuccess) {
        return addUpdateChannelSuccess;
    }
    return false;
}

export function verifyGstDataSelector(state: any) {
    let verifyGstStatus =  get(state, ["demoUserLogin", "channelMasters" , "verifyGstStatus"]);
    if(verifyGstStatus) {
        return verifyGstStatus;
    }
    return false;
}

export function verifyPanDataSelector(state: any) {
    let verifyPanStatus =  get(state, ["demoUserLogin", "channelMasters" , "verifyPanStatus"]);
    if(verifyPanStatus) {
        return verifyPanStatus;
    }
    return false;
}

export function verifyBankDataSelector(state: any) {
    let verifyBankStatus =  get(state, ["demoUserLogin", "channelMasters" , "verifyBankStatus"]);
    if(verifyBankStatus) {
        return verifyBankStatus;
    }
    return false;
}

export function verifyCINDataSelector(state: any) {
    let verifyCINStatus =  get(state, ["demoUserLogin", "channelMasters" , "verifyCINStatus"]);
    if(verifyCINStatus) {
        return verifyCINStatus;
    }
    return false;
}


export function fetchRolesSelector(state: any) {
    let roles =  get(state, ["demoUserLogin", "roles"]);
    if(roles && roles.roles && roles.roles.length) {
        return roles.roles;
    }
    return [];
}

export function roleCountSelector(state: any) {
    let counts =  get(state, ["demoUserLogin", "roles" , "count"]);
    if(counts) {
        return counts;
    }
    return null;
}
//rolePermissions

export function rolePermissions(state: any) {
    let permissions =  get(state, ["demoUserLogin", "roles" , "permissions"]);
    if(permissions.permissions && Object.keys(permissions.permissions).length > 0 && permissions.permissions) {
        return permissions.permissions;
    }
    return {};
}

export function addRoleSuccess(state: any) {
    
    let success =  get(state, ["demoUserLogin", "roles" , "success"]);
    if(success) {
        return success;
    }
    return false;
}

export function sidebarCollapseSelector(state: any) {
    let data =  get(state, ["demoUserLogin", "sidebarCollapse"]);
    if(data) {
        return data;
    }
    return null;
}