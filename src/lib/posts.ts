import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  date: string;
  tags: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

const toPostMeta = (fileName: string): PostMeta => {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? content.slice(0, 160),
    coverImage: data.coverImage ?? '',
    author: data.author ?? 'Do Tell The Bride',
    date: data.date ?? new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : []
  };
};

export const getAllPosts = (): PostMeta[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((file) => file.endsWith('.md'))
    .map(toPostMeta)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
};

export const getPostBySlug = (slug: string): Post => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? content.slice(0, 160),
    coverImage: data.coverImage ?? '',
    author: data.author ?? 'Do Tell The Bride',
    date: data.date ?? new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    contentHtml: marked.parse(content) as string
  };
};
