import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { extractHeadings } from './blogUtils';
import Sidebar from '@/components/BlogSideBar';
import { useMDXComponents } from '@/components/MdxComponents';
import { use } from 'react';

const getMarkdownPath = (id: string) =>
  path.join(process.cwd(), 'src', 'data', 'blogs', `${id}.md`);

const BlogPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const MARKDOWN_PATH = getMarkdownPath(id);
  const markdown = fs.readFileSync(MARKDOWN_PATH, 'utf-8');
  const { content } = matter(markdown);
  const headings = extractHeadings(content);

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <div className="hidden md:block fixed left-0 top-0 h-full z-30">
        <Sidebar headings={headings} />
      </div>
      <main className="ml-0 md:ml-64 w-full md:w-[70vw] max-w-full md:max-w-[70vw] p-8 overflow-y-auto prose prose-invert dark:prose-invert mx-auto bg-transparent">
        <MDXRemote source={content} components={useMDXComponents({})} />
      </main>
    </div>
  );
}

export default BlogPage;
