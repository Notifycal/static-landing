import { slug } from 'github-slugger';
import { marked } from 'marked';

export const slugify = (content: string): string | null => {
  if (!content) return null;

  return slug(content);
};

export const markdownify = (content: string): Promise<string> | string | null => {
  if (!content) return null;

  return marked.parseInline(content);
};

export const humanize = (content: string): string | null => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m): string => m.toUpperCase());
};

const htmlEntityDecoder = (htmlWithEntities: string): string => {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'"
  };
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};

export const plainify = (content: string): string | null => {
  if (!content) return null;

  const filterBrackets = content.replace(/<\/?[^>]+(>|$)/gm, '');
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, '');
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};
