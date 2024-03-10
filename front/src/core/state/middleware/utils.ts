import config from '../../../../config';
export const USER_AUTH_TOKEN = config.authKey;

export const getAuthStore = () => {
    const token = localStorage.getItem(USER_AUTH_TOKEN)
    return token ? token : null
}

export const setAuthStore = (token: string) => {
    localStorage.setItem(USER_AUTH_TOKEN, token)
    return getAuthStore()
}