import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50 backdrop-blur-sm bg-opacity-80">
            <div className="mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex space-x-8">
                    <Link
                        href="/"
                        className="text-gray-200 font-semibold hover:text-green-400 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/blogs"
                        className="text-gray-200 font-semibold hover:text-green-400 transition-colors duration-200"
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/tools/dsaProblems"
                        className="text-gray-200 font-semibold hover:text-green-400 transition-colors duration-200"
                    >
                        DSA Problems
                    </Link>
                </div>
            </div>
        </nav>
    );
}
