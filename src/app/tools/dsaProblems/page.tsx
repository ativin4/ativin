import Link from "next/link";
import problems from "@/data/problems.json";

export default function DSAProblemsListPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">DSA Problems</h1>
      <ul className="space-y-4">
        {problems.map((problem) => (
          <li key={problem.id} className="border rounded p-4 hover:bg-gray-50 transition">
            <Link
              href={`/tools/dsaProblems/${problem.id}`}
              className="text-blue-600 font-semibold hover:underline text-lg"
            >
              {problem.title}
            </Link>
            <p className="text-gray-700 mt-1">{problem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}