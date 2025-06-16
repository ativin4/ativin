'use client';
import React from "react";

const mediumBlogs = [
    {
        title: "My Journey Migrating Jest 26 to Jest 29: Challenges and Solutions",
        url: "https://medium.com/@ativin/my-journey-migrating-jest-26-to-jest-29-challenges-and-solutions-2ec0775c15fd",
        date: "May 6, 2025",
        readTime: "6 min read",
        description: "A comprehensive guide on upgrading Jest and handling complex migration challenges in modern JavaScript testing environments.",
    },
    // Add more articles as you publish them
];

const [firstBlog] = mediumBlogs;

export default function MediumBlogPage() {
    const [selectedBlog, setSelectedBlog] = React.useState(firstBlog);

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-1/3 lg:w-1/4">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-6 text-white">Recent Articles</h2>
                            <div className="space-y-4">
                                {mediumBlogs.map((blog) => (
                                    <div
                                        key={blog.url}
                                        className={`cursor-pointer rounded-lg p-4 transition-all ${
                                            blog.url === selectedBlog.url
                                                ? "bg-gray-700 border-l-4 border-green-500"
                                                : "hover:bg-gray-700"
                                        }`}
                                        onClick={() => setSelectedBlog(blog)}
                                    >
                                        <h3 className="font-medium mb-2 text-gray-100">{blog.title}</h3>
                                        <div className="flex items-center text-sm text-gray-400 space-x-4">
                                            <span>{blog.date}</span>
                                            <span>•</span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                    <main className="md:w-2/3 lg:w-3/4">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h1 className="text-3xl font-bold mb-4 text-white">{selectedBlog.title}</h1>
                            <div className="flex items-center text-sm text-gray-400 space-x-4 mb-6">
                                <span>{selectedBlog.date}</span>
                                <span>•</span>
                                <span>{selectedBlog.readTime}</span>
                            </div>
                            <p className="text-gray-300 mb-8">{selectedBlog.description}</p>
                            <div className="space-y-6">
                                <a 
                                    href={selectedBlog.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 1043.63 592.71" fill="currentColor">
                                        <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"/>
                                    </svg>
                                    Read on Medium
                                </a>
                                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                                    <h3 className="text-lg font-semibold text-white mb-2">Quick Preview</h3>
                                    <p className="text-gray-300">{selectedBlog.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-gray-600 text-gray-200 rounded-full text-sm">
                                            Technical
                                        </span>
                                        <span className="px-3 py-1 bg-gray-600 text-gray-200 rounded-full text-sm">
                                            Jest
                                        </span>
                                        <span className="px-3 py-1 bg-gray-600 text-gray-200 rounded-full text-sm">
                                            JavaScript
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}