import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TitleProjectDto {
  @ApiProperty({
    type: 'string',
    example: 'FloraGo',
    description: 'project title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
