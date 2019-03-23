import { IsInt, IsString } from 'class-validator';

export default class SignupDto {
    @IsString()
    readonly username: String
    @IsString()
    readonly email: String
    @IsString()
    readonly password: String
    @IsString()
    readonly display_name: String
    @IsString()
    readonly profile_picture: String
    @IsString()
    readonly banner_picture: String
    @IsString()
    readonly type: String
    @IsString()
    readonly uid: String
}