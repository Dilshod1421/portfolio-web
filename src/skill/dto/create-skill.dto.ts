import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    type: 'string',
    example: 'Nodejs, HTML, CSS, JavaScript',
    description: 'skills',
  })
  @IsNotEmpty()
  text: string;
}
