import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: 'string',
    example: 'Post foydali ekan',
    description: 'post description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'user id',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'post id',
  })
  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
