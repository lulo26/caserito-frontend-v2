import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));


// sample page routin
const Usuarios = Loadable(lazy(() => import('views/usuarios')));
const Productos = Loadable(lazy(() => import('views/productos')));
const Ventas = Loadable(lazy(() => import('views/ventas')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/usuarios',
      element: <Usuarios />
    },
    {
      path: '/productos',
      element: <Productos />
    },
    {
      path: '/ventas',
      element: <Ventas />
    }
  ]
};

export default MainRoutes;
