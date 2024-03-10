 const config = {
    apiBaseURL: process.env.REACT_APP_API_BASE_URL || "",
    timeOut: process.env.REACT_APP_API_TMEOUT || "60000",
    authKey:  process.env.REACT_APP_COOKIES_AUTH_KEY || "_front_"
}
export default config