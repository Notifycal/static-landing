import type { CollectionEntry } from 'astro:content';

const similarItems = (
  currentItem: CollectionEntry<'careers'>,
  allItems: Array<CollectionEntry<'careers'>>,
  slug: string
): Array<CollectionEntry<'careers'>> => {
  let categories: Array<string> = [];

  if (currentItem.data.categories && currentItem.data.categories.length > 0) {
    categories = currentItem.data.categories;
  }

  const filterByCategories = allItems.filter(
    (item: CollectionEntry<'careers'>) =>
      item.data.categories && categories.some((category) => item.data.categories.includes(category))
  );

  const mergedItems = [...new Set(filterByCategories)];

  const filterById = mergedItems.filter((product) => product.id !== slug);

  return filterById;
};

export default similarItems;
