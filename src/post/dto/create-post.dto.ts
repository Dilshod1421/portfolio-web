import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
    example: 'Javascriptdan yangilik',
    description: 'post title',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'Javascriptda siz endi code yanada samaraliroq yozishingiz mumkin',
    description: 'post content',
  })
  content: string;
}
