'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';
import blogsData from '@/data/blogs/blogs.json';

const LazyDev3D = dynamic(() => import('@/components/LazyDev3D'), { 
  ssr: false,
  loading: () => <LoadingSpinner />
});

interface BlogPost {
    id: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    url?: string; // for medium articles
    tags: string[];
}

const blogs: BlogPost[] = Array.isArray(blogsData) ? blogsData : [];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-900 py-16 container mx-auto px-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Blog</h1>
                <Link 
                    href="/blogs/medium" 
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                    <span>Read Blogs written on Medium</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </Link>
            </div>
            <div className="grid gap-8">
                {blogs.map((blog) => (
                    <article 
                        key={blog.id}
                        className="bg-gray-800/50 rounded-lg p-6 transition-all hover:bg-gray-800"
                    >
                        {blog.url ? (
                            <a 
                                href={blog.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Content blog={blog} />
                            </a>
                        ) : (
                            <Link href={`/blogs/${blog.id}`}>
                                <Content blog={blog} />
                            </Link>
                        )}
                    </article>
                ))}
            </div>
            <div className="text-center py-12 space-y-6">
                <div className="relative w-full h-[400px] mx-auto">
                    <div className="absolute inset-0">
                        <LazyDev3D />
                    </div>
                    <div className="absolute top-4 right-4 bg-gray-800/90 rounded-full px-6 py-3 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <p className="text-gray-300 text-sm font-medium">Efficient laziness in action 😴✨</p>
                    </div>
                </div>
                <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-200">Blog Posts Loading...</h3>
                    <p className="text-lg text-gray-300">Relaxing while my brain processes at light speed 🚀</p>
                    <p className="text-gray-400">Even lazy developers can be efficient! Check back soon.</p>
                </div>
                <div className="pt-6 relative z-10">
                    <div className="inline-flex flex-col items-center gap-3">
                        <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-gray-800/90 to-gray-800/50 text-gray-300 shadow-lg backdrop-blur-sm border border-gray-700/30">
                            Processing blog ideas...
                        </span>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span>Auto-optimization in progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Content({ blog }: { blog: BlogPost }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-gray-300 transition-colors">
                {blog.title}
                {blog.url && (
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300">
                        Medium
                    </span>
                )}
            </h2>
            <p className="text-gray-300 mb-4">{blog.description}</p>
            <div className="flex items-center space-x-4">
                <time className="text-sm text-gray-400">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </time>
                <span className="text-gray-600">•</span>
                <span className="text-sm text-gray-400">{blog.readTime}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </>
    );
}