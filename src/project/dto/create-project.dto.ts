import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    type: 'string',
    example: 'FloraGo',
    description: 'project title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'hhtps://florago.uz',
    description: 'project link',
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    type: 'string',
    example: 'florago-logo.png',
    description: 'project image',
  })
  image: string;

  @ApiProperty({
    type: 'string',
    example: 'FloraGo - is online market',
    description: 'project description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
