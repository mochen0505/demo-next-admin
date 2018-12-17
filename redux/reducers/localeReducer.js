import zh_CN from '../../locale/zh_CN';
import { LOCALE_EN, LOCALE_ZH } from '../constants/actionTypes';

export const localeReducer = (
  state = { locale: 'zh-CN', msgs: zh_CN },
  action
) => {
  switch (action.type) {
    case LOCALE_EN:
      window.localStorage.setItem('language', 'en-US');
      return {
        locale: action.locale,
        msgs: action.msgs
      };
    case LOCALE_ZH:
      window.localStorage.setItem('language', 'zh-CN');
      return {
        locale: action.locale,
        msgs: action.msgs
      };
    default:
      return state;
  }
};
