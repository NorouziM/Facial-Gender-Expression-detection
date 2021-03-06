// @mui
import { Stack, Typography } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// ICON
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { translate } = useLocales();

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography variant="h4" sx={{ px: 1, mt: 2, mb: 2 }}>
          {translate('contactMe')}
        </Typography>
        <a href="https://github.com/NorouziM/" target="_blank">
          <GitHubIcon fontSize="large" sx={{ mx: 2 }} color="primary" />
        </a>
        <a href="https://t.me/EP_MNT" target="_blank">
          <TelegramIcon fontSize="large" sx={{ mx: 2 }} color="primary" />
        </a>
      </div>
    </Stack>
  );
}
