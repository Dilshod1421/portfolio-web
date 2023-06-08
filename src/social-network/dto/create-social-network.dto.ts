import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialNetworkDto {
    @ApiProperty({
        type: 'string',
        example: 'http://t.me/abudev',
        description: 'social network link',
    })
    link: string;

    @ApiProperty({
        type: 'string',
        example: 'telegram.svg',
        description: 'social network icon',
    })
    icon: string;
}
