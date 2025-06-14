import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex space-x-8">
                    <Link
                        href="/"
                        className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-200"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-200"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/tools/dsaProblems"
                        className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-200"
                    >
                        DSA Problems
                    </Link>
                </div>
            </div>
        </nav>
    );
}
