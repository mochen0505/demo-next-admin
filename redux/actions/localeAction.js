import { addLocaleData } from 'react-intl';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { LOCALE_EN, LOCALE_ZH } from '../constants/actionTypes';

// locale provider
addLocaleData([...en, ...zh]);

const localeEN = () => {
  window.localStorage.setItem('language', 'en-US');
  return {
    type: LOCALE_EN,
    locale: 'en-US',
    msgs: en_US
  };
};

const localeZH = () => {
  window.localStorage.setItem('language', 'zh-CN');
  return {
    type: LOCALE_ZH,
    locale: 'zh-CN',
    msgs: zh_CN
  };
};

export { localeEN, localeZH };
