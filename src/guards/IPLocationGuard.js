import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import axios from '../utils/axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

IPLocationGuard.propTypes = {
  children: PropTypes.node,
};

export default function IPLocationGuard({ children }) {
  const [countryCode, setCountryCode] = useState();

  useEffect(() => {
    getCountryCode().then((res) => setCountryCode(res));
  }, []);
  if (countryCode === 'IR') {
    return (
      <Container>
        <Alert style={{ direction: 'rtl' }} severity="error">
          <AlertTitle>لطفا VPN خود را روشن نمایید</AlertTitle>
          هموطن عزیز به دلیل تحریم ایران در فایربیس امکان استفاده از این وب سایت بدون فیلترشکن وجود ندارد.
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}

const getCountryCode = async () => {
  const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=08354ca984314c48ba14db8246c41c38');

  return response.data.country_code2;
};
