export interface StoreUserInterface {
  token: string | null;
  refresh_token: string | null;
  data: {
    email: string | null;
    roles: [];
    name: string | null;
  };
}
