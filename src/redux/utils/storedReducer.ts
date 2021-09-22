import { Action, AnyAction, Reducer } from 'redux';

export const STORAGE_KEY = '__STORED_STATE__';

const storedReducer = <S = any, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  key: string
) => {
  return (state: S | undefined, action: A) => {
    const newState = reducer(state, action);
    if (state !== newState && action.type.indexOf('@@redux') < 0) {
      if (typeof window !== 'undefined') {
        const __STORED_STATE__ = JSON.parse(
          window.localStorage.getItem(STORAGE_KEY) ?? '{}'
        );

        __STORED_STATE__[key] = newState;

        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(__STORED_STATE__)
        );
      }
    }

    return newState;
  };
};

export default storedReducer;
