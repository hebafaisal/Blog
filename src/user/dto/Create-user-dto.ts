/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;  

  @IsNotEmpty()
  @IsString()
  password: string;
}