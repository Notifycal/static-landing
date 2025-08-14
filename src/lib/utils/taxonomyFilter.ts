import { slugify } from '@/lib/utils/textConverter';

import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

const taxonomyFilter = (posts: Array<Post>, name: keyof Post['data'], key: string): Array<Post> =>
  posts.filter((post) => {
    const field = post.data[name];
    return Array.isArray(field) && field.map((item: string) => slugify(item)).includes(key);
  });

export default taxonomyFilter;
