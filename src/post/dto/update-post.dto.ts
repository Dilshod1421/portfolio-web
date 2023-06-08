import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    type: 'string',
    example: 'About DENO',
    description: 'new post title',
  })
  title?: string;

  @ApiProperty({
    type: 'string',
    example: 'DENO - is alternative Nodejs...',
    description: 'new post content',
  })
  content?: string;
}
