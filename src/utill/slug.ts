import slugify from 'slugify';

export function createSlug(text: string) {
  return slugify(text, {
    lower: true,        // lowercase
    strict: true,       // remove special chars
    trim: true,
    locale: 'en',
  });
}