/* eslint-disable prettier/prettier */
import { Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDTO } from '../auth/dto/login-response';
import { Request } from '@nestjs/common';

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
    
  // @Post('register')
  // async register(
  //   @Body() registerBody: RegisterRequestDto,
  // ): Promise<RegisterResponseDTO | BadRequestException> {
  //   return await this.authService.register(registerBody);
  // }
}
