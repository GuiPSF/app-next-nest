import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    @Get()
    getUser(){
        const users = this.userService.getUsers();
        return this.userService.getUsers()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return await this.userService.getUserById(id)
    }

    @Post()
    @UsePipes(new ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto)
        return this.userService.createUser(createUserDto)
    }

    @Put(':username')
    @UsePipes(new ValidationPipe)
    async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto){
        return await this.userService.updateUser(username, updateUserDto);
    }

    @Delete(':username')
    async deleteUser(@Param('username') username: string){
        return await this.userService.deleteUser(username);
    }
}
