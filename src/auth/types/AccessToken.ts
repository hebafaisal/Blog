/* eslint-disable prettier/prettier */
export type AccessToken = {
  access_token: string;
  user: {
        id: number,
        username: string,
        email: string,
      }
};