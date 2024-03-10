import axios, {HeadersDefaults} from 'axios'
import {getAuthStore} from "./utils";
import config from '../../../../config'


const CreateRequest = axios.create({
    timeout: parseInt(config.timeOut),
    baseURL: `${config.apiBaseURL}`,
})


axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT,DELETE";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";


CreateRequest.interceptors.request.use((conf:any) => {

    const token = getAuthStore()
    if (token)
        conf.headers.Authorization = `Bearer ${token}`

    if (conf.headers['form-data'])
        conf.headers['Content-Type'] = "multipart/form-data"

    const _date:any = new Date().toString()

    // used for custom header
    // conf.headers['CLIENT_TIME_ZONE'] = Intl.DateTimeFormat().resolvedOptions().timeZone
    // conf.headers['CLIENT_TIME_ZONE_OFFSET'] = _date.match(/([-\+][0-9]+)\s/)[1]
    return conf
}, (error: any) => {
    // console.log('request-error: ',error);
    Promise.reject(error).then(null)
})

CreateRequest.interceptors.response.use( (response: any) => {
    return response;
}, (error: any) => {
    if (!error.response) {
        return Promise.reject('Network Error')
    } else {
        return error.response;
    }

});


export default CreateRequest;