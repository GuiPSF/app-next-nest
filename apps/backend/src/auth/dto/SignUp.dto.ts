import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";


export class SignUpDto{

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    //@Matches(/^(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    password: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsIn([ 'user', 'admin' ])
    role: string;
}