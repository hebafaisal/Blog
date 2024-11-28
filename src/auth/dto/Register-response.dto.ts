/* eslint-disable prettier/prettier */
import { AccessToken } from '../types/AccessToken';

export type RegisterResponseDTO = {
  user: { id: number; username: string, email: string };
  accessToken: AccessToken;
};