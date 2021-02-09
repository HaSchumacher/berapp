import { Route } from '@model/routing';

export const OVERVIEW_PAGE: string = 'overview';
export const PUMPSYSTEM_PAGE: string = 'pumpsystem';
export const PUMPSYSTEM_QUERY_PARAM_ID: string = 'id';

export const PUMPSYSTEMS_ROUTES: Route[] = [
  { name: 'Overview', path: OVERVIEW_PAGE },
];
