/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) { }
    
  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user); 
    }
    
    async findByUserName(name: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { name }  });
  }

  async findByEmail(email: string): Promise<User | undefined> {
      return this.userRepository.findOne({ where:{ email } });
  }

    async findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where:{ id } });
  }
    
}
