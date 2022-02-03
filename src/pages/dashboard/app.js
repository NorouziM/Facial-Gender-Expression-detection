import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Button } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import { RHFUploadSingleFile } from '../../components/hook-form';
// sections
import AppWebcam from '../../sections/@dashboard/general/app/AppWebcam';
import AppImageProcessor from '../../sections/@dashboard/general/app/AppImageProcessor';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const [currentMode, setCurrentMode] = useState('upload'); // upload or webcam or anaylzedImage
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState([]);

  const { themeMode } = useSettings();

  const { translate } = useLocales();

  const handleChangeMode = () => {
    setCurrentMode(currentMode === 'upload' ? 'webcam' : 'upload');
  };

  useEffect(() => {
    if (file.length > 0) setImageUrl(window.URL.createObjectURL(file[0]));
  }, [file]);

  useEffect(() => {
    if (imageUrl) setCurrentMode('analyzedImage');
  }, [imageUrl]);

  return (
    <Page title="General: App">
      <Container maxWidth={'lg'}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          {currentMode !== 'analyzedImage' ? (
            <Button
              color="primary"
              variant="contained"
              size="normal"
              startIcon={<ChangeCircleIcon />}
              onClick={handleChangeMode}
            >
              {translate('Change to')} {currentMode === 'upload' ? translate('Use Webcam') : translate('Upload Image')}
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              size="normal"
              startIcon={<SettingsBackupRestoreIcon />}
              onClick={() => setCurrentMode('upload')}
            >
              {translate('Upload another imaage')}
            </Button>
          )}
        </Stack>
        {currentMode === 'upload' && <RHFUploadSingleFile sx={{ mt: 3 }} setFile={setFile} />}
        {currentMode !== 'upload' && (
          <Container
            maxWidth={'lg'}
            sx={{
              bgcolor: themeMode === 'light' ? 'grey.800' : 'common.white',
              mt: 3,
              height: '75vh',
              color: 'primary.main',
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            {currentMode === 'webcam' && <AppWebcam />}
            {currentMode === 'analyzedImage' && <AppImageProcessor imageUrl={imageUrl} />}
          </Container>
        )}
      </Container>
    </Page>
  );
}
