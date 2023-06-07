import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailUserDto {
  @ApiProperty({
    type: 'string',
    example: 'teshavoy@gmail.com',
    description: 'user email address',
  })
  @IsEmail()
  email: string;
}
