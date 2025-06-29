import { unified } from 'unified';
import remarkParse from 'remark-parse';

export interface Heading {
  text: string;
  id: string;
  depth: number;
}

// Minimal mdast node types for type safety
interface MdastNode {
  type?: string;
  depth?: number;
  value?: string;
  children?: MdastNode[];
}

export const createHeadingId = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

export const extractHeadings = (markdown: string): Heading[] => {
  const tree = unified().use(remarkParse).parse(markdown) as MdastNode;
  const headings: Heading[] = [];

  function visit(node: MdastNode) {
    if (node.type === 'heading' && typeof node.depth === 'number' && node.depth <= 3) {
      const text = Array.isArray(node.children)
        ? node.children.map((c) => typeof c.value === 'string' ? c.value : '').join('')
        : '';
      const id = text.toLowerCase().replace(/\s+/g, '-');
      headings.push({ text, id, depth: node.depth });
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  }
  visit(tree);
  return headings;
}
