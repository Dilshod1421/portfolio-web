import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
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
  password: string;
}
