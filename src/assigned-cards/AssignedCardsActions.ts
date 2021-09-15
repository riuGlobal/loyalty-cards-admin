import { AssignedCardsApi } from '../api/loyalty-cards/assigned-cards/AssignedCardsApi';
import type { AssignedCardsDTO } from '../api/loyalty-cards/assigned-cards/AssignedCardsDTO';
import type { AppDispatch } from '../app/store';
import { handleErrorWithActionCreator } from '../error/ErrorHelpers';

import { AssignedCardsActionTypes } from './AssignedCardsActionTypes';

interface SetAssignedCardsRequest {
  type: AssignedCardsActionTypes.SET_ASSIGNED_CARDS_REQUEST;
  assignedCards: AssignedCardsDTO[];
}

interface SetAssignedCardsLoading {
  type: AssignedCardsActionTypes.SET_ASSIGNED_CARDS_LOADING;
}

interface AssignedCardsRequestSuccess {
  type: AssignedCardsActionTypes.ASSIGNED_CARDS_REQUEST_SUCCESS;
}

interface AssignedCardsRequestFailure {
  type: AssignedCardsActionTypes.ASSIGNED_CARDS_REQUEST_FAILURE;
  errorMessage: string;
}

export type AssignedCardsAction =
  | SetAssignedCardsRequest
  | SetAssignedCardsLoading
  | AssignedCardsRequestSuccess
  | AssignedCardsRequestFailure;

export const setAssignedCardsRequest = (assignedCards: AssignedCardsDTO[]): SetAssignedCardsRequest => ({
  type: AssignedCardsActionTypes.SET_ASSIGNED_CARDS_REQUEST,
  assignedCards,
});

export const setAssignedCardsLoading: SetAssignedCardsLoading = {
  type: AssignedCardsActionTypes.SET_ASSIGNED_CARDS_LOADING,
};

export const assignedCardsRequestSuccess: AssignedCardsRequestSuccess = {
  type: AssignedCardsActionTypes.ASSIGNED_CARDS_REQUEST_SUCCESS,
};

export const assignedCardsRequestFailure = (errorMessage: string): AssignedCardsRequestFailure => ({
  type: AssignedCardsActionTypes.ASSIGNED_CARDS_REQUEST_FAILURE,
  errorMessage,
});

export const setAssignedCardsRequested =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const setAssignedCardsRequestedErrorMessage = 'Error when loading assigned cards';
    dispatch(setAssignedCardsLoading);
    AssignedCardsApi.findAll()
      .then((setAssignedCardsResponse) => setAssignedCardsResponse.data)
      .then((assignedCards) => dispatch(setAssignedCardsRequest(assignedCards)))
      .then(() => dispatch(assignedCardsRequestSuccess))
      .catch((error) =>
        handleErrorWithActionCreator(
          setAssignedCardsRequestedErrorMessage,
          error,
          dispatch,
          assignedCardsRequestFailure
        )
      );
  };

export const removeAssignedCardAndReloadRequested =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const removeAssignedCardAndReloadRequestedErrorMessage = `Error when removing assigned card with id: ${id}`;
    dispatch(setAssignedCardsLoading);
    AssignedCardsApi.remove(id)
      .then(() => setAssignedCardsRequested()(dispatch))
      .catch((error) =>
        handleErrorWithActionCreator(
          removeAssignedCardAndReloadRequestedErrorMessage,
          error,
          dispatch,
          assignedCardsRequestFailure
        )
      );
  };
