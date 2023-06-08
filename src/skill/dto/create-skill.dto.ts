import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({
    type: 'string',
    example: 'Nodejs, HTML, CSS, JavaScript',
    description: 'skills',
  })
  text: string;
}
