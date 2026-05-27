'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  rehypeAutolinkHeadings,
  type Options as AutolinkOptions,
} from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Custom components for MDX
const CustomLink = (props: any) => (
  <Link href={props.href} className="text-cyan-500 hover:text-cyan-400 underline underline-offset-2" target={props.href.startsWith('http') ? '_blank' : undefined} rel={props.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
    {props.children}
  </Link>
);

const CustomImage = (props: any) => (
  <div className="my-8">
    <Image
      src={props.src}
      alt={props.alt || ''}
      width={props.width || 1200}
      height={props.height || 600}
      className="rounded-xl shadow-lg w-full object-cover"
      unoptimized={props.src.startsWith('/')}
    />
    {props.alt && <p className="text-sm text-gray-500 mt-2 text-center">{props.alt}</p>}
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    tip: 'bg-cyan-50 border-cyan-200 text-cyan-800',
  };
  const icons = { info: 'ℹ️', warning: '⚠️', tip: '💡' };
  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
};

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
      {children}
    </table>
  </div>
);

const components = {
  a: CustomLink,
  img: CustomImage,
  table: Table,
  Callout,
};

export default function BlogPostContent({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeRaw,
            rehypeSlug,
            [rehypeAutolinkHeadings, {
              behavior: 'append',
              properties: { className: 'text-gray-400 hover:text-gray-600 mr-2 text-lg' },
            } as AutolinkOptions],
            rehypeHighlight,
          ],
        },
      }}
    />
  );
}
