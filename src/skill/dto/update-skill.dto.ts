import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDto {
  @ApiProperty({
    type: 'string',
    example: 'Java, Core, GRpc',
    description: 'new skills',
  })
  text?: string;
}
