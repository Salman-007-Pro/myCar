import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return body;
  }

  @Get()
  findUser() {
    return null;
  }

  @Get()
  findAllUsers() {
    return null;
  }

  @Patch()
  updateUser() {
    return null;
  }

  @Delete()
  removeUser() {
    return null;
  }
}
