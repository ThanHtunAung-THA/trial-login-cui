import React from 'react';

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'));
const Account = React.lazy(() => import('./views/pages/account/Account'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/account', name: 'Account', component: Account },
];

export default routes;
