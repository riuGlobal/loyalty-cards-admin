import type { CreateRewardDTO } from '../api/loyalty-cards/rewards/CreateRewardDto';
import type { Reward } from '../api/loyalty-cards/rewards/Reward';
import type { AppDispatch } from '../app/store';

import { RewardActionTypes } from './RewardsActionsTypes';

interface SetRewardsLoading {
  type: RewardActionTypes.SET_REWARDS_LOADING;
}

interface SetRewardsRequestAction {
  type: RewardActionTypes.SET_REWARDS_REQUEST;
  rewards: Reward[];
}

interface RewardsRequestSuccessAction {
  type: RewardActionTypes.REWARDS_REQUEST_SUCCESS;
}

interface RewardsRequestFailureAction {
  type: RewardActionTypes.REWARDS_REQUEST_FAILURE;
  errorMessage: string;
}

export type RewardsAction =
  | SetRewardsRequestAction
  | RewardsRequestSuccessAction
  | RewardsRequestFailureAction
  | SetRewardsLoading;

export const setRewardsLoading = (): SetRewardsLoading => ({
  type: RewardActionTypes.SET_REWARDS_LOADING,
});

export const setRewardRequest = (rewards: Reward[]): SetRewardsRequestAction => ({
  type: RewardActionTypes.SET_REWARDS_REQUEST,
  rewards,
});

export const rewardsRequestSuccess = (): RewardsRequestSuccessAction => ({
  type: RewardActionTypes.REWARDS_REQUEST_SUCCESS,
});

export const rewardsRequestFailure = (errorMessage: string): RewardsRequestFailureAction => ({
  type: RewardActionTypes.REWARDS_REQUEST_FAILURE,
  errorMessage,
});

export const setRewardsRequested =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setRewardsLoading());
    const rewardsMock = [
      {
        name: 'Some cool gift',
        id: 1,
        amount: 1,
        url: 'http://my-ecommerce/products/some-cool-gift',
      },
      {
        name: 'Some cool gift',
        id: 2,
        amount: 1,
        url: 'http://my-ecommerce/products/some-cool-gift',
      },
    ];

    setTimeout(() => {
      dispatch(setRewardRequest(rewardsMock));
      // dispatch(rewardsRequestFailure('Some api error message'))
      dispatch(rewardsRequestSuccess())
    }, 2500);
  };

export const deleteRewardRequested =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    console.log(`Delete reward with id ${id} and reload`);
  };

// export const setRewardsRequest

// export const createReward = async (reward: CreateRewardDTO) =>
//   async (dispatch: AppDispatch): Promise<void> => {
//     console.log('=== createRewardAndReload')

//     // dispatch(createRewardActionCreator(params));
// }

// export const setRewards = () => async (dispatch: AppDispatch):Promise<void> => {
//     const rewards =
//     // GET rewards from API
//     console.log(`Set rewards ===`)
//     //dispathc
// }

// export const deleteRewardAndReload = async (id: number, reload: () => Promise<void>) => async (dispatch: AppDispatch):Promise<void> => {
//   console.log(`Delete from API ${id}`);
//   // Reload rewards
// }

export const requestFailure = {};
export const requestSuccess = {};
