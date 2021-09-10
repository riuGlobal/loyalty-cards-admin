import { combineReducers } from 'redux';

import { rewardsStore } from '../rewards/RewardsReducer';

const rootReducer = combineReducers({
  rewardsStore
})

export default rootReducer;