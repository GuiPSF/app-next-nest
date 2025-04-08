import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    //@Matches(/^(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    password: string;
}