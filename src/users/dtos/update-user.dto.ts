import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
