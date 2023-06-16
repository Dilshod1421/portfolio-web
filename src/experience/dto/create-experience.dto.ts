import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({
    type: 'string',
    example: 'SAP',
    description: 'the name of company',
  })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({
    type: 'string',
    example: 'I worked as a full stack developer for 2 years in SAP company',
    description: 'information about the company',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
