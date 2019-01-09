import { LOADING } from '../constants/actionTypes';

// loading
export const loadingReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case LOADING:
      return {
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
