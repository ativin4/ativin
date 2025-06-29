import { Heading } from '@/app/blogs/[id]/blogUtils';
import React from 'react';

interface SidebarProps {
  headings: Heading[];
}

const Sidebar: React.FC<SidebarProps> = ({ headings }) => (
  <nav className="sticky top-0 w-64 h-screen bg-gray-900/90 border-r border-gray-800 px-6 py-8 overflow-y-auto shadow-lg">
    <div className="font-semibold mb-6 text-gray-200 text-lg tracking-wide">On this page</div>
    <ul className="space-y-1">
      {headings.map((h) => (
        <li key={h.id} style={{ marginLeft: (h.depth - 1) * 16 }}>
          <a
            href={`#${h.id}`}
            className="block py-1.5 rounded transition-colors duration-150 text-gray-400 hover:text-blue-400 hover:bg-gray-800 text-sm font-medium"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
