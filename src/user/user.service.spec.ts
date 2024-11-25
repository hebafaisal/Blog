/* eslint-disable prettier/prettier */
import { Test} from '@nestjs/testing';
import { UsersService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let userService: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get(getRepositoryToken(User));
  });

  // // Test for delete method
  // describe('delete', () => {
  //   it('should delete a user by name', async () => {
  //     userRepository.delete.mockResolvedValueOnce({ affected: 1 } as any);
  //     await userService.delete('John');
  //     expect(userRepository.delete).toHaveBeenCalledWith({ name: 'John' });
  //   });

  //   it('should delete a user by email', async () => {
  //     userRepository.delete.mockResolvedValueOnce({ affected: 1 } as any);
  //     await userService.delete(undefined, 'john@example.com');
  //     expect(userRepository.delete).toHaveBeenCalledWith({ email: 'john@example.com' });
  //   });

  //   it('should throw an error if neither name nor email is provided', async () => {
  //     await expect(userService.delete()).rejects.toThrow(
  //       'You must provide either a name or an email to delete a user',
  //     );
  //   });
  // });

  // Test for findByEmail method
  describe('findByEmail', () => {
    it('should return a user if the email exists', async () => {
      const mockUser = { id: 1, email: 'john@example.com', name: 'John' } as User;
      userRepository.findOne.mockResolvedValueOnce(mockUser);

      const result = await userService.findByEmail('john@example.com');
      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
    });

    it('should return undefined if no user with the email exists', async () => {
      userRepository.findOne.mockResolvedValueOnce(undefined);

      const result = await userService.findByEmail('nonexistent@example.com');
      expect(result).toBeUndefined();
    });
  });

  // // Test for findOne method
  // describe('findOne', () => {
  //   it('should return a user with followers and following', async () => {
  //     const mockUser = { id: 1, followers: [], following: [] } as User;
  //     userRepository.findOne.mockResolvedValueOnce(mockUser);

  //     const result = await userService.findOne(1);
  //     expect(result).toEqual(mockUser);
  //     expect(userRepository.findOne).toHaveBeenCalledWith({
  //       where: { id: 1 },
  //       relations: ['followers', 'following'],
  //     });
  //   });

  //   it('should throw an error if the user is not found', async () => {
  //     userRepository.findOne.mockResolvedValueOnce(undefined);

  //     await expect(userService.findOne(99)).rejects.toThrow('User with ID 99 not found');
  //   });
  // });
});
