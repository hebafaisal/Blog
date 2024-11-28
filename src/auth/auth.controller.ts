/* eslint-disable prettier/prettier */
import { Controller, Post, BadRequestException, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDTO } from '../auth/dto/login-response';
import { Request } from '@nestjs/common';
import { RegisterResponseDTO } from './dto/Register-response.dto';
import { RegisterRequestDTO } from './dto/Register-requestDto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDTO> {
    if (!req.user) {
      throw new BadRequestException('Invalid login credentials');
    }
    return this.authService.login(req.user);
  }
  
   @Post('register')
  async register(@Body() registerBody: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const user = await this.authService.register(registerBody);
    if (!user) {
      throw new BadRequestException('Registration failed');
    }
    return user;
  }
 
}
