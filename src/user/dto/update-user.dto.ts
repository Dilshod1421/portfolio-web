import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'Eshmat',
    description: 'new user first name',
  })
  first_name?: string;

  @ApiProperty({
    type: 'string',
    example: 'Toshmatov',
    description: 'new user last name',
  })
  last_name?: string;

  @ApiProperty({
    type: 'string',
    example: 'eshmat@gmail.com',
    description: 'new user email address',
  })
  email?: string;
}
