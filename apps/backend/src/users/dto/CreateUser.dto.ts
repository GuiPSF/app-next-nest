import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsIn([ 'user', 'admin' ])
    role: string;
    
}