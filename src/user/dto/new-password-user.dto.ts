import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewPasswordUserDto {
  @ApiProperty({
    type: 'string',
    example: 'Eshmat123!',
    description: "user's old password",
  })
  @IsNotEmpty()
  @IsString()
  old_password?: string;

  @ApiProperty({
    type: 'string',
    example: 'Eshmat123!',
    description: 'new user password',
  })
  @IsNotEmpty()
  @IsString()
  new_password?: string;
}
