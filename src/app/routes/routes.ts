import { ADMIN_ROUTES } from '@features/admin/routes';
import { PUMPSYSTEMS_ROUTES } from '@features/pumpsystems/routes';
import { Route } from '@model/routing';

export const PUMPSYSTEMS: string = 'pumpsystems';
export const ADMIN: string = 'admin';
export const ROOT: string = '';
export const PROFILE: string = 'profile';

export const ADMIN_FEAUTURE: Route = {
  name: 'Admin',
  path: ADMIN,
  children: ADMIN_ROUTES,
};
export const PUMPSYSTEMS_FEAUTURE: Route = {
  name: 'Pumpsystems',
  path: PUMPSYSTEMS,
  children: PUMPSYSTEMS_ROUTES,
};
export const PROFILE_FEATURE: Route= {
  name: 'Profile',
  path: PROFILE,
  // children: PROFILE_ROUTES
  };
