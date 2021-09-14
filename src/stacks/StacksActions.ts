import type { StackDTO } from '../api/loyalty-cards/stacks/StackDTO';
import type { AppDispatch } from '../app/store';

import { StacksActionsTypes } from './StacksActionsTypes';

interface SetStacksLoading {
  type: StacksActionsTypes.SET_STACKS_LOADING
}

export const setStacksLoading: SetStacksLoading = {
  type: StacksActionsTypes.SET_STACKS_LOADING,
};

interface StacksRequestSuccess {
  type: StacksActionsTypes.SET_STACKS_SUCCESS
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
    // dispatch(setStacksLoading);
  };

export const createStackAndReload =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    console.log('');
  };

export const removeStackAndReload =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    console.log('');
  };

export type StacksAction =
  | SetStacksLoading
  | SetStacksRequest
  | StacksRequestSuccess
  | StacksRequestFailure;
