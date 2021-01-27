import { User as FireBaseUser } from '@firebase/auth-types';

export interface User extends FireBaseUser {
  data: UserData;
}

export interface UserData {
  name: string;
  permissions: Permissions;
}

export type Permissions = Record<string, Role>;

export enum Role {
  ADMIN = 'admin',
  WRITER = 'writer',
  READER = 'reader',
}
