/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) { }
    
  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = this.userRepository.create({ name,email, password: hashedPassword });
    return this.userRepository.save(user); 
    }
    
    async findByName(name: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { name }  });
  }

  async findByEmail(email: string): Promise<User | undefined> {
      return this.userRepository.findOne({ where:{ email } });
  }

  async update(name: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOneBy({ name });
    
    if (!existingUser) { 
       throw new Error(`${existingUser} not found`);
    }
    return await this.userRepository.update(name, updateUserDto);
  }
  
   async delete(name?: string, email?: string) {
     if (name) {
       await this.userRepository.delete({ name });
      } else if (email) {
       await this.userRepository.delete({ email });
     } else {
       throw new Error('You must provide either a name or an email to delete a user>');
      }
  }

  async follow(followerId: number, followeeId: number) { 
    const follower = await this.userRepository.findOne({ where: { id: followerId }, relations: ['following'] });
    const followee = await this.userRepository.findOne({ where: { id: followeeId }, relations: ['followers'] });

    if (!follower || !followee) { 
      throw new Error('User not found');
    }

    if (!follower.following) {
      follower.following = [];
    }

    follower.following.push(followee);
    await this.userRepository.save(follower);

  }

  async unfollow(followerId: number, followeeId: number) {
     const follower = await this.userRepository.findOne({ where: { id: followerId }, relations: ['following'] });
    const followee = await this.userRepository.findOne({ where: { id: followeeId }, relations: ['followers'] });

    if (!follower || !followee) { 
      throw new Error('User not found');
    }

    follower.following = follower.following.filter(user => user.id !== followeeId);
    await this.userRepository.save(follower);

  }

  async findOne(id: number) {
     const user = await this.userRepository.findOne({
      where: { id }, relations: ['followers', 'following'] });
    
    if (!user) { 
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
  
}
