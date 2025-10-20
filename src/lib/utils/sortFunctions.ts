import type { CollectionEntry } from 'astro:content';

interface DateItem {
  data: {
    date?: string | Date;
    featured?: boolean;
  };
}

interface WeightItem {
  data: {
    weight?: number;
  };
}

export const sortByDate = <T extends DateItem & CollectionEntry<'blog' | 'careers'>>(array: Array<T>): Array<T> => {
  const sortedArray = array.sort((a: T, b: T) => {
    const dateA = a.data.date ? new Date(a.data.date) : new Date(0);
    const dateB = b.data.date ? new Date(b.data.date) : new Date(0);
    return dateB.valueOf() - dateA.valueOf();
  });
  return sortedArray;
};

export const sortByWeight = <T extends WeightItem & CollectionEntry<'blog' | 'careers'>>(array: Array<T>): Array<T> => {
  const withWeight = array.filter((item: T) => item.data.weight);
  const withoutWeight = array.filter((item: T) => !item.data.weight);
  const sortedWeightedArray = withWeight.sort((a: T, b: T) => (a.data.weight ?? 0) - (b.data.weight ?? 0));
  const sortedArray = [...sortedWeightedArray, ...withoutWeight];
  return sortedArray;
};
