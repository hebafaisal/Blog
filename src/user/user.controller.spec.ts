/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller'; 
import { UsersService } from './user.service'; 
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  // Mocking UsersService
  const mockUsersService = {
    createUser: jest.fn(),
    findByEmail: jest.fn(),
    follow: jest.fn(),
    unfollow: jest.fn(),
    findOne: jest.fn(),
    fillUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should create a user successfully', async () => {
       const createUserDto = { name: 'test', email: 'test@example.com', password: 'password' }; 
    const result = { id: 1, ...createUserDto };
    mockUsersService.createUser.mockResolvedValue(result);
    const response = await controller.register(createUserDto);
    expect(response).toEqual(result);
    expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto); 
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const result = { id: 1, email, username: 'test' };

      mockUsersService.findByEmail.mockResolvedValue(result);

      const response = await controller.findByEmail(email);
      expect(response).toEqual(result);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const email = 'notfound@example.com';

      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(controller.findByEmail(email)).rejects.toThrow(NotFoundException);
    });
  });

  describe('follow', () => {
    it('should follow another user successfully', async () => {
      const followeeId = 2;
      const request = { user: { id: 1 } };

      mockUsersService.follow.mockResolvedValue(undefined);

      await controller.follow(followeeId, request);
      expect(mockUsersService.follow).toHaveBeenCalledWith(1, followeeId);
    });
  });

  describe('unfollow', () => {
    it('should unfollow a user successfully', async () => {
      const followeeId = 2;
      const request = { user: { id: 1 } };

      mockUsersService.unfollow.mockResolvedValue(undefined);

      await controller.unfollow(followeeId, request);
      expect(mockUsersService.unfollow).toHaveBeenCalledWith(1, followeeId);
    });
  });

  describe('getMyProfile', () => {
    it('should return the current user profile', async () => {
      const request = { user: { id: 1 } };
      const result = { id: 1, username: 'test', email: 'test@example.com' };

      mockUsersService.findOne.mockResolvedValue(result);

      const response = await controller.getMyProfile(request);
      expect(response).toEqual(result);
    });
  });

  describe('followers', () => {
    it('should return the followers of a user', async () => {
      const id = 1;
      const result = [{ id: 2, username: 'follower' }];

      mockUsersService.findOne.mockResolvedValue({ followers: result });

      const response = await controller.followers(id);
      expect(response).toEqual(result);
    });

    it('should throw an error if user is not found', async () => {
      const id = 999;

      mockUsersService.findOne.mockResolvedValue(null);

      await expect(controller.followers(id)).rejects.toThrowError('User with id 999 not found');
    });
  });

  describe('following', () => {
    it('should return the users a user is following', async () => {
      const id = 1;
      const result = [{ id: 2, username: 'following' }];

      mockUsersService.findOne.mockResolvedValue({ following: result });

      const response = await controller.following(id);
      expect(response).toEqual(result);
    });

    it('should throw an error if user is not found', async () => {
      const id = 999;

      mockUsersService.findOne.mockResolvedValue(null);

      await expect(controller.following(id)).rejects.toThrowError('User with id 999 not found');
    });
  });

  describe('fillUsers', () => {
    it('should fill users successfully', async () => {
      mockUsersService.fillUsers.mockResolvedValue(undefined);

      const response = await controller.fillUsers();
      expect(response).toBe('Users filled successfully!');
    });
  });
});
