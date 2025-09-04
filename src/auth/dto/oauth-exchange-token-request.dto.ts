import { IsNotEmpty } from 'class-validator';

export class OAuthExchangeTokenRequestDto {
  @IsNotEmpty()
  readonly oAuthTempToken: string;
}
