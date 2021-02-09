import { Route } from '@model/routing';

export const OVERVIEW_PAGE: string = 'overview';
export const USERS_PAGE: string = 'users';
export const PUMPSYSTEMS_PAGE: string = 'pumpsystems';

export const ADMIN_ROUTES: Route[] = [
  { name: 'Overview', path: OVERVIEW_PAGE },
  { name: 'Users', path: USERS_PAGE },
  { name: 'Pumpsystems', path: PUMPSYSTEMS_PAGE },
];
