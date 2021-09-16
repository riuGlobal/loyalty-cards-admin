import type { Reducer } from 'redux';

import type { AssignedCardsDTO } from '../api/loyalty-cards/assigned-cards/AssignedCardsDTO';

import { AssignedCardsActionTypes } from './AssignedCardsActionTypes';
import type { AssignedCardsAction } from './AssignedCardsActions';

interface AssignedCardsState {
  assignedCards: AssignedCardsDTO[];
  isLoading: boolean;
  error?: {
    message: string;
  };
}

const initialAssignedCardsState: AssignedCardsState = {
  assignedCards: [],
  isLoading: false,
};

export const assignedCardsStore: Reducer<AssignedCardsState,AssignedCardsAction> = (
  state: AssignedCardsState = initialAssignedCardsState,
  action: AssignedCardsAction
) => {
  switch (action.type) {
    case AssignedCardsActionTypes.SET_ASSIGNED_CARDS_LOADING:
      return { ...state, isLoading: true };
    case AssignedCardsActionTypes.ASSIGNED_CARDS_REQUEST_SUCCESS:
      return { ...state, isLoading: false };
    case AssignedCardsActionTypes.ASSIGNED_CARDS_REQUEST_FAILURE:
      return { ...state, isLoading: false, error: { message: action.errorMessage } };
    case AssignedCardsActionTypes.SET_ASSIGNED_CARDS_REQUEST:
      return { ...state, assignedCards: action.assignedCards };
    default:
      return { ...state };
  }
};
