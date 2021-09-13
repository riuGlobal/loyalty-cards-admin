import { BlueprintToRewardsApi } from '../api/loyalty-cards/blueprintToRewards/BlueprintToRewardsApi';
import { BlueprintToRewardsDTO } from '../api/loyalty-cards/blueprintToRewards/BlueprintToRewardsDTO';
import { BlueprintsApi } from '../api/loyalty-cards/blueprints/BlueprintsApi';
import type { BlueprintDTO } from '../api/loyalty-cards/blueprints/BlueprintsDTO';
import type { CreateBlueprintDTO } from '../api/loyalty-cards/blueprints/CreateBlueprintsDTO';
import { RewardsApi } from '../api/loyalty-cards/rewards/RewardsApi';
import type { AppDispatch } from '../app/store';
import { handleErrorWithActionCreator } from '../error/ErrorHelpers';

import { BlueprintsActionTypes } from './BlueprintsActionTypes';

interface SetBlueprintsRequest {
  type: BlueprintsActionTypes.SET_BLUEPRINTS_REQUEST;
  blueprints: BlueprintDTO[];
}

interface SetBlueprintsLoading {
  type: BlueprintsActionTypes.SET_BLUEPRINTS_LOADING;
}

interface BlueprintsRequestSuccess {
  type: BlueprintsActionTypes.BLUEPRINTS_REQUEST_SUCCESS;
}

interface BlueprintsRequestFailure {
  type: BlueprintsActionTypes.BLUEPRINTS_REQUEST_FAILURE;
  errorMessage: string;
}

export type BlueprintAction =
  | SetBlueprintsRequest
  | SetBlueprintsLoading
  | BlueprintsRequestSuccess
  | BlueprintsRequestFailure;

export const setBlueprintsLoading: SetBlueprintsLoading = {
  type: BlueprintsActionTypes.SET_BLUEPRINTS_LOADING,
};

export const bluprintsRequestSuccess: BlueprintsRequestSuccess = {
  type: BlueprintsActionTypes.BLUEPRINTS_REQUEST_SUCCESS,
};

export const blueprintsRequestFailure = (errorMessage: string): BlueprintsRequestFailure => ({
  type: BlueprintsActionTypes.BLUEPRINTS_REQUEST_FAILURE,
  errorMessage,
});

export const setBlueprintsRequest = (blueprints: BlueprintDTO[]): SetBlueprintsRequest => ({
  type: BlueprintsActionTypes.SET_BLUEPRINTS_REQUEST,
  blueprints,
});

export const setBlueprintsRequested =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setBlueprintsLoading);
    await BlueprintsApi.findAll()
      .then((response) => {
        dispatch(setBlueprintsRequest(response.data));
      })
      .then(() => dispatch(bluprintsRequestSuccess))
      .catch((error) => {
        const setBlueprintsLClientErrorMessage = `Error when listing blueprints`;
        handleErrorWithActionCreator(setBlueprintsLClientErrorMessage, error, dispatch, blueprintsRequestFailure);
      });
  };

export const removeBlueprintAndReloadRequested =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setBlueprintsLoading);
    await BlueprintsApi.remove(id)
      .then(() => {
        setBlueprintsRequested()(dispatch);
      })
      .catch((error) => {
        const removeBlueprintClientErrorMessage = 'Error when removing blueprint';
        handleErrorWithActionCreator(removeBlueprintClientErrorMessage, error, dispatch, blueprintsRequestFailure);
      });
  };

export const addBlueprintAndReloadRequested =
  (createBlueprintDTO: CreateBlueprintDTO) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setBlueprintsLoading);
    await BlueprintsApi.create(createBlueprintDTO)
      .catch((error) => {
        const addBlueprintErrorMessage = 'Error adding blueprint';
        handleErrorWithActionCreator(addBlueprintErrorMessage, error, dispatch, blueprintsRequestFailure);
      })
      .then(() => setBlueprintsRequested()(dispatch));
  };

export const removeRewardFromBlueprintAndReload =
  (rewardId: number, blueprintId: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setBlueprintsLoading);
    const removeRewardToBlueprintErrorMessage = 'Error when removing reward from blueprint';

    let blueprintToRewardId: number | null = null;
    try {
      const blueprintToRewardResponse = await BlueprintToRewardsApi.findAll({
        rewardId,
        cardBlueprintId: blueprintId,
      });

      blueprintToRewardId = blueprintToRewardResponse.data[0].id;
    } catch (error) {
      handleErrorWithActionCreator(removeRewardToBlueprintErrorMessage, error, dispatch, blueprintsRequestFailure);
    }

    if (blueprintToRewardId) {
      await BlueprintToRewardsApi.removeBlueprintFromReward(blueprintToRewardId)
        .catch((error) => {
          handleErrorWithActionCreator(removeRewardToBlueprintErrorMessage, error, dispatch, blueprintsRequestFailure);
        })
        .then(() => {
          setBlueprintsRequested()(dispatch);
        });
    } else {
      handleErrorWithActionCreator(removeRewardToBlueprintErrorMessage, { messge: 'Unexpected error'}, dispatch, blueprintsRequestFailure)
    }
  };

export const addRewardToBlueprintAndReload =
  (rewardId: number, blueprintId: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const addRewardToBlueprintErrorMessage = 'Error adding reward to blueprint';
    dispatch(setBlueprintsLoading);
    await BlueprintToRewardsApi.addBlueprintToReward({ rewardId, cardBlueprintId: blueprintId })
      .catch((error) => {
        handleErrorWithActionCreator(addRewardToBlueprintErrorMessage, error, dispatch, blueprintsRequestFailure);
      })
      .then(() => {
        setBlueprintsRequested()(dispatch);
      });
  };
