import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
