/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, NotFoundException, Req, Delete } from '@nestjs/common';
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

  @Post(':id/follow')
  async follow(@Param('id') followeeId: number, @Req() request) {
    const followerId = request.user.id;
    await this.usersService.follow(followerId, followeeId);
   }
  
  @Delete(':id/unfollow')
  async unfollow(@Param('id') followeeId: number, @Req() request) { 
    const followerId = request.user.id;
    await this.usersService.unfollow(followerId, followeeId);
  }

  @Get('/myProfile')
   async getMyProfile(@Req() request) {
    const userId = request.user.id;
    const user = await this.usersService.findOne(userId);
    return user;
  }

  @Get('/:id/followers')
  async followers(@Param('id') id: number, @Req() response: Response) { 
    const user = await this.usersService.findOne(id); 
    if (!user) { 
      throw new Error(`${user} not found`);
    }
    return response.json(user.followers);
  }

  @Get('/:id/following')
  async following(@Param('id') id: number, @Req() response: Response) { 
    const user = await this.usersService.findOne(id); 
    if (!user) { 
      throw new Error(`${user} not found`);
    }
    return response.json(user.following);
  }

  // update(@Param('userName') userName: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(userName, updateUserDto);
  // }

}

