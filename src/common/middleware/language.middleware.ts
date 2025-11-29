import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.lang = req.headers['irc-lang'] || 'en';
    next();
  }
}
