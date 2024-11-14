/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/Create-user-dto';

@Controller('users') 
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const {username, email, password } = createUserDto;
    return this.usersService.createUser(username, email, password); 
  }
  

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

}

