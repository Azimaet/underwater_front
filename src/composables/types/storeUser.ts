export interface StoreUserInterface {
  token: string | null;
  refresh_token: string | null;
  data: StoreUserDataInterface;
}

export interface StoreUserDataInterface {
  email: string | null;
  roles: [];
  username: string | null;
}
