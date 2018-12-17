import { createSelector } from 'reselect';

const getLocale = (state) => state.localeReducer.locale;
const getLocaleMsgs = (state) => state.localeReducer.msgs;

export const selectLocale = createSelector(
  getLocale,
  (locale) => locale
);

export const selectLocaleMsgs = createSelector(
  getLocaleMsgs,
  (msgs) => msgs
);
