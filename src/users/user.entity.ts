import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User with id: ', this.id);
  }
}
