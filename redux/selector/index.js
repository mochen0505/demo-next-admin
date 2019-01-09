import { createSelector } from 'reselect';

const getLoading = (state) => state.loadingReducer.isLoading;

export const selectLoading = createSelector(
  getLoading,
  (loading) => loading
);
