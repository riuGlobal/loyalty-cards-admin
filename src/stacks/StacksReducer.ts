import type { Reducer } from 'redux';

import type { StackDTO } from '../api/loyalty-cards/stacks/StackDTO';

import type { StacksAction } from './StacksActions';
import { StacksActionsTypes } from './StacksActionsTypes';

interface StacksState {
  stacks: StackDTO[];
  isLoading: boolean;
  error?: {
    message: string;
  };
  assignedCardTo?: {
    userId: string;
  };
}

const initialStacksState: StacksState = {
  stacks: [],
  isLoading: false,
};

export const stacksStore: Reducer<StacksState, StacksAction> = (
  state = initialStacksState,
  action: StacksAction
): StacksState => {
  switch (action.type) {
    case StacksActionsTypes.SET_STACKS_LOADING:
      return { ...state, isLoading: true };
    case StacksActionsTypes.SET_STACKS_REQUEST:
      return { ...state, stacks: action.stacks };
    case StacksActionsTypes.SET_STACKS_SUCCESS:
      return { ...state, isLoading: false };
    case StacksActionsTypes.SET_STACKS_FAILURE:
      return { ...state, isLoading: false, error: { message: action.errorMessage } };
    case StacksActionsTypes.ASSIGN_CARD_TO_USER_SUCCESS:
      return { ...state, assignedCardTo: { userId: action.userId } };
    default:
      return { ...state };
  }
};
