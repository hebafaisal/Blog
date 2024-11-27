/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginResponseDTO } from '../auth/dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user: User = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);;
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(user: User): Promise<LoginResponseDTO> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    };
  }

}