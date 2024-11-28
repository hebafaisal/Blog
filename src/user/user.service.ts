/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/Create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
    
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, name, password: hashedPassword });
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
  
  async fillUsers() {
  const chunkSize = 10_000;
  const totalUsers = 100_000;
  const users = new Set();
  const userChunks = [];

  for (let i = 0; i < totalUsers; i++) {
    let randomEmail;
    let randomID;

    do {
      randomEmail = faker.internet.email();
    } while (users.has(randomEmail));

    do {
      randomID = faker.string.uuid();
    } while (users.has(randomID));

    users.add(randomEmail);
    users.add(randomID);

    userChunks.push({
      name: faker.internet.username(),
      email: randomEmail,
      password: faker.internet.password(),
      id: randomID,
    });

    if (userChunks.length === chunkSize) {
      console.log('Inserting chunk Number:', Math.floor(i / chunkSize));
      console.log('Percentage done:', ((i + 1) / totalUsers) * 100 + '%');
      await this.userRepository.insert(userChunks);
      userChunks.length = 0; // Clear the chunk
    }
  }

  if (userChunks.length > 0) {
    await this.userRepository.insert(userChunks);
  }

  return 'done';
}
}
