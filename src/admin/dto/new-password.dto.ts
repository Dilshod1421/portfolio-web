import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class NewPasswordDto {
  @ApiProperty({
    type: 'string',
    example: 'Admin001!',
    description: 'admin old password',
  })
  @IsNotEmpty()
  old_password?: string;

  @ApiProperty({
    type: 'string',
    example: 'AbuDev1!',
    description: 'admin new password',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  new_password?: string;
}
