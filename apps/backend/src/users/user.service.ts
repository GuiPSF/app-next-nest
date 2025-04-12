import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    getUsers(){
        return this.userModel.find();
    }

    getUserById(id: string){
        return this.userModel.findById(id)
    }

    createUser(createUserDto: CreateUserDto){
        const newUser = new this.userModel(createUserDto)
        return newUser.save()
    }

    updateUser(username: string, updateUserDto: UpdateUserDto){
        //return this.userModel.findByIdAndUpdate(username, updateUserDto, {new: true})
        return this.userModel.findOneAndUpdate( {username: { $eq: username}}, updateUserDto, {new: true})
    }

    deleteUser(username: string){
        return this.userModel.findOneAndDelete({username});
    }
}
