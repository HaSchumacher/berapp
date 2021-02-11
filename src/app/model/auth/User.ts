import { User as FireBaseUser } from '@firebase/auth-types';

export interface User extends FireBaseUser {
  data: UserData;
}

export interface UserData {
  superadmin: boolean;
  name: string;
  permissions: Permissions;
  id: string;
  email: string;
  verified: boolean;
  fields: Array<String>;
}

export type Permissions = Record<string, string>;
