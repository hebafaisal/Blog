/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../dto/Create-user-dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { 
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
