import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import PrivateRoute from '../utils/PrivateRoute';
import { ACCESS_TOKEN_NAME } from '../store/constant';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//landing
const Landing = Loadable(lazy(() => import('views/landing')));
const Producto = Loadable(lazy(() => import('views/landing/producto')));


// sample page routin
const Usuarios = Loadable(lazy(() => import('views/usuarios')));
const Productos = Loadable(lazy(() => import('views/productos')));
const Ventas = Loadable(lazy(() => import('views/ventas')));
const Logout = Loadable(lazy(() => import('views/pages/auth-forms/AuthLogin')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: '',
  children: [
    {
      path:'/',
      element: <Landing />
    },
    {
      path:'/producto/:id',
      element: <Producto />
    },
    {
      path: '/admin',
      element: <MainLayout><PrivateRoute/></MainLayout>,
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'usuarios',
          element: <Usuarios />
        },
        {
          path: 'productos',
          element: <Productos />
        },
        {
          path: 'ventas',
          element: <Ventas />
        },
        {
          path: 'logout',
          element: <Logout />
        }
      ]
    },
  ]
};

export {
  MainRoutes
}
