import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordUserDto {
  @ApiProperty({
    type: 'string',
    example: 'Eshmat123!',
    description: "user's old password",
  })
  old_password?: string;

  @ApiProperty({
    type: 'string',
    example: 'Eshmat123!',
    description: 'new user password',
  })
  new_password?: string;
}
