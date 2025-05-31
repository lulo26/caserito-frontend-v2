// assets
import { IconDashboard, IconPackage, IconUser, IconBuildingStore, IconKey } from '@tabler/icons-react';

// constant
export const icons = { IconDashboard, IconPackage, IconUser, IconBuildingStore, IconKey };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'productos',
      title: 'Productos',
      type: 'item',
      url: '/productos',
      icon: icons.IconPackage,
      breadcrumbs: false
    },
    {
      id: 'usuarios',
      title: 'Usuarios',
      type: 'item',
      url: '/usuarios',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'ventas',
      title: 'Ventas',
      type: 'item',
      url: '/ventas',
      icon: icons.IconBuildingStore,
      breadcrumbs: false
    },
  ],
};

export default dashboard;
