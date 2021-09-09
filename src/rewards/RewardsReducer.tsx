import type { Reward } from '../api/loyalty-cards/rewards/Reward';

import type { RewardsAction } from './RewardsActions';
import { RewardActionTypes } from './RewardsActionsTypes';

export interface RewardsState {
  rewards: Reward[];
  isLoading: boolean;
  error: {
    message: null | string;
  }
}

const initialState: RewardsState = {
  rewards: [],
  isLoading: true,
  error: {
    message: '222'
  }
};

export const rewardsStore = (state: RewardsState = initialState, action: RewardsAction): RewardsState => {
  switch (action.type) {
    case RewardActionTypes.SET_REWARDS_REQUEST:
      return {
        ...state,
        rewards: action.rewards,
      };
    case RewardActionTypes.SET_REWARDS_LOADING:
      return { ...state, isLoading: true };
    case RewardActionTypes.REWARDS_REQUEST_SUCCESS:
      return { ...state, isLoading: false };
    case RewardActionTypes.REWARDS_REQUEST_FAILURE:
      return { ...state, isLoading: false, error: { message: action.errorMessage } };
    default:
      return state;
  }
};
