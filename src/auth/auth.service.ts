/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginResponseDTO } from '../auth/dto/login-response';
import { RegisterRequestDTO } from './dto/Register-requestDto';
import { RegisterResponseDTO } from './dto/Register-response.dto';

@Injectable()
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: User): Promise<LoginResponseDTO> {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    };
  }

  async register(registerDto: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const { email, username, password } = registerDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser({
      email,
      name: username,
      password: hashedPassword,
    });
    const payload = { email: newUser.email, sub: newUser.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      user: {
        id: newUser.id,
        username: newUser.name,
        email: newUser.email,
      },
      accessToken: {
        access_token: accessToken,
        user: {
          id: newUser.id,
          username: newUser.name,
          email: newUser.email,
        },
      },
    };
  }
}
