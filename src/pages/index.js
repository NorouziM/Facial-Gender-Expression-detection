// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import useAuth from '../hooks/useAuth';

import { PATH_DASHBOARD, PATH_AUTH } from '../routes/paths';



// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();

  useEffect(()=> {
    if(!isAuthenticated)
    push(PATH_AUTH.login);
    else
    push(PATH_DASHBOARD.general.app);

  }, [isAuthenticated])

  return <></>
}
