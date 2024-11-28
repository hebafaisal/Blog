/* eslint-disable prettier/prettier */
export type LoginResponseDTO = {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};