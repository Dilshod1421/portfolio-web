import { ApiProperty } from "@nestjs/swagger";

export class UpdateSocialNetworkDto {
    @ApiProperty({
        type: 'string',
        example: 'http://twitter.com/abudev',
        description: 'new social network link',
    })
    link?: string;

    @ApiProperty({
        type: 'string',
        example: 'bx bx-twitter',
        description: 'new social network icon',
    })
    icon?: string;
}
