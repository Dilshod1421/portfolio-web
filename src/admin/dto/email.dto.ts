import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailAdminDto{
    @ApiProperty({
        type: 'email',
        example: 'email@example.com',
        description: 'email address of the administrator',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}