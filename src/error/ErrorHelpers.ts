// export const serverMessagetoToastErrorMessage
// = (serverErrorMessage: string): string => `Error when create`

import type { AnyAction } from 'redux';

import type { AppDispatch } from '../app/store';

export const handleErrorWithActionCreator = (
  clientErrorMessage: string,
  error: any,
  dispatch: AppDispatch,
  failureActionCreator: (errorMessage: string) => AnyAction
): void => {
    const errorMessage = `${clientErrorMessage} - Message from server: ${error.response?.data?.message}`;
    dispatch(failureActionCreator(errorMessage));
};
