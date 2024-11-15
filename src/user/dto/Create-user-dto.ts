/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString} from 'class-validator';

export class CreateUserDto {

 @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}