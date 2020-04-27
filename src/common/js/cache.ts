import xrStorage from 'xr-storage';

const TOKEN_KEY = 'TOKEN';
const USER_INFO_KEY = '__userInfo__';
const DATA_DICT = '__dataDict__';
const MENU_LIST = '__menuList__';
// token
export function setToken(token: string): string {
    xrStorage.set(TOKEN_KEY, token);
    return token;
}

export function getToken(): string {
    return xrStorage.get(TOKEN_KEY);
}

export function removeToken(): void {
    return xrStorage.remove(TOKEN_KEY);
}

// 用户信息
export function setUserInfo(userInfo: object) {
    xrStorage.set(USER_INFO_KEY, userInfo);
    return userInfo;
}

export function getUserInfo() {
    return xrStorage.get(USER_INFO_KEY);
}
export function clearUserInfo() {
    xrStorage.remove(USER_INFO_KEY);
}

// 数据字典
export function setDataDict(dataDict: object) {
    xrStorage.set(DATA_DICT, dataDict);
    return dataDict;
}

export function getDataDict() {
    return xrStorage.get(DATA_DICT)||{};
}
export function clearDataDict() {
    xrStorage.remove(DATA_DICT);
}

export function setSlideMenuList(list: []) {
    xrStorage.set(MENU_LIST, list);
    return list;
}

export function getSlideMenuList() {
    return xrStorage.get(MENU_LIST);
}
export function clearSlideMenuList() {
    xrStorage.remove(MENU_LIST);
}
