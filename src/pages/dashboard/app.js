import { useRef, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, DialogTitle, Switch, Typography, DialogActions, Dialog } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
import Webcam from 'react-webcam';

// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';
import cssStyles from 'src/utils/cssStyles';
import { RHFUploadSingleFile } from 'src/components/hook-form';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeMode } = useSettings();
  const webcamRef = useRef(null);

  const { translate } = useLocales();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState('upload');

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClickChangeMode = () => {
    setIsDialogOpen(true);
  };

  const handleChangeMode = () => {
    setCurrentMode(currentMode === 'upload' ? 'webcam' : 'upload');
    setIsDialogOpen(false);
  };
  return (
    <Page title="General: App">
      <Container maxWidth={'xl'}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Button
            color="primary"
            variant="contained"
            size="normal"
            startIcon={<ChangeCircleIcon />}
            onClick={handleClickChangeMode}
          >
            Change to {currentMode === 'upload' ? 'Use Webcam' : 'Upload Image'}
          </Button>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ justifyContent: { xs: 'center', sm: 'flex-end' } }}
          >
            <Typography>{translate('Gender Detector')}</Typography>
            <Switch defaultChecked />
            <Typography>{translate('Expression Detector')}</Typography>
          </Stack>
        </Stack>
        {currentMode === 'upload' && <RHFUploadSingleFile sx={{ mt: 3 }} />}
        {currentMode !== 'upload' && (
          <Container
            maxWidth={'xl'}
            sx={{
              bgcolor: themeMode === 'light' ? 'grey.800' : 'common.white',
              ...(currentMode === 'analyzedImage'
                ? cssStyles().bgImage({ url: 'https://source.unsplash.com/random', bgColorOpacity: 0.000001 })
                : {}),
              mt: 3,
              height: '75vh',
              color: 'primary.main',
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            {currentMode === 'webcam' && (
              <Stack justifyContent={'center'} sx={{ height: '100%' }}>
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" height={'100%'} />
              </Stack>
            )}
          </Container>
        )}
      </Container>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{translate('changeAppMode')}</DialogTitle>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCloseDialog}>{translate('No')} </Button>
          <Button onClick={handleChangeMode} autoFocus>
            {translate('Yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
