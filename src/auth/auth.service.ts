import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUserResponseDto } from './dto/validate-user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { User , UserDocument} from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from 'src/common/enum/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponseDto | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      console.log('result:', result);
      return {
        email: result.email,
        userId: result._id,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req): Promise<any> {
    if (!req.user) {
      return new Error('Google login failed: No user information received');
    }

    const { email, name, picture, googleId } = req.user;
    let user = await this.userModel.findOne({ email });  // already registered user

    if (!user) { // new user, register them and store new info in DB
      user = new this.userModel({
        email,
        name,
        picture,
        googleId,
        role: UserRole.ADMIN,
      });
      await user.save();
    }

    console.log('Logged in user:', user);

    const payload = { email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
