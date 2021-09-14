import type { Reducer } from 'react';

import type { StackDTO } from '../api/loyalty-cards/stacks/StackDTO';

import type { StacksAction } from './StacksActions';
import { StacksActionsTypes } from './StacksActionsTypes';

interface StacksState {
  stacks: StackDTO[];
  isLoading: boolean;
  error?: {
    message: string;
  };
}

const initialStacksState: StacksState = {
  stacks: [],
  isLoading: false,
};

export const StacksStore: Reducer<StacksState, StacksAction> = (state = initialStacksState, action: StacksAction) => {
  switch (action.type) {
    case StacksActionsTypes.SET_STACKS_LOADING:
      return { ...state, isLoading: true };
    case StacksActionsTypes.SET_STACKS_REQUEST:
      return { ...state, stacks: action.stacks };
    case StacksActionsTypes.SET_STACKS_SUCCESS:
      return { ...state, isLoading: false };
    case StacksActionsTypes.SET_STACKS_FAILURE:
      return { ...state, error: { message: action.errorMessage } };
    default:
      return { ...state };
  }
};
