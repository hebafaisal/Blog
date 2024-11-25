/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test} from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
// import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UsersController;
  let userService: Partial<Record<keyof UsersService, jest.Mock>>;

 beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(), AuthModule], // Adjust paths as needed
    controllers: [UsersController],
    providers: [UsersService],
  }).compile();

  const controller = moduleRef.get<UsersController>(UsersController);
  });

  // Test for following method
  describe('following', () => {
    it('should return the following list for a user', async () => {
      const mockFollowing = [{ id: 2, name: 'John Doe' }];
      userService.findOne.mockResolvedValue({ id: 1, following: mockFollowing });

      const result = await userController.following(1);
      expect(result).toEqual(mockFollowing);
      expect(userService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the user is not found', async () => {
      userService.findOne.mockResolvedValue(null);

      await expect(userController.following(99)).rejects.toThrow('User with id 99 not found');
    });
  });

  // // Test for getMyProfile method
  // describe('getMyProfile', () => {
  //   it('should return the profile of the logged-in user', async () => {
  //     const mockRequest = { user: { id: 1 } };
  //     const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  //     userService.findOne.mockResolvedValue(mockUser);

  //     const result = await userController.getMyProfile(mockRequest as any);
  //     expect(result).toEqual(mockUser);
  //     expect(userService.findOne).toHaveBeenCalledWith(1);
  //   });
  // });

  // // Test for fillUsers method
  // describe('fillUsers', () => {
  //   it('should call the fillUsers service method and return a success message', async () => {
  //     userService.fillUsers.mockResolvedValue();

  //     const result = await userController.fillUsers();
  //     expect(result).toEqual('Users filled successfully!');
  //     expect(userService.fillUsers).toHaveBeenCalled();
  //   });
  // });
});