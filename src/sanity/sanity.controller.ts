import { Controller } from '@nestjs/common';
import { SanityService } from './sanity.service';

@Controller('sanity')
export class SanityController {
  constructor(private readonly sanityService: SanityService) {}
}
