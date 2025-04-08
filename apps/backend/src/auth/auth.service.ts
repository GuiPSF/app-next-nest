import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/SignUp.dto';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schema/refreshToken.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name) private tokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}
  async signup(signUpDto: SignUpDto) {
    const { email, username, password, role } = signUpDto;

    //Check if email is in use
    const emailInUse = await this.userModel.findOne({ email: email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user document and save in mongodb
    await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    //Find if user exists by username
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    //Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong Credentials');
    }
    //Create JWT token
    const tokens = await this.generateUserToken(user._id);
    return {
      ...tokens,
      userId: user._id,
    };
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.tokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token is invalid');
    }

    return this.generateUserToken(token.userId);
  }

  async generateUserToken(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId) {
    //Calculate Expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.tokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true },
    );
  }
}
