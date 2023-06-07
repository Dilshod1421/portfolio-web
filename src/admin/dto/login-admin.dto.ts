import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    type: 'string',
    example: 'admin@gmail.com',
    description: 'admin email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'Admin001!',
    description: 'admin password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
