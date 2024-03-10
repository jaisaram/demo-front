import {get} from "lodash-es";

export function getNoticeState(state: any) {
    let obj =  get(state, ["showNotice"]);
    if(obj) {
        return obj;
    }
    return {};
}

export function getTitle(state: any) {
    let obj =  get(state, ["devHub", "title"]);
    if(obj &&  obj.title) {
        return obj?.title;
    }
    return "";
}