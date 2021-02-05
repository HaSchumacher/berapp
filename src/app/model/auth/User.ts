import { User as FireBaseUser } from '@firebase/auth-types';
import { FieldTemplate } from '@model/fieldTemplate';

export interface User extends FireBaseUser {
  data: UserData;
}

export interface UserData {
  superadmin: boolean;
  name: string;
  permissions: Permissions;
  id: string;
  email: string;
  fields: Array<String>;
}

export type Permissions = Record<string, string>;
