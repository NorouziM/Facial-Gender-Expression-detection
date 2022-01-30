import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
import useLocales from '../hooks/useLocales';
//
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection, onChangeDirection } = useSettings();
  const { currentLang } = useLocales();

  const isLight = themeMode === 'light';

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection, currentLang]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  useEffect(() => {
    if(currentLang.value === 'fa') {
      onChangeDirection('rtl');
    } else {
      onChangeDirection('ltr');

    }
  }, [currentLang]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
