// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// trans
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'home',
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.kanban,
      },
    ],
  },

  // SETTINGS
  // ----------------------------------------------------------------------
  {
    subheader: 'user',
    items: [
      {
        title: 'profile',
        path: PATH_DASHBOARD.user.profile,
        icon: ICONS.user,
      },
    ],
  },
];

export default navConfig;
