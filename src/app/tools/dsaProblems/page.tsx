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

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">DSA Problems</h1>
            <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Title</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-left">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProblems.map((problem) => (
                            <tr key={problem.id} className="border-t hover:bg-gray-50 transition">
                                <td className="py-2 px-4">
                                    <Link
                                        href={`/tools/dsaProblems/${problem.id}`}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        {problem.title}
                                    </Link>
                                </td>
                                <td className="py-2 px-4">{problem.description}</td>
                                <td className="py-2 px-4">{problem.difficulty || "N/A"}</td>
                            </tr>
                        ))}
                        {filteredProblems.length === 0 && (
                            <tr>
                                <td colSpan={3} className="py-4 text-center text-gray-500">
                                    No problems found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}