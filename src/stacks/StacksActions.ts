import { AssignedCardsApi } from '../api/loyalty-cards/assigned-cards/AssignedCardsApi';
import type { CreateStackDTO } from '../api/loyalty-cards/stacks/CreateStackDTO';
import type { StackDTO } from '../api/loyalty-cards/stacks/StackDTO';
import { StacksApi } from '../api/loyalty-cards/stacks/StacksApi';
import type { AppDispatch } from '../app/store';
import { handleErrorWithActionCreator } from '../error/ErrorHelpers';

import { StacksActionsTypes } from './StacksActionsTypes';

interface SetStacksLoading {
  type: StacksActionsTypes.SET_STACKS_LOADING;
}

export const setStacksLoading: SetStacksLoading = {
  type: StacksActionsTypes.SET_STACKS_LOADING,
};

interface StacksRequestSuccess {
  type: StacksActionsTypes.SET_STACKS_SUCCESS;
}

export const stacksRequestSuccess: StacksRequestSuccess = {
  type: StacksActionsTypes.SET_STACKS_SUCCESS,
};
interface StacksRequestFailure {
  type: StacksActionsTypes.SET_STACKS_FAILURE;
  errorMessage: string;
}
/*  */
export const stacksRequestFailure = (errorMessage: string): StacksRequestFailure => ({
  type: StacksActionsTypes.SET_STACKS_FAILURE,
  errorMessage,
});

interface SetStacksRequest {
  type: StacksActionsTypes.SET_STACKS_REQUEST;
  stacks: StackDTO[];
}

export const setStacksRequest = (stacks: StackDTO[]): SetStacksRequest => ({
  type: StacksActionsTypes.SET_STACKS_REQUEST,
  stacks,
});

export const setStacksRequested =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const setStacksRequestedErrorMessage = 'Error when loading stacks';
    dispatch(setStacksLoading);
    await StacksApi.findAll()
      .then((stacksResponse) => {
        dispatch(setStacksRequest(stacksResponse.data));
        dispatch(stacksRequestSuccess);
      })
      .catch((error) =>
        handleErrorWithActionCreator(setStacksRequestedErrorMessage, error, dispatch, stacksRequestFailure)
      );
  };

export const createStackAndReload =
  (createStackDTO: CreateStackDTO) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const createStackAndReloadErrorMessage = 'Error when creating stack';
    dispatch(setStacksLoading);
    await StacksApi.create(createStackDTO)
      .then(() => {
        setStacksRequested()(dispatch);
      })
      .catch((error) =>
        handleErrorWithActionCreator(createStackAndReloadErrorMessage, error, dispatch, stacksRequestFailure)
      );
  };

export const removeStackAndReload =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const removeStackAndReload = 'Error when removing stack';
    dispatch(setStacksLoading);
    await StacksApi.remove(id)
      .then(() => {
        setStacksRequested()(dispatch);
      })
      .catch((error) => handleErrorWithActionCreator(removeStackAndReload, error, dispatch, stacksRequestFailure));
  };

interface AssignCardToUserSuccess {
  type: StacksActionsTypes.ASSIGN_CARD_TO_USER_SUCCESS;
  userId: string;
}

const assignCardToUserSuccess = (userId: string): AssignCardToUserSuccess => ({
  type: StacksActionsTypes.ASSIGN_CARD_TO_USER_SUCCESS,
  userId,
});

export const assignCardToUserRequest =
  (stackId: number, userId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const assignCardErrorMessage = 'Error when assigning card';
    dispatch(setStacksLoading);
    await AssignedCardsApi.create({ cardStackId: stackId, userId })
      .then(() => {
        return setStacksRequested()(dispatch);
      })
      .then(() => dispatch(assignCardToUserSuccess(userId)))
      .catch((error) => handleErrorWithActionCreator(assignCardErrorMessage, error, dispatch, stacksRequestFailure));
  };

export type StacksAction =
  | SetStacksLoading
  | SetStacksRequest
  | StacksRequestSuccess
  | StacksRequestFailure
  | AssignCardToUserSuccess;
