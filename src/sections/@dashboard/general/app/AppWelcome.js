import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Typography, Card, CardContent } from '@mui/material';
import { BookingIllustration } from '../../../../assets';
//hooks
import useLocales from '../../../../hooks/useLocales';
// config
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }) {
  const { translate } = useLocales();
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 10 },
          pl: { md: 8 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          {translate('welcome.title')}
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body1" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 520, mx: 'auto' }}>
          {translate('welcome.description')}
        </Typography>
        <NextLink href={PATH_DASHBOARD.general.app}>
          <LoadingButton size="normal" type="submit" variant="contained">
            {translate('getStarted')}
          </LoadingButton>
        </NextLink>
      </CardContent>

      <BookingIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}
