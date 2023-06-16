import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialNetworkDto {
  @ApiProperty({
    type: 'string',
    example: 'http://t.me/abudev',
    description: 'social network link',
  })
  @IsNotEmpty()
  @IsString()
  link: string;
}
