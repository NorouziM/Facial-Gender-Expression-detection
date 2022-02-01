import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import useLocales from '../../hooks/useLocales';
// routes
import { PATH_AUTH } from '../../routes/paths';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';

// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();
  const { translate } = useLocales();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Register">
        <RootStyle>
          <HeaderStyle>
            <Logo isSmall={true} />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack sx={{ mr: 2 }}>
                <LanguagePopover />
              </Stack>
              {smUp && (
                <Typography variant="body1">
                  {translate('alreadyHaveAccount')}{' '}
                  <NextLink href={PATH_AUTH.login} passHref>
                    <Link variant="subtitle2">{translate('login')}</Link>
                  </NextLink>
                </Typography>
              )}
            </Stack>
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                {translate('slogan')}
              </Typography>
              <Image
                alt="register"
                src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_register.png"
              />
            </SectionStyle>
          )}

          <Container>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {translate('letsGetStarted')}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{translate('itsFree')}</Typography>
                </Box>
              </Box>

              <RegisterForm />

              {!smUp && (
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <NextLink href={PATH_AUTH.login} passHref>
                    <Link variant="subtitle2">Login</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
