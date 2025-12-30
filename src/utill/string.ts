import { randomUUID } from 'crypto';

export function stringToPortableText(text: string) {
  return [
    {
      _key: randomUUID(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: randomUUID(),
          _type: 'span',
          text,
          marks: [],
        },
      ],
    },
  ];
}
