import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id, { cache: { id, milliseconds: 60 * 1000 } });
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.repo.remove(user);
  }
}
