"use client";
import { useState } from "react";
import Link from "next/link";
import problems from "@/data/problems.json";

export default function DSAProblemsListPage() {
    const [search, setSearch] = useState("");

    const filteredProblems = problems.filter(
        (problem) =>
            problem.title.toLowerCase().includes(search.toLowerCase()) ||
            problem.description.toLowerCase().includes(search.toLowerCase())
    );

    const getDifficultyColor = (difficulty: string | undefined) => {
        switch(difficulty?.toLowerCase()) {
            case 'easy':
                return 'text-green-400';
            case 'medium':
                return 'text-yellow-400';
            case 'hard':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">DSA Problems</h1>
                    <p className="text-gray-400">Practice your coding skills with these DSA problems</p>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                    />
                    <svg
                        className="absolute right-3 top-3.5 h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-4 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-4 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredProblems.map((problem) => (
                                    <tr 
                                        key={problem.id} 
                                        className="hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/tools/dsaProblems/${problem.id}`}
                                                className="text-green-400 hover:text-green-300 font-medium hover:underline transition-colors"
                                            >
                                                {problem.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {problem.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)} bg-gray-900/50`}>
                                                {problem.difficulty || "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProblems.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center">
                                            <div className="text-gray-500">
                                                <svg
                                                    className="mx-auto h-12 w-12 mb-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <p className="text-lg">No problems found</p>
                                                <p className="text-sm mt-1">Try adjusting your search query</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}