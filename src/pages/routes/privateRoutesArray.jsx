import React, { lazy } from 'react';

import { paths } from '../../config';
import Layout from '../../base/layout/componetns';

const Profile = lazy(() => import('../Profile'));
const AccountSetup = lazy(() => import('../AccountSetup'));
const Refill = lazy(() => import('../Refill'));
const Checkout = lazy(() => import('../Checkout'));

// we need to render Layout every time
// because if we wrap all routes in one layout it will work wrong
const privateRoutes = [
  {
    exact: true,
    path: paths.addTime,
    component: () => <Layout><Refill /></Layout>,
  },
  {
    exact: true,
    path: paths.checkout(),
    component: () => <Layout><Checkout /></Layout>,
  },
  {
    exact: true,
    path: paths.account,
    component: () => (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    exact: true,
    path: paths.chat,
    component: () => <Layout>chat</Layout>,
  },
  {
    exact: true,
    path: paths.accountSetup,
    component: () => <AccountSetup />,
  },
];

export default privateRoutes;
