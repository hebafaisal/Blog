/* eslint-disable prettier/prettier */
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/Create-user-dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email is already taken');
    }

    return this.usersService.createUser(username, email, password);
  }

  @Post('login')
  async login(@Body() loginUserDto: CreateUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
