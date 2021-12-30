import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email);

    if (users.length) throw new BadRequestException('Already email in use');

    // Hash the users password
    const salt = randomBytes(8).toString('hex');
    const result = await this.hashPassword(password, salt);

    // create a new user and save it
    // return the user
    return await this.userService.create(email, result);
  }

  async login(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');
    const [salt] = user.password.split('.');
    const hashPassword = await this.hashPassword(password, salt);
    if (hashPassword !== user.password)
      throw new BadRequestException('Bad password');
    else return user;
  }

  private async hashPassword(
    password: string,
    salt: string,
    keyLen: number = 32,
  ): Promise<string> {
    const hash = (await scrypt(password, salt, keyLen)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }
}
