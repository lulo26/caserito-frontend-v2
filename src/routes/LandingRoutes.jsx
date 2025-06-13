import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const Landing = Loadable(lazy(() => import('views/landing')));
const Producto = Loadable(lazy(() => import('views/landing/producto')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  element: <MinimalLayout />,
    children: [
    {
      path:'/',
      element: <Landing />,
      children:[
        {
          path:'/producto/:id',
          element: <Producto />
        },
      ]
    }
  ] 
};

export default LandingRoutes;
