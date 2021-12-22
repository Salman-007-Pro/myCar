import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm"
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)  private repo:Repository<UserEntity>){}

    async create(email:string,password:string){
        const user=this.repo.create({email,password})
        return this.repo.save(user);
    }
}
