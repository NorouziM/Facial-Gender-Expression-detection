import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import axios from "../utils/axios"
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

IPLocationGuard.propTypes = {
  children: PropTypes.node,
};

export default function IPLocationGuard({ children }) {
  const [countryCode, setCountryCode] = useState();

  useEffect(()=> {
    getCountryCode().then((res) => setCountryCode(res));
  },[])
  console.log(countryCode,"countryCode");
  if (countryCode === 'IR') {
    return (
      <Container>
        <Alert style={{"direction": "rtl"}} severity="error">
          <AlertTitle>لطفا VPN خود را روشن نمایید</AlertTitle>
          هموطن عزیز به دلیل تحریم ایران در فایربیس امکان استفاده از این وب سایت بدون فیلترشکن وجود ندارد.
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}


const getCountryCode = async (ip) => {
  const response = await axios.post('http://ip-api.com/json/');

  return response.data.countryCode;
}