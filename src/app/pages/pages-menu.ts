import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'layout-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '',
    group: true,
  },
  {
    title: 'Warehouses',
    icon: 'home-outline',
    children: [
      {
        title: 'View',
        link: '/pages/warehouse/view',
      },
      {
        title: 'Create',
        link: '/pages/warehouse/create',
      },
    ],
  },
];
