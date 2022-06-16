import I18n from 'react-native-i18n';
import { I18nManager } from 'react-native';
import { _retrieveData, _storeData } from '@utils/storageController';
import RNRestart from 'react-native-restart';

import en from './en';
import ar from './ar';
import { LANG_KEY } from '@utils/constants';
I18n.fallbacks = true;
I18n.translations = { en, ar };

_retrieveData(LANG_KEY).then((language?: string) => {
  if (language === undefined) {
    _storeData(LANG_KEY, 'en');
    I18n.locale = 'en';
  } else {
    I18n.locale = language;
    I18nManager.forceRTL(language === 'ar');
  }
});

export const changeLanguage = (language: 'ar' | 'en') => {
  _storeData(LANG_KEY, language);
  I18n.locale = language;
  I18nManager.forceRTL(language === 'ar');
  RNRestart.Restart();
};

export const isRTL = I18nManager.isRTL;

export function strings(name: string, params?: I18n.TranslateOptions) {
  return I18n.t(name, params);
}

export const getCurrentLanguage = () => I18n.currentLocale();
export const getCurrentLanguageName = () =>
  I18n.currentLocale() === 'en' ? 'english' : 'arabic';

export default I18n;
