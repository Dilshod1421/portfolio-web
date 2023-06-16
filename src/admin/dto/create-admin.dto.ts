import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: 'string',
    example: 'admin',
    description: 'admin user name',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'admin@gmail.com',
    description: 'admin email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'Admin001!',
    description: 'admin password',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
