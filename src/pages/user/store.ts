import {createAction, handleActions} from 'redux-actions';
import {getToken, getUserInfo, getDataDict} from "../../service/user";
import {setDataDict, setToken, setUserInfo} from "../../common/js/cache";

const id = 'user';
export const setUser: any = createAction(`${id}setUserInfo`);

interface userLoginType {
    username: string,
    password: string,
}

interface tokenType {
    code: number,
    message: string,
    data: { access_token?: string } | null,
}

export const login = (loginForm: userLoginType) => async dispatch => {
    let {username, password} = loginForm;
    const params = {
        username,
        password,

    };
    // 获取token
    const {code, data}: tokenType = await getToken(params);
    if (code === 0) {
        setToken(data.access_token);
        // 获取用户信息
        const userInfo = await getUserInfo(true);
        setUserInfo(userInfo.data.userInfo);
        dispatch(setUser(userInfo.data.userInfo));
        //获取数据字典&其他需要渲染前需要准备的数据（比如sideMenu）
        const [dataDict]=await Promise.all([getDataDict()]);
        setDataDict(dataDict.data);
        return true;
    }
  return false;
};

export default handleActions({
    [setUser]: (state, {payload}) => {
        return {
            ...state,
            userInfo: payload,
        };
    },
}, {
    userInfo: {},
});

