// assets
import { Breadcrumbs } from '@mui/material';
import { IconKey, IconUserPlus } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconUserPlus
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'dashboard',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'logout',
      title: 'Cerrar sesión',
      type: 'item',
      url: '/logout',
      icon: icons.IconKey,
      Breadcrumbs: false
    },
    
  ]
};

export default pages;
