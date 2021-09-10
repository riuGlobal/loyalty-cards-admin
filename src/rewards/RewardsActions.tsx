import type { CreateRewardDTO } from '../api/loyalty-cards/rewards/CreateRewardDto';
import type { Reward } from '../api/loyalty-cards/rewards/Reward';
import { RewardsApi } from '../api/loyalty-cards/rewards/RewardsApi';
import type { AppDispatch } from '../app/store';

import { RewardActionTypes } from './RewardsActionsTypes';

const DEFAULT_ERROR_MESSAGE = 'There was an unexpected error';

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

export const rewardsRequestFailure = (errorMessage: string = DEFAULT_ERROR_MESSAGE): RewardsRequestFailureAction => ({
  type: RewardActionTypes.REWARDS_REQUEST_FAILURE,
  errorMessage,
});

export const createRewardsRequested =
  (createRewardDTO: CreateRewardDTO) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setRewardsLoading());
    RewardsApi.create(createRewardDTO).catch((error) => {
      if (error.response) {
        dispatch(
          rewardsRequestFailure(`Error when creating reward - Message from server: ${error.response?.data?.message}`)
        );
      }
    });
  };

export const createRewardAndReloadRequested =
  (createRewardDTO: CreateRewardDTO) =>
  async (dispatch: AppDispatch): Promise<void> => {
    await createRewardsRequested(createRewardDTO)(dispatch)
      .then(() => setRewardsRequested()(dispatch))
  };

export const setRewardsRequested =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setRewardsLoading());

    RewardsApi.findAll()
      .then((rewards) => dispatch(setRewardRequest(rewards.data)))
      .then(() => dispatch(rewardsRequestSuccess()))
      .catch((error) => {
        const errorMessage = `Error when listing`;
        if (error.response) {
          dispatch(rewardsRequestFailure(`${errorMessage} - Mesage from server: ${error.response?.data?.message}`));
        }
      });

    // const rewardsMock = [
    //   {
    //     name: 'Some cool gift',
    //     id: 1,
    //     amount: 1,
    //     url: 'http://my-ecommerce/products/some-cool-gift',
    //   },
    //   {
    //     nam>out(() => {
    //   dispatch(setRewardRequest(rewards));
    //   // dispatch(rewardsRequestFailure('Some api error message'))
    //   dispatch(rewardsRequestSuccess())
    // }, 2500);
  };

export const deleteRewardRequested =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setRewardsLoading());
    await RewardsApi.remove(id)
      // .then( () => dispatch(rewardsRequestSuccess()))
      .catch((error) => {
        const errorMessage = `Error when deleting`;
        console.log(error, '-----------');
        if (error.response) {
          dispatch(rewardsRequestFailure(`${errorMessage} - Message from server: ${error.response?.data?.message}`));
        }
      });
  };
