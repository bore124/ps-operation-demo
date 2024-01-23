export const getToken = () => {
    return window.sessionStorage.getItem("seakong-token")
}
export const setToken = (data) => {
    return window.sessionStorage.setItem("seakong-token", data)
}
export const clearToken = () => {
    window.localStorage.removeItem("seakong-token")
    return window.sessionStorage.removeItem("seakong-token")
}
export const setLongToken = (data) => {
    return window.localStorage.setItem("seakong-token",data)
}

export const useLongTokenSet = () => {
    let longToken = window.localStorage.getItem("seakong-token")
    if (longToken){
        setToken(longToken)
        return true
    }else {
        return false
    }
}

export const getCookie = () => {
    return useNameGetCookie("JSESSIONID")
}
export const clearCookie = (name) => {
    return document.cookie = name + '=; Max-Age=-99999999;';
}

//
export const useNameGetCookie = (cookieName)=>{
    const strCookie = document.cookie
    const cookieList = strCookie.split(';')

    for(let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split('=')
        if (cookieName === arr[0].trim()) {
            return arr[1]
        }
    }

    return ''
}

