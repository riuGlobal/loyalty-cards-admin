import { combineReducers } from 'redux';

import { assignedCardsStore } from '../assigned-cards/AssignedCardsReducer';
import { blueprintsStore } from '../blueprints/BlueprintsReducer';
import { rewardsStore } from '../rewards/RewardsReducer';
import { stacksStore } from '../stacks/StacksReducer';

export const rootReducer = combineReducers({
  rewardsStore,
  blueprintsStore,
  stacksStore,
  assignedCardsStore
})
