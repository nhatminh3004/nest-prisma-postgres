import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  // Mã bí mật để tạo ADMIN (optional)
  @IsOptional()
  @IsString()
  pass?: string;
}
