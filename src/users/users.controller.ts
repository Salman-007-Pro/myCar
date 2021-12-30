import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Query,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // async setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // async getColor(@Session() session: any) {
  //   return session.color;
  // }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoami(@CurrentUser() user: UserEntity) {
    // return this.usersService.findOne(session.userId);
    return user;
  }

  @Get('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/all')
  async getAllUser() {
    return this.usersService.findAll();
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Get()
  async find(@Query('email') email: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
