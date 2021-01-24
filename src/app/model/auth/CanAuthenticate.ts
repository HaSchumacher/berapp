export interface CanAuthenticate {
  signIn(email: string, password: string): Promise<any>;
  signup(email: string, password: string): Promise<any>;
  signOut(): Promise<void>;
}
