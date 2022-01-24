import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  readonly bio: string;
  @IsOptional()
  readonly image: string;
  @IsOptional()
  readonly username: string;
}
