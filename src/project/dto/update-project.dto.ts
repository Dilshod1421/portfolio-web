import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({
    type: 'string',
    example: 'ModMe crm',
    description: 'new project title',
  })
  title?: string;

  @ApiProperty({
    type: 'string',
    example: 'modmecrm.uz',
    description: 'new project link',
  })
  link?: string;

  @ApiProperty({
    type: 'string',
    example: 'ModMe - is a crm project',
    description: 'new project description',
  })
  description?: string;
}
