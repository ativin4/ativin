import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { extractHeadings } from './blogUtils';
import Sidebar from '@/components/BlogSideBar';
import { useMDXComponents } from '@/components/MdxComponents';

const getMarkdownPath = (id: string) =>
  path.join(process.cwd(), 'src', 'data', 'blogs', `${id}.md`);

const BlogPage = async({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const MARKDOWN_PATH = getMarkdownPath(id);
  const markdown = fs.readFileSync(MARKDOWN_PATH, 'utf-8');
  const { content } = matter(markdown);
  const headings = extractHeadings(content);

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar headings={headings} />
      </div>
      <main className="ml-64 w-[70vw] max-w-[70vw] p-8 overflow-y-auto prose prose-invert dark:prose-invert mx-auto bg-transparent">
        <MDXRemote source={content} components={useMDXComponents({})} />
      </main>
    </div>
  );
}

export default BlogPage;
