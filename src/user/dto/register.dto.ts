import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: 'string',
    example: 'John',
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    type: 'string',
    example: 'Doe',
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    type: 'string',
    example: 'johndoe@gmail.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'JohnDoe123!',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
