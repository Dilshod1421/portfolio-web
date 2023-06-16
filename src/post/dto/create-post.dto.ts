import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
    example: 'Javascriptdan yangilik',
    description: 'post title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'Javascriptda siz endi code yanada samaraliroq yozishingiz mumkin',
    description: 'post content',
  })
  @IsNotEmpty()
  content: string;
}
