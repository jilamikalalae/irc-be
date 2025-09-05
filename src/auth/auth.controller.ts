import {
  Controller,
  Post,
  Request,
  UseGuards,
  Res,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { ConfigService } from '@nestjs/config';
import { OAuthExchangeTokenRequestDto } from './dto/oauth-exchange-token-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.login(req.user);
    // save to cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return {
      message: 'Login successful',
    };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req) {
    // initiates the Google OAuth2 login flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Request() req, @Res() res) {
    const webUrl = this.configService.get<string>('IRC_AI_WEB_URL');
    try {
      const { tempToken } = await this.authService.googleLogin(req);
      const redirectUrl = `${webUrl}?oauthToken=${tempToken}&oauthStatus=success`;
      res.redirect(redirectUrl);
      return {};
    } catch (error) {
      const redirectUrl = `${webUrl}?oauthStatus=failed`;
      res.redirect(redirectUrl);
      return {};
    }
  }

  @Post('oauth-exchange-token')
  @HttpCode(HttpStatus.OK)
  async exchangeToken(
    @Body() requestBody: OAuthExchangeTokenRequestDto,
    @Res({ passthrough: true }) res,
  ) {
    const accessToken = await this.authService.exchangeOAuthToken(
      requestBody.oAuthTempToken,
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,      
      sameSite: 'None',  
    });
    return {};
  }
}
