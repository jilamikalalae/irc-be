import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);
  private readonly allowedDomains: string[];

  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });

    
  }

  async validate(
    accessToken: string, 
    refreshToken: string, 
    profile: any, 
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, emails, photos } = profile;
      const { given_name, family_name } = profile._json;
      
      if (!emails || emails.length === 0) {
        throw new UnauthorizedException();
      }

      const email = emails[0].value;

      const user = {
        googleId: id,
        email: email,
        firstName: given_name,
        lastName: family_name,
        picture: photos[0]?.value,
        accessToken,
      };

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}