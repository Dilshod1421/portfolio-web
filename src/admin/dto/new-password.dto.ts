import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordDto {
  @ApiProperty({
    type: 'string',
    example: 'Admin001!',
    description: 'admin old password',
  })
  old_password?: string;

  @ApiProperty({
    type: 'string',
    example: 'AbuDev1!',
    description: 'admin new password',
  })
  new_password?: string;
}
