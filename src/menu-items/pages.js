// assets
import { IconKey, IconUserPlus } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconUserPlus
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'login',
      title: 'login',
      type: 'item',
      url: '/pages/login',
      icon: icons.IconKey,
      target: true
    },
    {
      id: 'register',
      title: 'register',
      type: 'item',
      url: '/pages/register',
      icon: icons.IconUserPlus,
      target: true
    }
    
  ]
};

export default pages;
