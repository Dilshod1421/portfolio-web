import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: 'string',
    example: 'Post foydali ekan',
    description: 'post description',
  })
  description: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'user id',
  })
  user_id: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'post id',
  })
  post_id: number;
}
