const NextI18Next = require('next-i18next');

module.exports = new NextI18Next({
  ns: ['layout', 'home'],
  defaultNS: 'home',
  defaultLanguage: 'en',
  otherLanguages: ['zh'],
  localePath: 'static/locales',
  localeStructure: '{{lng}}/{{ns}}'
});
