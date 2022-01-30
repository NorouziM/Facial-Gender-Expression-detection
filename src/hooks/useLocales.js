import { useTranslation } from 'react-i18next';
// @mui
import { enUS, faIR } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: 'Persian',
    value: 'fa',
    systemValue: faIR,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  let langStorage;
  if (typeof window !== 'undefined') 
  langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
