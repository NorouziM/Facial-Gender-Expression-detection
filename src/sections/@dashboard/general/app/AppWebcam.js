import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Typography, Card, CardContent } from '@mui/material';
import { BookingIllustration } from '../../../../assets';
import useLocales from 'src/hooks/useLocales';
import { PATH_DASHBOARD } from 'src/routes/paths';

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

AppWebcam.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWebcam({ displayName }) {
  const { translate } = useLocales();
  return <RootStyle></RootStyle>;
}
