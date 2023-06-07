import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminInfo {
  @ApiProperty({
    type: 'string',
    example: 'abudev',
    description: 'admin new user name',
  })
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'abudev@gmail.com',
    description: 'admin new email',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'AbuDev1!',
    description: 'admin new password',
  })
  password: string;
}
