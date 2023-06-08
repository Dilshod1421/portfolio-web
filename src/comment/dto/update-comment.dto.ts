import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    type: 'string',
    example: 'Maqola qiziqarli chiqibdi',
    description: 'new post description',
  })
  description?: string;

  @ApiProperty({
    type: 'number',
    example: '2',
    description: 'new user id',
  })
  user_id?: number;

  @ApiProperty({
    type: 'number',
    example: '2',
    description: 'new post id',
  })
  post_id?: number;
}
