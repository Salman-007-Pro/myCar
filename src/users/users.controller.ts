import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

  constructor(private usersService:UsersService){}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(body.email,body.password);    
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
