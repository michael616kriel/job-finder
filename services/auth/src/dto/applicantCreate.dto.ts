import { IsInt, IsString, IsArray } from 'class-validator';

export default class ApplicantCreateDto {
    @IsString()
    readonly firstname: String
    @IsString()
    readonly lastname: String
    @IsString()
    readonly contact: String
    @IsString()
    readonly job_title: String
    @IsString()
    readonly about: String
    @IsArray()
    readonly skills: Array<String>
    @IsArray()
    readonly education: Array<any>
    @IsArray()
    readonly experience: Array<any>
    @IsString()
    readonly uid: String
    @IsArray()
    readonly jobs_applied: Array<any>



}