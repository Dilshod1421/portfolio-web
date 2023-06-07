import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienceDto {
  @ApiProperty({
    type: 'string',
    example: 'Amazon',
    description: 'the new name of company',
  })
  company_name?: string;

  @ApiProperty({
    type: 'string',
    example: 'I worked as a full stack developer for 2 years in SAP company',
    description: 'information about the company',
  })
  description?: string;
}
