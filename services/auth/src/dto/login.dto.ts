import { IsInt, IsString } from 'class-validator';

export default class LoginDto {
    @IsString()
    readonly username: String
    @IsString()
    readonly password: String
}