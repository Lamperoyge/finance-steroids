import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = createClient({ space, accessToken });

const previewClient = createClient({ space, accessToken });

export async function fetchEntries() {
  const entries = await client.getEntries({ content_type: 'blogPost' });
  if (entries.items) return entries.items;
  else return [];
}

export async function getSingleEntryBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug[in]': slug,
  });
  if (entries.items) return entries.items[0].fields;
  else {
    console.log('Error getting entry for', slug);
    return null;
  }
}
