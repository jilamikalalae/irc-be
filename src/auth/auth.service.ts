import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUserResponseDto } from './dto/validate-user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from 'src/common/enum/user-role.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponseDto | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      return {
        email: result.email,
        userId: result._id,
        role: result.role,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req): Promise<{ tempToken: string }> {
    try {
      if (!req.user) {
        throw new Error('Google login failed: No user information received');
      }

      const { email, name, picture, googleId } = req.user;

      const allowedDomainsString =
        this.configService.get<string>('ALLOWED_DOMAINS');
      const allowedDomains = allowedDomainsString
        ? allowedDomainsString
            .split(',')
            .map((domain) => domain.trim().toLowerCase())
        : ['au.edu'];

      const emailDomain = email.split('@')[1]?.toLowerCase();

      // Validate domain
      if (!emailDomain || !allowedDomains.includes(emailDomain)) {
        Logger.warn(
          `Access denied for domain: ${emailDomain} (email: ${email})`,
        );
        throw new UnauthorizedException();
      }


      let user = await this.userModel.findOne({ email }); // already registered user

      if (!user) {
        // new user, register them and store new info in DB
        user = new this.userModel({
          email,
          name,
          picture,
          googleId,
          role: UserRole.ADMIN,
        });
        await user.save();
      }

      const payload = { sub: user._id };

      return {
        tempToken: this.jwtService.sign(payload, { expiresIn: '60s' }),
      };
    } catch (error) {
      throw new Error(`Google login failed: ${error.message}`);
    }
  }

  async exchangeOAuthToken(tempToken: string): Promise<string> {
    try {
      const decoded = this.jwtService.verify(tempToken);

      const user = await this.userModel.findById(decoded.sub);
      if (!user) {
        throw new Error('User not found');
      }

      const payload = { sub: decoded.sub, email: user.email, role: user.role };
      const newToken = this.jwtService.sign(payload);
      return newToken;
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
