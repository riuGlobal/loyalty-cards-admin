import type { Reducer } from "redux";

import type { BlueprintDTO } from "../api/loyalty-cards/blueprints/BlueprintsDTO";

import { BlueprintsActionTypes } from "./BlueprintsActionTypes";
import type { BlueprintAction } from "./BlueprintsActions";

interface BlueprintState {
  blueprints: BlueprintDTO[];
  isLoading: boolean;
  error?: {
    message: string | null
  }
}

const blueprintInitialState: BlueprintState = {
  blueprints: [],
  isLoading: false,
}

export const blueprintsStore:Reducer<BlueprintState, BlueprintAction> = (state: BlueprintState = blueprintInitialState, action: BlueprintAction) => {
  switch (action.type) {
    case BlueprintsActionTypes.SET_BLUEPRINTS_REQUEST: 
      return { ...state, blueprints: action.blueprints }
    case BlueprintsActionTypes.SET_BLUEPRINTS_LOADING:
      return { ...state, isLoading: true }
    case BlueprintsActionTypes.BLUEPRINTS_REQUEST_SUCCESS:
      return { ...state, isLoading: false }
    case BlueprintsActionTypes.BLUEPRINTS_REQUEST_FAILURE:
      return {...state, isLoading: false, error: { message: action.errorMessage}}
    default:
      return state;
  }   
}
