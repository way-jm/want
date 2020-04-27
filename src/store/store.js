import { combineReducers } from 'redux'
import demoStore from '../pages/demo/store'
import userStore from '../pages/user/store'
import enterpriseStore from '../pages/enterprise/store'

const rootReducer = combineReducers({
  demoStore,
  enterpriseStore,
  userStore
});

export default rootReducer
