import {createAction, handleActions} from 'redux-actions'
import {getUserInfo} from "../../service/demo";

const id = 'demo';
export const getDemoData: any = createAction(`${id}getDemo`);

export const test = () => async dispatch => {
    // 异步获取值
    const useInfo = await getUserInfo();
    console.log(useInfo);
    dispatch(getDemoData({demo: useInfo.code}))
};
export default handleActions({
    [getDemoData]: (state, {payload}) => {
        return {
            ...state,
            demo: payload.demo,
        };
    },
}, {
    demo: 2,
    hh:3
})

