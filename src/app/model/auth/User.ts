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
<<<<<<< HEAD
  verified: boolean;
  fields: Array<String>;
=======
  fields: Array<string>;
>>>>>>> first profile overview
}

export type Permissions = Record<string, string>;
