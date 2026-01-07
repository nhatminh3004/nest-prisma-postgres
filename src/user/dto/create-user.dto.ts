import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  age?: number;
}
