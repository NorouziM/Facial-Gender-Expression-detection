import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
// hooks
import useSettings from '../hooks/useSettings';
// Resources
import LogoSmall from '../../public/logo/logo-small.png';
import LogoImage from '../../public/logo/logo.png';
import LogoWhite from '../../public/logo/logo-white.png';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ isSmall = false, sx }, ref) => {
  const { themeMode } = useSettings();

  if (isSmall) {
    return (
      <NextLink href="/">
        <Image src={LogoSmall} height={50} objectFit="contain" />
      </NextLink>
    );
  }

  return (
    <NextLink href="/">
      <Image src={themeMode === 'light' ? LogoImage : LogoWhite} height={50} objectFit="contain" />
    </NextLink>
  );
});

Logo.propTypes = {
  isSmall: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
