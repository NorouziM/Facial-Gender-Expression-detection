// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';

// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Index() {
  const { user } = useAuth();
  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome displayName={user?.displayName} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
