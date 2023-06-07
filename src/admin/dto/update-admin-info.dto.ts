import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminInfo {
  @ApiProperty({
    type: 'string',
    example: 'abudev',
    description: 'admin new user name',
  })
  username?: string;

  @ApiProperty({
    type: 'string',
    example: 'abudev@gmail.com',
    description: 'admin new email',
  })
  email?: string;

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
