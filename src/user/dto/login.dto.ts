import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: 'johndoe@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'JohnDoe123!',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
