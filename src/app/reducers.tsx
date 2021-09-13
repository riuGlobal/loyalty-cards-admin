import { combineReducers } from 'redux';

import { blueprintsStore } from '../blueprints/BlueprintsReducer';
import { rewardsStore } from '../rewards/RewardsReducer';


export const rootReducer = combineReducers({
  rewardsStore,
  blueprintsStore
})
