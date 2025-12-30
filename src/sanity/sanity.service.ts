import { Injectable } from '@nestjs/common';
import { createClient } from '@sanity/client';
import { createSlug } from 'src/utill/slug';

@Injectable()
export class SanityService {
  private client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN, // REQUIRED for write
    useCdn: false,
  });

  createDocument(doc: any) {
    return this.client.create(doc);
  }

  async isSlugTaken(slug: string): Promise<boolean> {
    const count = await this.client.fetch(
      `count(*[_type == "post" && slug.current == $slug])`,
      { slug },
    );

    return count > 0;
  }

  async generateUniqueSlug(title: string): Promise<string> {
    const base = createSlug(title);
    let slug = base;
    let suffix = 1;

    while (await this.isSlugTaken(slug)) {
      slug = `${base}-${suffix}`;
      suffix++;
    }

    return slug;
  }
}
