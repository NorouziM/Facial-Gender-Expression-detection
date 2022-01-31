// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { currentLang } = useLocales();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}></Grid>
      </Container>
    </Page>
  );
}
